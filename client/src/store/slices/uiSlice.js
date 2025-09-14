import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
  sidebarOpen: true,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const toast = {
        id: Date.now().toString(),
        type: action.payload.type || "info",
        message: action.payload.message,
        duration: action.payload.duration || 4000,
        timestamp: Date.now(),
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  addToast,
  removeToast,
  clearToasts,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
