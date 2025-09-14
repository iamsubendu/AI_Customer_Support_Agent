import axios from "axios";
import ErrorHandler from "../utils/errorHandler";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
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
    ErrorHandler.handle(error, "Request interceptor");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "NETWORK_ERROR" || !error.response) {
      ErrorHandler.handleNetworkError();
    } else if (error.response?.status === 401) {
      ErrorHandler.handleAuthError();
      localStorage.removeItem("token");
      window.location.href = "/auth";
    } else if (error.response?.status >= 500) {
      ErrorHandler.handle(error, "Server error");
    } else if (error.response?.status >= 400) {
      ErrorHandler.handle(error, "Client error");
    } else {
      ErrorHandler.handle(error, "API error");
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  signup: (name, email, password) =>
    api.post("/auth/signup", { name, email, password }),
  getCurrentUser: () => api.get("/auth/me"),
};

export const chatAPI = {
  sendMessage: (message, chatId) => api.post("/chat/send", { message, chatId }),
  getHistory: (page = 1, limit = 10) =>
    api.get(`/chat/history?page=${page}&limit=${limit}`),
  getChat: (chatId) => api.get(`/chat/${chatId}`),
  deleteChat: (chatId) => api.delete(`/chat/${chatId}`),
};

export default api;
