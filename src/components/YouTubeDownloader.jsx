import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnim from "./assets/loader.json";
import spinnerAnim from "./assets/spinner.json";

// ✅ PRODUCTION: Use HTTPS backend with your domain
const API_BASE = process.env.REACT_APP_API_URL;


const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [downloadingMap, setDownloadingMap] = useState({});
  const [error, setError] = useState("");

  // ---- helpers -------------------------------------------------------------
  const normalizeFormats = (raw) => {
    const list = Array.isArray(raw) ? raw : [];
    const withTypes = list.map((f) => {
      const hasVideo = f.type === "video" || !!f.height || !!f.vcodec;
      const hasAudio = f.type === "audio" || !!f.abr || !!f.acodec;
      return {
        ...f,
        type: hasVideo && !hasAudio ? "video" : hasAudio && !hasVideo ? "audio" : (f.type || "video")
      };
    });

    const seen = new Set();
    const keyOf = (f) =>
      f.format_id ??
      `${f.type}|${f.ext}|${f.qualityLabel || ""}|${f.abr || ""}|${f.height || ""}`;

    return withTypes.filter((f) => {
      const k = keyOf(f);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  const videoFormats = normalizeFormats(videoData?.formats).filter((f) => f.type === "video");
  const audioFormats = normalizeFormats(videoData?.formats).filter((f) => f.type === "audio");

  // ---- actions -------------------------------------------------------------
  const handleFetch = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setVideoData(null);
    setError("");

    try {
      // ✅ PRODUCTION: Use POST with proper error handling
      const res = await axios.post(`${API_BASE}/api/info`, { url }, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.data && res.data.formats) {
        setVideoData(res.data);
      } else if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        throw new Error("No video data received from server");
      }
    } catch (err) {
      console.error("❌ Failed to fetch video info:", err);

      let errorMessage = "Failed to fetch video info. ";
      if (err.code === 'ECONNABORTED') {
        errorMessage += "Request timeout. Please try again.";
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else if (err.message.includes("Network Error")) {
        errorMessage += "Cannot connect to server. Check your internet connection.";
      } else {
        errorMessage += "Please check the URL and try again.";
      }

      setError(errorMessage);
      setVideoData({});
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleFetch();
  };

  // ---------------------------- handleDownload ------------------------------//
  const handleDownload = async (format) => {
    const id = format.format_id || `${format.type}-${format.ext}-${format.qualityLabel || ""}`;

    setDownloadingMap((prev) => ({ ...prev, [id]: true }));
    setError("");

    try {
      // Build download URL
      const downloadUrl = `${API_BASE}/api/download?url=${encodeURIComponent(url)}&format_id=${
        format.format_id ?? ""
      }&title=${encodeURIComponent(videoData?.title || "video")}&type=${encodeURIComponent(format.type)}`;

      console.log("🎬 Download URL:", downloadUrl);

      // Request the file from backend with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

      const response = await fetch(downloadUrl, {
        signal: controller.signal,
        credentials: 'include' // Important for CORS with credentials
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      // Turn into blob (file)
      const blob = await response.blob();

      // Check if blob is valid
      if (blob.size === 0) {
        throw new Error("Received empty file from server");
      }

      const ext = format.type === "audio" ? "mp3" : "mp4";
      const filename = `${videoData?.title || "video"}.${ext}`;

      // Create invisible link to trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(link.href), 100);

    } catch (err) {
      console.error("❌ Download failed:", err);
      if (err.name === 'AbortError') {
        setError("Download timeout. The video might be too large.");
      } else {
        setError(`Download failed: ${err.message}`);
      }
    } finally {
      setDownloadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Simple DownloadCell component
  const DownloadCell = ({ format, downloadingMap, handleDownload }) => {
    const id = format.format_id || `${format.type}-${format.ext}-${format.qualityLabel || ""}`;
    const isDownloading = downloadingMap[id];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isDownloading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 40, width: 120 }}>
            <Lottie animationData={spinnerAnim} loop autoplay style={{ height: 40, width: 40 }} />
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDownload(format)}
            sx={{ minWidth: 120 }}
            disabled={!videoData}
          >
            Download
          </Button>
        )}
      </Box>
    );
  };

  // ---- render --------------------------------------------------------------
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🎬 YouTube Video Downloader
      </Typography>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" gap={2} mb={1} justifyContent="center" alignItems="center" flexWrap="wrap">
        <TextField
          label="Paste YouTube URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleEnter}
          sx={{ minWidth: "300px", flexGrow: 1, backgroundColor: "white", borderRadius: 1 }}
          placeholder="Put YouTube link here"
        />
        <Button className="bt-fetch" variant="contained" color="secondary" onClick={handleFetch} disabled={loading || !url.trim()}>
          {loading ? "Fetching..." : "Fetch"}
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2} mb={3}>
          <Lottie animationData={loaderAnim} loop autoplay style={{ height: 120, width: 120 }} />
        </Box>
      )}

      {videoData && videoData.title && (
        <>
          {(videoData.thumbnail || videoData.title) && (
            <Box textAlign="center" mb={3}>
              {videoData.thumbnail && (
                <img
                  src={videoData.thumbnail}
                  alt="Thumbnail"
                  style={{ maxWidth: "320px", borderRadius: "12px", marginBottom: "10px" }}
                />
              )}
              {videoData.title && <Typography variant="h6">{videoData.title}</Typography>}
            </Box>
          )}

          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
            <Tab label={`Video (${videoFormats.length})`} />
            <Tab label={`Audio (${audioFormats.length})`} />
          </Tabs>

          {tab === 0 && (
            <>
              {videoFormats.length === 0 ? (
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography>No video formats found.</Typography>
                </Paper>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Quality</strong></TableCell>
                        <TableCell><strong>Format</strong></TableCell>
                        <TableCell><strong>Size (MB)</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {videoFormats.map((format, index) => (
                        <TableRow key={index}>
                          <TableCell>{format.qualityLabel || `${format.height || ""}p`}</TableCell>
                          <TableCell>{format.ext || "—"}</TableCell>
                          <TableCell>{format.size ?? "—"}</TableCell>
                          <TableCell>
                            <DownloadCell
                              format={format}
                              downloadingMap={downloadingMap}
                              handleDownload={handleDownload}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}

          {tab === 1 && (
            <>
              {audioFormats.length === 0 ? (
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography>No audio formats found.</Typography>
                </Paper>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Bitrate</strong></TableCell>
                        <TableCell><strong>Format</strong></TableCell>
                        <TableCell><strong>Size (MB)</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {audioFormats.map((format, index) => (
                        <TableRow key={index}>
                          <TableCell>{format.qualityLabel || `${format.abr || ""}kbps`}</TableCell>
                          <TableCell>{format.ext || "—"}</TableCell>
                          <TableCell>{format.size ?? "—"}</TableCell>
                          <TableCell>
                            <DownloadCell
                              format={format}
                              downloadingMap={downloadingMap}
                              handleDownload={handleDownload}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default YouTubeDownloader;