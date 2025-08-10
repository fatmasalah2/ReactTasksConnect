import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Switch,
    useTheme,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
    // start with dark
    const toggleTheme = () => {
        // de lfunction 
        // li bt2lb lmode
        setDarkMode((prev) => !prev);
    };
    // theme changes just for Navbar
    const theme = createTheme({
        // da theme special llnavbar
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: darkMode ? "#0f2027" : "#1976d2",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <AppBar
                position="static"
                color="primary"
                sx={{
                    background: darkMode
                        ? "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"
                        : "#1976d2",
                    boxShadow: "none",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        MyApp
                    </Typography>

                    <Box>
                        <Button
                            component={Link}
                            to="/"
                            sx={{ color: "#fff", fontWeight: "bold", mx: 1 }}
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to="/home"
                            sx={{ color: "#fff", fontWeight: "bold", mx: 1 }}
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/users"
                            sx={{ color: "#fff", fontWeight: "bold", mx: 1 }}
                        >
                            Users
                        </Button>

                        <Switch
                            checked={darkMode}
                            onChange={toggleTheme}
                            sx={{ ml: 2 }}
                            color="default"
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;
