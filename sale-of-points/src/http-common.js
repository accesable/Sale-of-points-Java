// src/utils/api.js or src/services/api.js
import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8085/api/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
