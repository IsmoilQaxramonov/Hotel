import axios from "axios";

const API_BASE_URL = "http://165.22.81.140/api/v1/";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // lang: localStorage.getItem("language") || "uz",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();

      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

