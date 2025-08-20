import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { getTheme } from "./theme";
import { isAuthenticated } from "./services/token";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import BusinessUnitPage from "./pages/BusinessUnitPage";
import ActiveDirectoryPage from "./pages/ActiveDirectoryPage";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isAuth, setIsAuth] = useState(false);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const location = useLocation();

  // Check authentication status on app load and route changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    checkAuth();

    // Listen for storage changes (when logout happens in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        checkAuth();
      }
    };

    // Periodic check for authentication (every 30 seconds)
    const intervalId = setInterval(checkAuth, 30000);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, [location.pathname]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Don't show navbar on login page
  const showNavbar = location.pathname !== "/" && isAuth;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showNavbar && <Navbar toggleMode={toggleMode} mode={mode} setIsAuthenticated={setIsAuth} />}
      <Routes>
        <Route path="/" element={
          isAuth ? <Navigate to="/home" replace /> : <LoginPage setIsAuthenticated={setIsAuth} />
        } />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        } />
        <Route path="/business-units" element={
          <ProtectedRoute>
            <BusinessUnitPage />
          </ProtectedRoute>
        } />
        <Route path="/active-directory" element={
          <ProtectedRoute>
            <ActiveDirectoryPage />
          </ProtectedRoute>
        } />
        {/* Catch all other routes and redirect to home if authenticated, or login if not */}
        <Route path="*" element={
          isAuth ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
        } />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
