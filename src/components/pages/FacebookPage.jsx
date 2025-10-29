import React from "react";
import { Box, Typography } from "@mui/material";

const FacebookPage = () => {
  return (
    <Box sx={{ py: 10, textAlign: "center", color: "white" }}>
      <Typography variant="h3" fontWeight={700}>
        📘 Facebook Video Downloader
      </Typography>
      <Typography variant="body1" mt={2}>
        This page will handle Facebook video downloads (coming soon).
      </Typography>
    </Box>
  );
};

export default FacebookPage;
