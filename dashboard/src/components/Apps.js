import React, { useEffect, useState } from "react";

const Apps = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    // 1️⃣ Check if token exists in URL (from login redirect)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken && urlToken !== "undefined") {
      localStorage.setItem("token", urlToken); // save token
      window.history.replaceState({}, document.title, "/"); // clean URL
    }

    // 2️⃣ Check token in localStorage
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    if (!token || token === "undefined") {
      // Not authenticated → redirect to login
      window.location.href = "http://localhost:3000/login";
    } else {
      // Authenticated → allow rendering
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login";
  };

  // ⏳ Wait until auth check completes to prevent flashing
  if (isAuthenticated === null) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Apps;