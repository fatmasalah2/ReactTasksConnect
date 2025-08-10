import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import Navbar from "./components/Navbar"; // ✅ import navbar

const App: React.FC = () => {

  // 3ady lw kunt est5dmt
  // el react func comp.
  // mn gher React.FC
  // bs de btdeni mumyzat aktr
  // zy autocomplete 
  // aw lw ehtagt azwd props msln

  const location = useLocation();

  // hide navbar on login page only 
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
};

export default App;

// bygm3 lpages m3 lroutes