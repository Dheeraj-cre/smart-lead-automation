import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: better error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios error:", error.message);
    return Promise.reject(error);
  }
);

export default api;
