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
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 500,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          },
          contained: {
            boxShadow: mode === "light"
              ? "0 2px 4px rgba(25, 118, 210, 0.2)"
              : "0 2px 4px rgba(144, 202, 249, 0.2)",
            "&:hover": {
              boxShadow: mode === "light"
                ? "0 4px 8px rgba(25, 118, 210, 0.3)"
                : "0 4px 8px rgba(144, 202, 249, 0.3)",
            },
          },
          outlined: {
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          },
        },
      },
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

// Shared button styles for consistent appearance
export const getButtonStyles = (mode: "light" | "dark") => ({
  primary: {
    backgroundColor: mode === "light" ? "#1976d2" : "#90caf9",
    color: mode === "light" ? "#ffffff" : "#000000",
    border: "none",
    "&:hover": {
      backgroundColor: mode === "light" ? "#1565c0" : "#64b5f6",
    },
  },
  secondary: {
    backgroundColor: mode === "light" ? "rgba(25, 118, 210, 0.08)" : "rgba(144, 202, 249, 0.08)",
    color: mode === "light" ? "#1976d2" : "#90caf9",
    border: mode === "light" ? "1px solid rgba(25, 118, 210, 0.3)" : "1px solid rgba(144, 202, 249, 0.3)",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(25, 118, 210, 0.12)" : "rgba(144, 202, 249, 0.12)",
      borderColor: mode === "light" ? "rgba(25, 118, 210, 0.5)" : "rgba(144, 202, 249, 0.5)",
    },
  },
  danger: {
    backgroundColor: mode === "light" ? "rgba(211, 47, 47, 0.08)" : "rgba(244, 67, 54, 0.08)",
    color: mode === "light" ? "#d32f2f" : "#f44336",
    border: mode === "light" ? "1px solid rgba(211, 47, 47, 0.3)" : "1px solid rgba(244, 67, 54, 0.3)",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(211, 47, 47, 0.12)" : "rgba(244, 67, 54, 0.12)",
      borderColor: mode === "light" ? "rgba(211, 47, 47, 0.5)" : "rgba(244, 67, 54, 0.5)",
    },
  },
  success: {
    backgroundColor: mode === "light" ? "rgba(76, 175, 80, 0.08)" : "rgba(76, 175, 80, 0.08)",
    color: mode === "light" ? "#2e7d32" : "#4caf50",
    border: mode === "light" ? "1px solid rgba(76, 175, 80, 0.3)" : "1px solid rgba(76, 175, 80, 0.3)",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(76, 175, 80, 0.12)" : "rgba(76, 175, 80, 0.12)",
      borderColor: mode === "light" ? "rgba(76, 175, 80, 0.5)" : "rgba(76, 175, 80, 0.5)",
    },
  },
});
