import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

const HomePage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                background: theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9)"
                    : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                overflow: "hidden",
                transition: "background 0.3s ease",
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: theme.palette.mode === "light"
                        ? "1px solid rgba(0, 0, 0, 0.1)"
                        : "1px solid rgba(255, 255, 255, 0.2)",
                    padding: 5,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 600,
                    color: theme.palette.mode === "light" ? "inherit" : "white",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        color: theme.palette.mode === "light" ? "inherit" : "white",
                        transition: "color 0.3s ease"
                    }}
                >
                    🎉 You're Logged In! Welcome to our Home Page Fatmaaaaa
                </Typography>

                <Typography sx={{
                    color: theme.palette.mode === "light" ? "text.secondary" : "#ccc",
                    transition: "color 0.3s ease"
                }}>
                    This is your home page content.
                </Typography>
            </Paper>
        </Box>
    );
};

export default HomePage;
