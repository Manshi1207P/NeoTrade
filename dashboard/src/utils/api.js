import axios from "axios";

// Where the frontend (landing/login) app lives.
const FRONTEND_URL = "https://neotrade-backend.onrender.com";

const api = axios.create({
  baseURL: "https://neotrade-backend.onrender.com",
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("neotrade_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever says the token is invalid/expired, clear it and
// send the user back to the login page on the frontend app.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("neotrade_token");
      localStorage.removeItem("neotrade_user");
      window.location.href = `${FRONTEND_URL}/login`;
    }
    return Promise.reject(error);
  }
);

export default api;
