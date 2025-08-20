import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { username, setUsername, password, setPassword, error, message, handleLogin } = useLogin();
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(() => {
      setIsAuthenticated(true);
      navigate("/home");
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: theme.palette.mode === "light"
          ? "linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9)"
          : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          maxWidth: 400,
          color: theme.palette.mode === "light" ? "inherit" : "white",
          transition: "all 0.3s ease",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          align="center"
          fontWeight="bold"
          sx={{
            color: theme.palette.mode === "light" ? "inherit" : "white",
            transition: "color 0.3s ease"
          }}
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

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{ color: "#ccc", "&.Mui-checked": { color: "white" } }}
                />
              }
              label={<Typography sx={{
                fontSize: 14,
                color: theme.palette.mode === "light" ? "text.secondary" : "#ccc",
                transition: "color 0.3s ease"
              }}>Remember me</Typography>}
            />
            <Typography sx={{
              fontSize: 13,
              color: theme.palette.mode === "light" ? "text.secondary" : "#aaa",
              cursor: "pointer",
              transition: "color 0.3s ease"
            }}>Forgot Password?</Typography>
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
              background: theme.palette.mode === "light"
                ? "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)"
                : "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
              color: "#ffffff",
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: theme.palette.mode === "light"
                ? "0 4px 12px rgba(25, 118, 210, 0.3)"
                : "0 4px 12px rgba(28, 181, 224, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: theme.palette.mode === "light"
                  ? "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)"
                  : "linear-gradient(90deg, #0d47a1 0%, #1CB5E0 100%)",
                boxShadow: theme.palette.mode === "light"
                  ? "0 6px 16px rgba(25, 118, 210, 0.4)"
                  : "0 6px 16px rgba(28, 181, 224, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0px)",
              },
            }}
          >
            🔐 LOGIN
          </Button>
        </form>

        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default LoginPage;
