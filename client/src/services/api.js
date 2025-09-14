import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
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
