import React from "react";
import { Box, Typography, Paper, Pagination } from "@mui/material";
import usePagination from "../hooks/usePagination";

const HomePage: React.FC = () => {
    const { page, totalPages, handleChange } = usePagination({
        initialPage: 1,
        totalPages: 2,
        useRouting: true,
        routeMap: {
            1: "/home",
            2: "/users",
        },
    });

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
                    🎉 You're Logged In!
                    Welcome to our Home Page
                </Typography>

                <Typography sx={{ color: "#ccc" }}>
                    This is page {page} of your content.
                </Typography>
            </Paper>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                color="primary"
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "white",
                        borderColor: "white",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#1CB5E0 !important",
                        color: "white",
                    },
                }}
            />
        </Box>
    );
};

export default HomePage;
