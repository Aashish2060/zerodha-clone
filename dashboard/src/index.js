import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

// ✅ Read token from URL BEFORE React mounts (runs synchronously)
const params = new URLSearchParams(window.location.search);
const urlToken = params.get("token");
const urlName = params.get("name");

if (urlToken && urlToken !== "undefined") {
  localStorage.setItem("token", urlToken);
}
if (urlName && urlName !== "undefined") {
  localStorage.setItem("user", JSON.stringify({ name: decodeURIComponent(urlName) }));
}
if (urlToken || urlName) {
  window.history.replaceState({}, document.title, "/");
}

// ✅ Auth check — token is already in localStorage by now
const AppWrapper = () => {
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

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