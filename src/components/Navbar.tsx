import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleMode: () => void;
  mode: "light" | "dark";
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMode, mode, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    // Clear all application data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("businessUnits");
    localStorage.removeItem("directories");

    // Update authentication state
    setIsAuthenticated(false);

    // Navigate back to login page
    navigate("/");
  };

  const buttonStyle = {
    textTransform: "none" as const,
    color: mode === "light" ? "#1976d2" : "#ffffff",
    backgroundColor: mode === "light" ? "rgba(25, 118, 210, 0.08)" : "rgba(255, 255, 255, 0.08)",
    border: mode === "light" ? "1px solid rgba(25, 118, 210, 0.2)" : "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: "6px 16px",
    margin: "0 4px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(25, 118, 210, 0.12)" : "rgba(255, 255, 255, 0.12)",
      borderColor: mode === "light" ? "rgba(25, 118, 210, 0.4)" : "rgba(255, 255, 255, 0.4)",
      transform: "translateY(-1px)",
      boxShadow: mode === "light"
        ? "0 4px 8px rgba(25, 118, 210, 0.2)"
        : "0 4px 8px rgba(255, 255, 255, 0.2)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    color: mode === "light" ? "#d32f2f" : "#ffcdd2",
    backgroundColor: mode === "light" ? "rgba(211, 47, 47, 0.08)" : "rgba(255, 205, 210, 0.08)",
    border: mode === "light" ? "1px solid rgba(211, 47, 47, 0.2)" : "1px solid rgba(255, 205, 210, 0.2)",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(211, 47, 47, 0.12)" : "rgba(255, 205, 210, 0.12)",
      borderColor: mode === "light" ? "rgba(211, 47, 47, 0.4)" : "rgba(255, 205, 210, 0.4)",
      transform: "translateY(-1px)",
      boxShadow: mode === "light"
        ? "0 4px 8px rgba(211, 47, 47, 0.2)"
        : "0 4px 8px rgba(255, 205, 210, 0.2)",
    },
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    color: mode === "light" ? "#ff9800" : "#ffcc02",
    backgroundColor: mode === "light" ? "rgba(255, 152, 0, 0.08)" : "rgba(255, 204, 2, 0.08)",
    border: mode === "light" ? "1px solid rgba(255, 152, 0, 0.2)" : "1px solid rgba(255, 204, 2, 0.2)",
    "&:hover": {
      backgroundColor: mode === "light" ? "rgba(255, 152, 0, 0.12)" : "rgba(255, 204, 2, 0.12)",
      borderColor: mode === "light" ? "rgba(255, 152, 0, 0.4)" : "rgba(255, 204, 2, 0.4)",
      transform: "translateY(-1px)",
      boxShadow: mode === "light"
        ? "0 4px 8px rgba(255, 152, 0, 0.2)"
        : "0 4px 8px rgba(255, 204, 2, 0.2)",
    },
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
        color: mode === "light" ? "#333333" : "#ffffff",
        boxShadow: mode === "light"
          ? "0 2px 8px rgba(0, 0, 0, 0.1)"
          : "0 2px 8px rgba(0, 0, 0, 0.3)",
        borderBottom: mode === "light"
          ? "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: mode === "light" ? "#1976d2" : "#90caf9",
            fontWeight: "bold",
          }}
        >
          My App
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/home" sx={buttonStyle}>
            Home
          </Button>
          <Button component={Link} to="/users" sx={buttonStyle}>
            Users
          </Button>
          <Button component={Link} to="/business-units" sx={buttonStyle}>
            Business units
          </Button>
          <Button component={Link} to="/active-directory" sx={buttonStyle}>
            Active directory
          </Button>
          <Button onClick={handleLogout} sx={logoutButtonStyle}>
            Logout
          </Button>
          <Button onClick={toggleMode} sx={toggleButtonStyle}>
            {mode === "light" ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
