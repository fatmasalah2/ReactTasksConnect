import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                background: "linear-gradient(to right, #fdfbfb, #ebedee)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                overflow: "hidden", // mbaash b3ml scroll fy lpage
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 6,
                    borderRadius: 4,
                    maxWidth: 600,
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#1976d2" }}
                >
                    🎉 You're Logged In!
                </Typography>
                <Typography variant="h6" sx={{ color: "gray" }}>
                    Welcome to the home page Feel free to explore.
                </Typography>
            </Paper>
        </Box>
    );
};

export default HomePage;
