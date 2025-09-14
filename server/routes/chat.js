const express = require("express");
const Chat = require("../models/Chat");
const aiService = require("../services/aiService");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/send", auth, async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user._id;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let chat;

    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId });
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
    } else {
      chat = new Chat({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [],
      });
    }

    chat.messages.push({
      role: "user",
      content: message.trim(),
    });

    const aiResponse = await aiService.generateResponse(chat.messages);

    chat.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    chat.lastMessageAt = new Date();

    await chat.save();

    res.json({
      message: "Message sent successfully",
      chatId: chat._id,
      aiResponse,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("Chat send error:", error);
    res.status(500).json({ message: "Server error while sending message" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const chats = await Chat.find({ userId })
      .select("title lastMessageAt createdAt")
      .sort({ lastMessageAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Chat.countDocuments({ userId });

    res.json({
      chats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Chat history error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching chat history" });
  }
});

router.get("/:chatId", auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json({
      chat: {
        id: chat._id,
        title: chat.title,
        messages: chat.messages,
        createdAt: chat.createdAt,
        lastMessageAt: chat.lastMessageAt,
      },
    });
  } catch (error) {
    console.error("Get chat error:", error);
    res.status(500).json({ message: "Server error while fetching chat" });
  }
});

router.delete("/:chatId", auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOneAndDelete({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete chat error:", error);
    res.status(500).json({ message: "Server error while deleting chat" });
  }
});

module.exports = router;
