import React from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleLogin,
    } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(() => navigate("/home"));
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw", // lpage kamla tzhr
                background: "linear-gradient(to right, #ece9e6, #ffffff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                overflow: "hidden",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 5,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 400,
                }}
            >
                <Typography
                    variant="h4"
                    mb={3}
                    align="center"
                    fontWeight="bold"
                >
                    Welcome Back
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: 2,
                        }}
                    >
                        Login
                    </Button>
                </form>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>
        </Box>
    );
};

export default LoginPage;
