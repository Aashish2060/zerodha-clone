import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const AppWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // ✅ React way (no reload)
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

// ✅ Wrap BrowserRouter OUTSIDE
const RootApp = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);