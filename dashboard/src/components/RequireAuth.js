import React from "react";

// Where the frontend (landing/login) app lives.
const FRONTEND_URL = "https://neotrade-sg6a.onrender.com";

// Wraps the dashboard so it only renders when a token is present.
// If there's no token, it bounces the user to the frontend login page.
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("neotrade_token");

  if (!token) {
    window.location.href = `${FRONTEND_URL}/login`;
    return null;
  }

  return children;
};

export default RequireAuth;
