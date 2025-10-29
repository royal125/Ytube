import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  LinearProgress,
  Paper,
  Slider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Lottie from "lottie-react";
import waveformAnim from "../assets/waveform.json"; // 🎵 waveform animation

const API_BASE = "https://savefrom.in/api"; // unified backend (no more 8001)

const Mp3Page = () => {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState(null);
  const [settings, setSettings] = useState({
    bitrate: "192k",
    volume: 100,
    normalize: false,
  });

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setDownloadLink("");
    setProgress(0);

    setFileInfo({
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      type: f.type,
    });
  };

  const handleConvert = async () => {
    if (!file) return alert("Please select a video file first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bitrate", settings.bitrate);
    formData.append("volume", settings.volume);
    formData.append("normalize", settings.normalize);

    setLoading(true);
    setProgress(10);
      setDownloadLink(null);

       // Auto-scroll down when conversion starts
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 800);

    try {
      const res = await fetch(`${API_BASE}/converter/mp4-to-mp3`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      clearInterval(progressInterval);

      if (data.success && data.download_url) {
        setProgress(100);
        setDownloadLink(`${API_BASE}${data.download_url}`);
      } else {
        alert(data.error || "Conversion failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Server error while converting:", err);
      alert("Server error while converting. Please check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: "25px",
          textAlign: "center",
          background: "linear-gradient(135deg, #1e1f29, #3e1f47, #5e17eb)",
          color: "white",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant="h4" fontWeight={800} mb={3}>
          🎧 MP4 → MP3 Converter
        </Typography>

        {/* File Upload */}
        <label
          htmlFor="file-upload"
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #00ffcc, #00b894)",
            padding: "12px 30px",
            borderRadius: "30px",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px",
            transition: "0.3s",
          }}
        >
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Show file info */}
        {file && (
          <Box
            sx={{
              mb: 3,
              mt: 1,
              background: "rgba(255,255,255,0.1)",
              p: 2,
              borderRadius: "15px",
              display: "inline-block",
              width: "80%",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              📁 {fileInfo.name}
            </Typography>
            <Typography variant="body2" color="lightgray">
              {fileInfo.type} • {fileInfo.size}
            </Typography>
          </Box>
        )}

        {/* Settings */}
        <Box
          sx={{
            mb: 3,
            p: 3,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="h6" mb={2}>
            ⚙️ Conversion Settings
          </Typography>

          {/* Bitrate */}
          <Box mb={3}>
            <Typography mb={1}>Bitrate:</Typography>
            <select
              value={settings.bitrate}
              onChange={(e) =>
                setSettings({ ...settings, bitrate: e.target.value })
              }
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#fff",
                color: "#5e17eb",
                fontWeight: "bold",
                outline: "none",
                width: "50%",
              }}
            >
              <option value="128k">128 kbps (Standard)</option>
              <option value="192k">192 kbps (High)</option>
              <option value="320k">320 kbps (Very High)</option>
            </select>
          </Box>

          {/* Volume */}
          <Box mb={3}>
            <Typography mb={1}>Volume: {settings.volume}%</Typography>
            <Slider
              value={settings.volume}
              onChange={(_, val) => setSettings({ ...settings, volume: val })}
              step={10}
              min={50}
              max={150}
              sx={{
                color: "#00ffcc",
                width: "80%",
                mx: "auto",
              }}
            />
          </Box>

          {/* Normalize */}
          <FormControlLabel
            control={
              <Switch
                checked={settings.normalize}
                onChange={(e) =>
                  setSettings({ ...settings, normalize: e.target.checked })
                }
                color="success"
              />
            }
            label="Normalize Audio"
          />
        </Box>

        {/* Convert Button */}
        <Button
          variant="contained"
          onClick={handleConvert}
          disabled={loading}
          sx={{
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            backgroundColor: "#00ffcc",
            color: "#000",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#00e6b8" },
          }}
        >
          {loading ? "Converting..." : "Convert to MP3"}
        </Button>

        {/* Loader and waveform */}
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Lottie
              animationData={waveformAnim}
              loop
              autoplay
              style={{ height: 100, width: 200 }}
            />
          </Box>
        )}

        {/* Progress Bar */}
        {loading && (
          <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": { backgroundColor: "#00ffcc" },
              }}
            />
            <Typography variant="body2" mt={1}>
              {progress}% completed
            </Typography>
          </Box>
        )}

        {/* Download */}
        {downloadLink && (
          <Box mt={4}>
            <Button
              href={downloadLink}
              variant="contained"
              sx={{
                backgroundColor: "#00b894",
                px: 4,
                py: 1.5,
                borderRadius: "25px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#019875" },
              }}
            >
              ⬇️ Download MP3
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Mp3Page;
