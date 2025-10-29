// src/index.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./components/theme";

  // ✅ will now work if theme.js exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
