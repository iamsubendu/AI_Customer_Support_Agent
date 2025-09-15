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

    // Create new chat if no chatId provided
    if (!chatId) {
      chat = new Chat({
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [],
      });
    } else {
      chat = await Chat.findOne({ _id: chatId, userId });
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
    }

    // Add user message to chat
    const userMessage = {
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
    };
    chat.messages.push(userMessage);

    // Get all messages for this chat to send to AI
    const allMessages = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate AI response
    const aiResponse = await aiService.generateResponse(allMessages);

    // Add AI message to chat
    const aiMessage = {
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    };
    chat.messages.push(aiMessage);

    // Update chat last message time
    chat.lastMessageAt = new Date();
    await chat.save();

    res.status(200).json({
      message: "Message sent successfully",
      chatId: chat._id,
      aiResponse,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("Error sending message:", error);
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

    // Map _id to id for client compatibility
    const formattedChats = chats.map((chat) => ({
      id: chat._id,
      title: chat.title,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    }));

    res.status(200).json({
      message: "Chat history retrieved successfully",
      chats: formattedChats,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
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

    // Sort messages by timestamp
    const sortedMessages = chat.messages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    res.status(200).json({
      chat: {
        id: chat._id,
        title: chat.title,
        messages: sortedMessages,
        createdAt: chat.createdAt,
        lastMessageAt: chat.lastMessageAt,
      },
    });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Server error while fetching chat" });
  }
});

router.delete("/:chatId", auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Delete the chat (messages are embedded, so they'll be deleted with the chat)
    await Chat.findByIdAndDelete(chatId);

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Server error while deleting chat" });
  }
});

module.exports = router;
