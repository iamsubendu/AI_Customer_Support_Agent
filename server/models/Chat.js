const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ userId: 1, lastMessageAt: -1 });

module.exports = mongoose.model("Chat", chatSchema);
