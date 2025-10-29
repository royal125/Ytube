// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    background: {
      default: "#0f172a", // background stays dark
      paper: "rgba(255, 255, 255, 0.08)", // glass effect base
    },
    text: { primary: "#ffffff", secondary: "#94a3b8" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backdropFilter: "blur(10px)", // blur glass effect
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
          },
        },
      },
    },
  },
});

export default theme;
