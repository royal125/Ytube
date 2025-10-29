// src/components/CategoryButtons.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import { useNavigate, useLocation } from "react-router-dom";

// animations
import youtubeAnim from "./assets/youtube.json";
import facebookAnim from "./assets/facebook.json";
import mp3Anim from "./assets/mp3.json";
import instagramAnim from "./assets/instagram.json";
import reelAnim from "./assets/reel.json";


const CategoryButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { key: "youtube", path: "/", label: "YouTube Video Downloader", anim: youtubeAnim, color: "linear-gradient(135deg, #1877f2, #3b5998)" },
    { key: "mp3", path: "/Mp3Page", label: "Mp4 to Mp3 Converter", anim: mp3Anim, color: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    { key: "instagram", path: "/instagram", label: "Instagram Video Downloader", anim: instagramAnim, color: "linear-gradient(135deg, #e1306c, #fd1d1d)" },
    { key: "reels", path: "/reels", label: "Reels/Short Downloader", anim: reelAnim, color: "linear-gradient(135deg, #ff416c, #ff4b2b)" },
    { key: "facebook", path: "/facebook", label: "Facebook Video Downloader", anim: facebookAnim, color: "linear-gradient(135deg, #ff0000, #ff4d4d)" },
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center text-center g-3">
        {buttons.map((btn) => {
          const isActive = location.pathname === btn.path;

          return (
            <Col key={btn.key} xs={12} sm={6} md={4} lg={2}>
              <Button
                className="w-100 py-3 fw-bold text-white border-0 d-flex flex-column align-items-center justify-content-center"
                style={{
                  background: btn.color,
                  borderRadius: "16px",
                  transition: "all 0.3s ease-in-out",
                  height: "180px",
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  boxShadow: isActive
                    ? "0 8px 25px rgba(0,0,0,0.4)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
                }}
                onClick={() => navigate(btn.path)}
              >
                <div style={{ height: "60px", width: "60px" }}>
                  <Lottie animationData={btn.anim} loop autoplay />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  {btn.label}
                </div>
              </Button>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CategoryButtons;
