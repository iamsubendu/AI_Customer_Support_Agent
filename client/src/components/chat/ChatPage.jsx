import React, { useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
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
    loadHistory,
    loadMessages,
    sendMessage,
    deleteChat,
    selectChat,
    startNewChat,
    clearError,
  } = useChat();

  const { user, logout } = useAuth();
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat.id);
    }
  }, [currentChat, loadMessages]);

  useEffect(() => {
    if (error) {
      showError(error);
      clearError();
    }
  }, [error, showError, clearError]);

  const handleSendMessage = async (message) => {
    const result = await sendMessage(message, currentChat?.id);

    if (result.type.endsWith("/rejected")) {
      showError(result.payload || "Failed to send message");
    }
  };

  const handleSelectChat = (chat) => {
    selectChat(chat);
  };

  const handleNewChat = () => {
    startNewChat();
  };

  const handleDeleteChat = async (chatId) => {
    const result = await deleteChat(chatId);

    if (result.type.endsWith("/fulfilled")) {
      showSuccess("Chat deleted successfully");
    } else {
      showError(result.payload || "Failed to delete chat");
    }
  };

  if (loading && chats.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        user={user}
        onLogout={logout}
        loading={loading}
      />

      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} typing={typing} />
        <ChatInput onSendMessage={handleSendMessage} disabled={sending} />
      </div>
    </div>
  );
};

export default ChatPage;
