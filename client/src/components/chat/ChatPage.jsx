import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../hooks/useAuth";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import LoadingSpinner from "../custom/LoadingSpinner";

const ChatPage = () => {
  const {
    chats,
    currentChat,
    messages,
    loading,
    sending,
    typing,
    error,
    historyLoaded,
    loadHistory,
    loadMessages,
    sendMessage,
    sendChatMessage,
    deleteChat,
    selectChat,
    startNewChat,
    clearError,
  } = useChat();

  const { user, logout, isAuthenticated } = useAuth();
  const hasLoadedHistory = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (
      !hasLoadedHistory.current &&
      !historyLoaded &&
      !loading &&
      isAuthenticated
    ) {
      hasLoadedHistory.current = true;
      loadHistory();
    }
  }, [historyLoaded, loading, loadHistory, isAuthenticated]);

  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat.id);
    }
  }, [currentChat, loadMessages]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSendMessage = async (message) => {
    await sendChatMessage(message, currentChat?.id);
  };

  const handleDeleteChat = async (chatId) => {
    const result = await deleteChat(chatId);

    if (result.type.endsWith("/fulfilled")) {
      toast.success("Chat deleted successfully");
    } else {
      toast.error(result.payload || "Failed to delete chat");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSelectChat = (chat) => {
    selectChat(chat);
    // Close sidebar on mobile after selecting a chat
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  const handleNewChat = () => {
    startNewChat();
    // Close sidebar on mobile after starting new chat
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth <= 768) {
        const sidebar = document.querySelector(".sidebar");
        const menuButton = document.querySelector(".menu-button");

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          menuButton &&
          !menuButton.contains(event.target)
        ) {
          closeSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="chat-container">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}

      {/* Mobile menu button */}
      <button
        type="button"
        className={`menu-button ${sidebarOpen ? "hidden" : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
        aria-controls="sidebar"
      >
        ☰
      </button>

      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        user={user}
        onLogout={logout}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={closeSidebar}
      />

      <div className="main-chat">
        <ChatMessages messages={messages} typing={typing} />
        <ChatInput onSendMessage={handleSendMessage} disabled={sending} />
      </div>
    </div>
  );
};

export default ChatPage;
