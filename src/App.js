// src/App.js
import React, { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./components/pages/AboutPage";
import YouTubeDownloader from "./components/YouTubeDownloader";
import logo from "./components/assets/logo.png";


import MaintenancePage from "./components/pages/MaintenancePage";

import Lottie from "lottie-react";
import axios from "axios";

// Loader animation
import loaderAnim from "./components/assets/loader.json";

// Pages

import Mp3Page from "./components/pages/Mp3Page";
import InstagramPage from "./components/pages/InstagramPage";
import ReelsPage from "./components/pages/ReelsPage";
import FacebookPage from "./components/pages/FacebookPage";

function App() {
  // ✅ Global states
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  // ✅ Fetch handler (you can integrate this later into YouTubePage)
  const handleFetch = async () => {
  if (!url.trim()) return;
  setLoading(true);
  setVideoData(null);

  try {
    // ✅ Send the URL in JSON body, not as params
    const res = await axios.post("https://api.savefrom.in/api/info", { url });

    if (res.data && res.data.formats) {
      setVideoData({ ...res.data, url });
    } else {
      alert("No video data found.");
    }
  } catch (err) {
    console.error("❌ Error fetching info:", err);
    alert("Failed to fetch video info. Please check the URL or backend.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Router>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* ✅ Navbar on top */}
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* ✅ Routes */}
        <Routes>
          {/* Main working downloader page */}
          <Route path="/" element={<YouTubeDownloader />} />

          {/* Maintenance pages (stylish spinner) */}
          <Route path="/Mp3Page" element={<Mp3Page />} />
                  <Route path="/instagram" element={<MaintenancePage />} />
            <Route path="/facebook" element={<MaintenancePage />} />
          <Route path="/about" element={<MaintenancePage />} />

          {/* Optional pages (if you want separate ones later) */}
          <Route path="/Mp3Page" element={<Mp3Page />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/fb" element={<FacebookPage />} />
        </Routes>

        {/* ✅ Footer at bottom */}
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
