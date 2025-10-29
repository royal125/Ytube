import React from "react";
import logo from "../components/assets/logo.png";
import { AppBar, Toolbar, Tabs, Tab, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ currentTab, setCurrentTab }) {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);

    switch (newValue) {
      case 0:
        navigate("/"); // YouTube page
        break;
      case 1:
        navigate("/Mp3Page"); // MP3 Converter page
        break;
      case 2:
        navigate("/instagram"); // Instagram
        break;
      case 3:
        navigate("/facebook"); // Facebook
        break;
      case 4:
        navigate("/about"); // About
        break;
      default:
        navigate("/");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    setCurrentTab(0);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0f172a, #1e293b, #3b82f6)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: 40,
              width: 40,
              marginRight: 10,
              borderRadius: "8px",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
            Video Downloader
          </Typography>
        </Box>

        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              fontWeight: "bold",
              textTransform: "capitalize",
            },
            "& .MuiTab-root:hover": {
              color: "#93c5fd",
            },
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "2px",
            },
          }}
        >
          <Tab label="YouTube" />
          <Tab label="MP3 Converter" />
          <Tab label="Instagram" />
          <Tab label="Facebook" />
          <Tab label="About" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
