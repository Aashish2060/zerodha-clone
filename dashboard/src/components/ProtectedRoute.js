import React from "react";
import { Navigate } from "react-router-dom";

// Protect any route: only allow if token exists
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />; // redirect if no token
  }
  return children;
};

export default ProtectedRoute;