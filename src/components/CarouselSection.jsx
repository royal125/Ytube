import React from "react";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";

const CarouselSection = () => {
  const features = [
    {
      id: 1,
      title: "YouTube Video Downloader",
      description: "Download HD videos from YouTube in multiple formats and resolutions",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "YouTube Video Download - HD Quality Videos Download",
      badge: "🎬 YouTube"
    },
    {
      id: 2,
      title: "MP4 to MP3 Converter",
      description: "Convert video files to high-quality MP3 audio instantly",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "MP4 to MP3 Converter - Audio Extraction Tool",
      badge: "🎵 MP3"
    },
    {
      id: 3,
      title: "Facebook Video Downloader",
      description: "Save videos from Facebook posts and stories quickly",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Facebook Video Download - Social Media Video Saver",
      badge: "📘 Facebook"
    },
    {
      id: 4,
      title: "Instagram Video Downloader",
      description: "Download videos, reels, and IGTV from Instagram",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Instagram Video Download - Reels and Stories Download",
      badge: "📷 Instagram"
    },
    {
      id: 5,
      title: "4K & HD Quality",
      description: "Download videos in 4K Ultra HD, 1080p, and multiple resolutions",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "4K HD Video Download - High Resolution Videos",
      badge: "⚡ HD Quality"
    },
    {
      id: 6,
      title: "Fast & Secure Downloads",
      description: "Quick downloads with complete privacy and security protection",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Fast Secure Video Download - Privacy Protected Downloads",
      badge: "🔒 Secure"
    }
  ];

  // Split features into two slides of 3 items each
  const slide1 = features.slice(0, 3);
  const slide2 = features.slice(3, 6);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold" style={{ 
        color: '#2c3e50',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem',
        marginBottom: '3rem !important'
      }}>
        Our Download Services
      </h2>
      
      <Carousel 
        indicators={true} 
        controls={true}
        interval={5000}
        fade={false}
        className="custom-carousel"
        prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon custom-prev" />}
        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon custom-next" />}
      >
        {/* Slide 1 */}
        <Carousel.Item>
          <Row className="g-4">
            {slide1.map((feature) => (
              <Col key={feature.id} md={4}>
                <Card className="h-100 shadow-lg border-0 feature-card">
                  <div className="image-container position-relative">
                    <Card.Img 
                      variant="top" 
                      src={feature.image} 
                      alt={feature.alt}
                      title={feature.title}
                      style={{
                        height: '220px',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="feature-badge">
                      {feature.badge}
                    </div>
                  </div>
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold text-dark mb-2 fs-5">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {feature.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="feature-indicators">
                        <span className="indicator success"></span>
                        <span className="indicator warning"></span>
                        <span className="indicator info"></span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <Row className="g-4">
            {slide2.map((feature) => (
              <Col key={feature.id} md={4}>
                <Card className="h-100 shadow-lg border-0 feature-card">
                  <div className="image-container position-relative">
                    <Card.Img 
                      variant="top" 
                      src={feature.image} 
                      alt={feature.alt}
                      title={feature.title}
                      style={{
                        height: '220px',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="feature-badge">
                      {feature.badge}
                    </div>
                  </div>
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Title className="fw-bold text-dark mb-2 fs-5">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {feature.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="feature-indicators">
                        <span className="indicator success"></span>
                        <span className="indicator warning"></span>
                        <span className="indicator info"></span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>

      {/* SEO Rich Text Section */}
      <div className="text-center mt-5">
        <p className="text-muted lead">
          <strong>Free Online Video Downloader</strong> - Download videos from YouTube, Facebook, Instagram and convert MP4 to MP3. 
          Fast, secure, and high-quality downloads for all your needs. Support for 4K, HD, and multiple formats.
        </p>
        <div className="seo-keywords mt-3">
          <span className="badge bg-primary me-2 mb-2">YouTube Video Downloader</span>
          <span className="badge bg-success me-2 mb-2">MP4 to MP3 Converter</span>
          <span className="badge bg-info me-2 mb-2">Facebook Video Download</span>
          <span className="badge bg-warning me-2 mb-2">Instagram Video Download</span>
          <span className="badge bg-danger me-2 mb-2">4K HD Quality</span>
          <span className="badge bg-dark me-2 mb-2">Secure Downloads</span>
        </div>
      </div>

      <style jsx>{`
        .custom-carousel {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }
        
        .feature-card {
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          background: white;
          border: none;
          height: 100%;
        }
        
        .feature-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        }
        
        .feature-card:hover .card-img {
          transform: scale(1.08);
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .feature-card:hover .image-overlay {
          opacity: 1;
        }
        
        .feature-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255,255,255,0.95);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
        }
        
        .feature-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 15px;
        }
        
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        .indicator.success {
          background: #28a745;
          animation-delay: 0s;
        }
        
        .indicator.warning {
          background: #ffc107;
          animation-delay: 0.3s;
        }
        
        .indicator.info {
          background: #17a2b8;
          animation-delay: 0.6s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .carousel-control-prev,
        .carousel-control-next {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.9;
          margin: 0 25px;
          border: 3px solid white;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: brightness(0) invert(1);
          width: 25px;
          height: 25px;
        }
        
        .carousel-indicators {
          bottom: -50px;
        }
        
        .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 6px;
          background-color: #667eea;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .carousel-indicators button.active {
          background-color: #764ba2;
          transform: scale(1.2);
        }
        
        .seo-keywords {
          font-size: 0.9rem;
        }
        
        .seo-keywords .badge {
          font-size: 0.8rem;
          padding: 8px 12px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        
        .seo-keywords .badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 768px) {
          .carousel-control-prev,
          .carousel-control-next {
            width: 45px;
            height: 45px;
            margin: 0 10px;
          }
          
          .feature-badge {
            font-size: 0.7rem;
            padding: 4px 8px;
          }
          
          .seo-keywords .badge {
            font-size: 0.7rem;
            padding: 6px 10px;
          }
        }
      `}</style>
    </Container>
  );
};

export default CarouselSection;