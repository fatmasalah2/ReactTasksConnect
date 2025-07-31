import React from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";
// de lui tool we khdt mnha hagat zy button.....
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
// da custom hook bta3y 
// logic hst5dmu bdl ma a23ud aktbu kza mra

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
        // 34n mn gherha hy3ml reload mn gher ma ashuf result
        e.preventDefault();
        handleLogin(() => navigate("/home"));
        // lw 3mlt login successfully 
        // ru7li 3la page home
    };
    return (
        <Container maxWidth="sm">
            <Box mt={10} p={4} boxShadow={10} borderRadius={11} bgcolor="darkgray">
                <Typography variant="h1" mb={3} align="center" color="black">
                    Login
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
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default LoginPage;
