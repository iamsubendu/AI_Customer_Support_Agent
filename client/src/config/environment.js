// Environment configuration
const getApiUrl = () => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // In production, use the Vercel deployment URL
    return import.meta.env.VITE_API_URL || "https://your-server-app.vercel.app";
  }

  // In development, use localhost
  return import.meta.env.VITE_API_URL || "http://localhost:5000";
};

export const API_BASE_URL = getApiUrl();
