import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles"; // type-only import

export const getTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9", 
      },
      secondary: {
        main: mode === "light" ? "#ff5722" : "#ff8a65", 
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212", 
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",   
      },
      text: {
        primary: mode === "light" ? "#333333" : "#ffffff",
        secondary: mode === "light" ? "#666666" : "#b0b0b0",
      },
      divider: mode === "light" ? "#e0e0e0" : "#424242",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "light" ? "#f5f5f5" : "#121212",
            color: mode === "light" ? "#333333" : "#ffffff",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
          "#root": {
            backgroundColor: mode === "light" ? "#f5f5f5" : "#121212",
            minHeight: "100vh",
            transition: "background-color 0.3s ease",
          },
        },
      },
    },
  });
