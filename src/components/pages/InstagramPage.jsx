import React from "react";
import { Box, Typography } from "@mui/material";

const InstagramPage = () => {
  return (
    <Box sx={{ py: 10, textAlign: "center", color: "white" }}>
      <Typography variant="h3" fontWeight={700}>
        📸 Instagram Video Downloader
      </Typography>
      <Typography variant="body1" mt={2}>
        This page will handle Instagram video downloads (coming soon).
      </Typography>
    </Box>
  );
};

export default InstagramPage;
