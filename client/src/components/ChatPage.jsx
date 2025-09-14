import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { chatAPI } from "../services/api";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import toast from "react-hot-toast";

const ChatPage = () => {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (currentChat) {
      loadChatMessages(currentChat.id);
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getHistory();
      setChats(response.data.chats);
    } catch (error) {
      toast.error("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const loadChatMessages = async (chatId) => {
    try {
      const response = await chatAPI.getChat(chatId);
      setMessages(response.data.chat.messages);
    } catch (error) {
      toast.error("Failed to load chat messages");
    }
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  const selectChat = (chat) => {
    setCurrentChat(chat);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setSending(true);
    setTyping(true);

    try {
      const response = await chatAPI.sendMessage(message, currentChat?.id);
      const { aiResponse, messages: updatedMessages, chatId } = response.data;

      setMessages(updatedMessages);

      if (!currentChat) {
        const newChat = {
          id: chatId,
          title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
          lastMessageAt: new Date(),
        };
        setCurrentChat(newChat);
        setChats((prev) => [newChat, ...prev]);
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChat.id
              ? { ...chat, lastMessageAt: new Date() }
              : chat
          )
        );
      }
    } catch (error) {
      toast.error("Failed to send message");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await chatAPI.deleteChat(chatId);
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));

      if (currentChat && currentChat.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }

      toast.success("Chat deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chat");
    }
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={startNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        user={user}
        onLogout={logout}
        loading={loading}
      />

      <div className="main-chat">
        <div className="chat-header">
          <h2 className="chat-title-header">
            {currentChat ? currentChat.title : "AI Customer Support"}
          </h2>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
          </div>
        </div>

        <ChatMessages
          messages={messages}
          typing={typing}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput onSendMessage={sendMessage} disabled={sending} />
      </div>
    </div>
  );
};

export default ChatPage;
