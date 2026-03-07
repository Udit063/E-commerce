import axios from "axios";

// export const API_BASE_URL = "http://localhost:8080";
export const API_BASE_URL = "https://e-commerce-backend-2jia.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Explicitly set to false for CORS
});

api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: Add response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("jwt");
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
