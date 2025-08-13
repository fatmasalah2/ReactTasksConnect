import React, { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import BusinessUnitPage from "./pages/BusinessUnitPage";
import ActiveDirectoryPage from "./pages/ActiveDirectoryPage";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/business-units" element={<BusinessUnitPage />} />
        <Route path="/active-directory" element={<ActiveDirectoryPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
