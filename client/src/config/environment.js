// Environment configuration
const getApiUrl = () => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // In production, use the Render deployment URL
    return (
      import.meta.env.VITE_API_URL
    );
  }

  // In development, use localhost
  return import.meta.env.VITE_API_URL || "http://localhost:5000";
};

export const API_BASE_URL = getApiUrl();
