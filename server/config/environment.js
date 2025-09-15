// Environment configuration for server
const config = {
  // Database
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/ai-customer-support",

  // JWT
  JWT_SECRET:
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",

  // AI Service
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",

  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};

module.exports = config;
