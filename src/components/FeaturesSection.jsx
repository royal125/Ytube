import React from "react";
import { Box, Container, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "../App.css";


const features = [
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "Super Fast",
    desc: "Download videos instantly with high speed.",
    gradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
  },
  {
    icon: <PlayCircleIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "All Devices",
    desc: "Works on mobile, tablet and computer.",
    gradient: "linear-gradient(135deg, #4a67d3, #1e90ff)",
  },
  {
    icon: <HighQualityIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "HD Quality",
    desc: "Supports HD and 4K video quality.",
    gradient: "linear-gradient(135deg, #28a745, #66bb6a)",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "No Limits",
    desc: "Unlimited downloads completely free.",
    gradient: "linear-gradient(135deg, #ff9800, #ffb74d)",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "Safe & Secure",
    desc: "100% safe with no registration needed.",
    gradient: "linear-gradient(135deg, #00bcd4, #26c6da)",
  },
  {
    icon: <CloudDownloadIcon sx={{ fontSize: 36, color: "#fff" }} />,
    title: "Multiple Formats",
    desc: "MP4, MP3 and many more formats.",
    gradient: "linear-gradient(135deg, #ffffffff, #ba68c8)",
  },
];







const FeaturesSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #0f2027, #2c5364, #203a43)",

        
        color: "white",
        borderRadius: "35px",
       

      }}
      >
          
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "white",
            fontWeight: 700,
            mb: 5,
          }}
        >
          Why Choose Us?
        </Typography>

        {/* Bootstrap Cards - First Row */}
        <div className="row mb-4">
          {features.slice(0, 3).map((f, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div 
                className="card h-100 text-center text-white border-0"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  transition: "0.3s",
                  minHeight: "280px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 12px 30px ${f.gradient.match(/#[0-9a-f]+/gi)?.[0] || "rgba(255,75,43,0.4)"}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <div 
                      className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: f.gradient,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                      }}
                    >
                      {f.icon}
                    </div>
                    <h5 className="card-title fw-bold mb-2" style={{ minHeight: "32px" }}>
                      {f.title}
                    </h5>
                  </div>
                  <p className="card-text feature-desc" style={{ lineHeight: "1.6" }}>
  {f.desc}
</p>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bootstrap Cards - Second Row */}
        <div className="row">
          {features.slice(3, 6).map((f, i) => (
            <div className="col-md-4 mb-4" key={i + 3}>
              <div 
                className="card h-100 text-center text-white border-0"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  transition: "0.3s",
                  minHeight: "280px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 12px 30px ${f.gradient.match(/#[0-9a-f]+/gi)?.[0] || "rgba(255,75,43,0.4)"}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between p-4">
                  <div>
                    <div 
                      className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: f.gradient,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                      }}
                    >
                      {f.icon}
                    </div>
                    <h5 className="card-title fw-bold mb-2" style={{ minHeight: "32px" }}>
                      {f.title}
                    </h5>
                  </div>
                 <p className="card-text feature-desc" style={{ lineHeight: "1.6" }}>
  {f.desc}
</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default FeaturesSection;