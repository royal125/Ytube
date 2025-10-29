from fastapi import FastAPI, Query
from fastapi import UploadFile, File
from fastapi import FastAPI, Query, UploadFile, File, Form, Request
import subprocess
import uuid
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask
import yt_dlp
import os
import tempfile
import shutil
import time
import threading

app = FastAPI()

# ✅ Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================== DOWNLOAD ROUTE ==================
@app.get("/api/ping")
async def ping():
    return {"message": "pong"}


@app.get("/api/download")
async def download(
    url: str,
    format_id: str,
    title: str = "video",
    type: str = "video",
):
    try:
        print(f"🎬 Download request: {title} ({type})")

        # Temporary directory for each download
        temp_dir = tempfile.mkdtemp()
        safe_name = "".join(c if c.isalnum() or c in " ._-" else "_" for c in title)
        output_path = os.path.join(temp_dir, f"{safe_name}.%(ext)s")

        # yt-dlp configuration
        if type == "video":
            # Merge selected video with best audio
            ydl_opts = {
                "format": f"{format_id}+bestaudio/best",
                "outtmpl": output_path,
                "merge_output_format": "mp4",
                "quiet": False,
                "cookiefile": "youtube.com_cookies.txt",
            }
        else:
            # Audio-only
            ydl_opts = {
                "format": format_id,
                "outtmpl": output_path,
                "quiet": False,
                "cookiefile": "youtube.com_cookies.txt",
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "mp3",
                        "preferredquality": "192",
                    }
                ],
            }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)

        # Handle alternative extensions (yt-dlp sometimes renames files)
        base, _ = os.path.splitext(downloaded_file)
        for ext in ("mp4", "webm", "m4a", "mp3"):
            if os.path.exists(f"{base}.{ext}"):
                downloaded_file = f"{base}.{ext}"
                break

        if not os.path.exists(downloaded_file):
            raise FileNotFoundError("Merged file not found after download.")

        print(f"✅ Done: {downloaded_file}")

        # Background task to delete after 30 minutes
        def delayed_cleanup():
            print(f"🕒 Waiting 30 minutes before deleting: {temp_dir}")
            time.sleep(1800)  # = 30 minutes
            shutil.rmtree(temp_dir, ignore_errors=True)
            print(f"🧹 Deleted temporary files: {temp_dir}")

        cleanup_task = BackgroundTask(
            lambda: threading.Thread(target=delayed_cleanup, daemon=True).start()
        )

        # Send the file
        return FileResponse(
            path=downloaded_file,
            filename=os.path.basename(downloaded_file),
            media_type="video/mp4" if type == "video" else "audio/mpeg",
            background=cleanup_task,
        )

    except Exception as e:
        print("❌ Download error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})


# ================== FAST DIRECT DOWNLOAD ROUTE ==================
@app.get("/direct")
async def direct_download(url: str, format_id: str):
    """
    Redirects user to the direct YouTube CDN file.
    Much faster since the video streams directly from YouTube.
    """
    try:
        with yt_dlp.YoutubeDL({"quiet": True}) as ydl:
            info = ydl.extract_info(url, download=False)
            for f in info.get("formats", []):
                if f.get("format_id") == format_id:
                    direct_url = f.get("url")
                    if direct_url:
                        print(f"⚡ Redirecting to direct URL for format {format_id}")
                        return RedirectResponse(url=direct_url)

        return JSONResponse(
            status_code=404,
            content={"error": "Format not found"},
        )

    except Exception as e:
        print("❌ Direct link error:", e)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)},
        )


# ================== INFO ROUTE ==================
@app.api_route("/api/download", methods=["GET", "POST"])
async def get_info(url: str = Query(..., description="YouTube video URL")):
    try:
        print(f"🔍 Fetching info for {url}")
        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "geo_bypass": True,
            "socket_timeout": 15,
            "noplaylist": True,
            "cookiefile": "youtube.com_cookies.txt",  # 👈 add this line
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                info = ydl.extract_info(url, download=False)
            except Exception as inner_e:
                print("❌ yt-dlp extraction failed:", inner_e)
                raise inner_e

        if not info:
            raise ValueError("No info returned from yt-dlp")

        formats = info.get("formats") or []
        if not formats:
            print("⚠️ No formats found in response keys:", info.keys())
            raise ValueError("No formats found for this video")

        # Basic format parsing
        best_by_height = {}
        for f in formats:
            if f.get("vcodec") != "none" and f.get("height"):
                h = f["height"]
                if h <= 2160:
                    size = f.get("filesize") or f.get("filesize_approx") or 0
                    if h not in best_by_height or size > (
                        best_by_height[h].get("filesize") or 0
                    ):
                        best_by_height[h] = f

        video_formats = [
            {
                "format_id": f.get("format_id"),
                "qualityLabel": f"{f.get('height', '?')}p",
                "ext": f.get("ext"),
                "size": (
                    round(f.get("filesize", 0) / (1024 * 1024), 2)
                    if f.get("filesize")
                    else "Unknown"
                ),
                "type": "video",
            }
            for f in best_by_height.values()
        ]

        best_by_abr = {}
        for f in formats:
            if f.get("acodec") != "none" and f.get("vcodec") == "none":
                abr = f.get("abr")
                if abr:
                    size = f.get("filesize") or f.get("filesize_approx") or 0
                    if abr not in best_by_abr or size > (
                        best_by_abr[abr].get("filesize") or 0
                    ):
                        best_by_abr[abr] = f

        audio_formats = [
            {
                "format_id": f.get("format_id"),
                "qualityLabel": f"{f.get('abr')} kbps",
                "ext": f.get("ext"),
                "size": (
                    round(f.get("filesize", 0) / (1024 * 1024), 2)
                    if f.get("filesize")
                    else "Unknown"
                ),
                "type": "audio",
            }
            for f in best_by_abr.values()
        ]

        return {
            "title": info.get("title", "Unknown title"),
            "thumbnail": info.get("thumbnail"),
            "formats": video_formats + audio_formats,
        }

    except Exception as e:
        import traceback

        print("❌ Error fetching info:", e)
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})


