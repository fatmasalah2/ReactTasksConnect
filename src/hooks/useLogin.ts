import { useState, useRef } from "react";
import { login } from "../services/login";
import { updateToken } from "../services/token";
import type { JwtToken } from "../services/token";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleTokenRefresh = (newToken: JwtToken) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const refreshTime = (newToken.expiresIn - 60) * 1000; // refresh 1 min before expiry
    timerRef.current = setTimeout(async () => {
      try {
        const updated = await updateToken(newToken);
        localStorage.setItem("authToken", JSON.stringify(updated));
        setMessage("🔄 Token refreshed!");
        scheduleTokenRefresh(updated);
      } catch (err: any) {
        setError("Failed to refresh token");
        // If refresh fails, clear the token and redirect to login
        localStorage.removeItem("authToken");
        window.location.href = "/";
      }
    }, refreshTime);
  };

  const handleLogin = async (onSuccess: () => void) => {
    setMessage("");
    setError("");

    try {
      const res = await login({ username, password });

      // Set expiration time as current time + expiresIn seconds
      const tokenWithExpiry = {
        ...res,
        expiresIn: Math.floor(Date.now() / 1000) + res.expiresIn,
        refreshExpiresIn: Math.floor(Date.now() / 1000) + res.refreshExpiresIn,
      };

      localStorage.setItem("authToken", JSON.stringify(tokenWithExpiry));
      setMessage("Login successful!");
      scheduleTokenRefresh(tokenWithExpiry);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    error,
    handleLogin,
  };
}
