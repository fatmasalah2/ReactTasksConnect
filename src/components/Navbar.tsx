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
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button color="inherit" component={Link} to="/business-units">Business Units</Button>
          <Button color="inherit" component={Link} to="/active-directory">Active Directory</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          <Button color="inherit" onClick={toggleMode}>
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