# ================== MP3 CONVERSION ROUTES ==================

# Reuse the existing app and middleware defined at top of file.
# Ensure upload/output directories exist.
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "converted"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


@app.post("/converter/mp4-to-mp3")
async def convert_to_mp3(
    file: UploadFile = File(...),
    bitrate: str = Form("192k"),
    volume: int = Form(100),
    normalize: bool = Form(False),
):
    try:
        input_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}_{file.filename}")
        output_filename = os.path.splitext(file.filename)[0] + f"_{bitrate}.mp3"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        with open(input_path, "wb") as f:
            f.write(await file.read())

        filters = []
        if normalize:
            filters.append("loudnorm")
        if volume != 100:
            filters.append(f"volume={volume/100:.2f}")

        command = [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-vn",
            "-acodec",
            "libmp3lame",
            "-ar",
            "44100",
            "-ac",
            "2",
            "-b:a",
            bitrate,
        ]

        if filters:
            command.extend(["-af", ",".join(filters)])

        command.append(output_path)

        subprocess.run(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True
        )

        os.remove(input_path)

        return JSONResponse(
            {"success": True, "download_url": f"/download/{output_filename}"}
        )

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


@app.get("/download/{filename}")
async def download_file(filename: str):
    path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(path):
        return JSONResponse({"error": "File not found"}, status_code=404)
    return FileResponse(path, media_type="audio/mpeg", filename=filename)


@app.post("/convert")
async def convert_url_to_mp3(payload: dict):
    """
    Accepts JSON { "url": "<youtube_url>" } and uses yt-dlp to download audio and convert to mp3.
    Returns: { "success": True, "download_url": "/download/<file>" }
    """
    try:
        url = payload.get("url")
        if not url:
            return JSONResponse({"error": "Missing url"}, status_code=400)

        import yt_dlp

        temp_name = f"{uuid.uuid4()}"
        out_template = os.path.join(OUTPUT_DIR, temp_name + ".%(ext)s")

        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": out_template,
            "quiet": True,
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

        produced = None
        for ext in ("mp3", "m4a", "webm", "wav"):
            candidate = os.path.join(OUTPUT_DIR, f"{temp_name}.{ext}")
            if os.path.exists(candidate):
                produced = os.path.basename(candidate)
                break

        if not produced:
            filename = ydl.prepare_filename(info)
            base, _ = os.path.splitext(os.path.basename(filename))
            for ext in ("mp3", "m4a", "webm", "wav", "mp4"):
                candidate = os.path.join(OUTPUT_DIR, f"{base}.{ext}")
                if os.path.exists(candidate):
                    produced = os.path.basename(candidate)
                    break

        if not produced:
            return JSONResponse(
                {"error": "Conversion failed: output not found"}, status_code=500
            )

        return JSONResponse({"success": True, "download_url": f"/download/{produced}"})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


# 🧹 AUTO-CLEANUP THREAD
def auto_cleanup():
    """Deletes files older than 10 minutes from uploads/ and converted/"""
    while True:
        try:
            now = time.time()
            for folder in (UPLOAD_DIR, OUTPUT_DIR):
                for filename in os.listdir(folder):
                    path = os.path.join(folder, filename)
                    if os.path.isfile(path):
                        if now - os.path.getmtime(path) > 600:
                            os.remove(path)
                            print(f"🧹 Deleted old file: {path}")
        except Exception as e:
            print(f"⚠️ Cleanup error: {e}")
        time.sleep(600)  # check every 10 minutes


threading.Thread(target=auto_cleanup, daemon=True).start()
