import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  // 3ady lw kunt est5dmt
  // el react func comp.
  // mn gher React.FC
  // bs de btdeni mumyzat aktr
  // zy autocomplete 
  // aw lw ehtagt azwd props msln

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;
