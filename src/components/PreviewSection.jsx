// src/components/PreviewSection.jsx
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const PreviewSection = ({ videoData }) => {
  if (!videoData) return null;

  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 3,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "260px 1fr" },
        }}
      >
        <CardMedia
          component="img"
          image={videoData.thumbnail}
          alt={videoData.title}
          sx={{ height: { xs: 200, sm: "100%" }, objectFit: "cover" }}
        />
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {videoData.title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PreviewSection;
