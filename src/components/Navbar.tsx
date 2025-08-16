import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleMode: () => void;
  mode: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ toggleMode, mode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all application data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("businessUnits");
    localStorage.removeItem("directories");

    // Navigate back to login page
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={Link} to="/home" sx={{ textTransform: "none" }}>Home</Button>
          <Button color="inherit" component={Link} to="/users" sx={{ textTransform: "none" }}>Users</Button>
          <Button color="inherit" component={Link} to="/business-units" sx={{ textTransform: "none" }}>Business units</Button>
          <Button color="inherit" component={Link} to="/active-directory" sx={{ textTransform: "none" }}>Active directory</Button>
          <Button color="inherit" onClick={handleLogout} sx={{ textTransform: "none" }}>Logout</Button>
          <Button color="inherit" onClick={toggleMode} sx={{ textTransform: "none" }}>
            {mode === "light" ? "Dark mode" : "Light mode"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
