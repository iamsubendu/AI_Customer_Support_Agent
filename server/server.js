const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const aiService = require("./services/aiService");

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["http://localhost:3000", "https://your-domain.com"]
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Disable caching for API routes
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/health", async (req, res) => {
  try {
    const aiStatus = await aiService.checkConnection();
    res.json({
      status: "OK",
      message: "AI Customer Support Server is running",
      services: {
        database: "Connected",
        ai: {
          connected: aiStatus.connected,
          service: aiStatus.service,
          model: aiStatus.model || null,
          error: aiStatus.error || null,
        },
      },
    });
  } catch (error) {
    res.json({
      status: "OK",
      message: "AI Customer Support Server is running",
      services: {
        database: "Connected",
        ai: {
          connected: false,
          service: "OpenRouter AI",
          error: error.message,
        },
      },
    });
  }
});

// Connect to database
connectDB();

// Check AI service connection
const checkAIService = async () => {
  try {
    console.log("🔍 Checking AI service connection...");
    const aiStatus = await aiService.checkConnection();

    if (aiStatus.connected) {
      console.log(`✅ AI Service Connected: ${aiStatus.service}`);
      console.log(`   Model: ${aiStatus.model}`);
    } else {
      console.log(`❌ AI Service Connection Failed: ${aiStatus.service}`);
      console.log(`   Error: ${aiStatus.error}`);
      console.log("   ⚠️  AI features will use fallback responses");
    }
  } catch (error) {
    console.log(`❌ AI Service Connection Error: ${error.message}`);
    console.log("   ⚠️  AI features will use fallback responses");
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Health check available at: http://localhost:${PORT}/health`);

  // Check AI service after server starts
  await checkAIService();
});

module.exports = app;
