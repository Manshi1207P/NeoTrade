import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Where the dashboard app lives once a user is authenticated.
const DASHBOARD_URL = "http://localhost:3001";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:3002/api/auth/login", {
        email,
        password,
      });

      // Save the token + user so the dashboard app can read them.
      localStorage.setItem("neotrade_token", res.data.token);
      localStorage.setItem("neotrade_user", JSON.stringify(res.data.user));

      // Redirect to the dashboard app (a separate React app on its own port).
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container p-5 mb-5" style={{ maxWidth: "480px" }}>
      <h1 className="text-center mb-4">Log in to Neotrade</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-center mt-3">
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
