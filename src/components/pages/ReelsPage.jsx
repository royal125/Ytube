import React from "react";
import { Box, Typography } from "@mui/material";

const ReelsPage = () => {
  return (
    <Box sx={{ py: 10, textAlign: "center", color: "white" }}>
      <Typography variant="h3" fontWeight={700}>
        🎬 Reels / Shorts Downloader
      </Typography>
      <Typography variant="body1" mt={2}>
        This page will handle Reels / Shorts downloads (coming soon).
      </Typography>
    </Box>
  );
};

export default ReelsPage;
