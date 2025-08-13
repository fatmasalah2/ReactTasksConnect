import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                overflow: "hidden",
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    padding: 5,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 600,
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "white" }}
                >
                    🎉 You're Logged In! Welcome to our Home Page Fatmaaaaa
                </Typography>

                <Typography sx={{ color: "#ccc" }}>
                    This is your home page content.
                </Typography>
            </Paper>
        </Box>
    );
};

export default HomePage;
