import React from "react";
import { Box, Typography } from "@mui/material";

function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        🚧 About Page — Work in Maintenance
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 500 }}>
        We’re working on something exciting! Check back soon for updates.
      </Typography>
    </Box>
  );
}

export default AboutPage;
