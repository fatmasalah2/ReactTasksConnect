import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Paper,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/login";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    // lma t3ml login successfully 
    // ru7li 3l home page

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            // bb3t info luser le func login 
            // we bbaa mstnia lrd li hwa token
            const tokenData = await login({ username, password });
            // sheli ay haga adema kanet mwguda
            // 34n kn by3ml store 3la lvalues ladema lmwguda

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("tokenExpiresIn");
            localStorage.removeItem("refreshTokenExpiresIn");

            //   Store in localStorage
            //   localStorage.setItem("token", tokenData.token);
            //   localStorage.setItem("refreshToken", tokenData.refreshToken);
            //   localStorage.setItem("tokenExpiresIn", tokenData.expiresIn.toString());
            //   localStorage.setItem("refreshTokenExpiresIn", tokenData.refreshExpiresIn.toString());
            //   Store all token data in one object
            localStorage.setItem("authToken", JSON.stringify({
                // bdl ma kul haga tbaa lw7dha 
                // khalehum object
                token: tokenData.token,
                refreshToken: tokenData.refreshToken,
                expiresIn: tokenData.expiresIn,
                refreshExpiresIn: tokenData.refreshExpiresIn
            }));

            setError("");
            // be shakl mbd2i mfesh errors

            console.log("Logged in successfully!");
            navigate("/home");
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin();
    };
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    maxWidth: 400,
                    color: "white",
                }}
            >
                <Typography
                    variant="h4"
                    mb={3}
                    align="center"
                    fontWeight="bold"
                    sx={{ color: "white" }}
                >
                    Welcome!
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            sx: {
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: 1,
                                color: "white",
                            },
                        }}
                        InputLabelProps={{ style: { color: "#ccc" } }}
                    />

                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: 1,
                                color: "white",
                            },
                        }}
                        InputLabelProps={{ style: { color: "#ccc" } }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    sx={{
                                        color: "#ccc",
                                        "&.Mui-checked": { color: "white" },
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{ fontSize: 14, color: "#ccc" }}>
                                    Remember me
                                </Typography>
                            }
                        />
                        <Typography sx={{ fontSize: 13, color: "#aaa", cursor: "pointer" }}>
                            Forgot Password?
                        </Typography>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: 2,
                            background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
                        }}
                    >
                        LOGIN
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

export default LoginForm;
