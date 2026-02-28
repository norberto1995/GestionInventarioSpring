import axios from "axios";

const api = axios.create({
  baseURL: "https://gestioninventariospring-production.up.railway.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  res => res,
  err => {
    const originalRequest = err.config;

    // 🔥 No interceptar errores del login
    if (
      err.response?.status === 401 &&
      !originalRequest.url.includes("/auth/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);


export default api;
