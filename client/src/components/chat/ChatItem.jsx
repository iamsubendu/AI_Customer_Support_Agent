import React, { useState } from "react";
import Button from "../custom/Button";
import ConfirmationModal from "../custom/ConfirmationModal";

const ChatItem = ({ chat, isActive, onSelect, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatTime = (dateString) => {
    // Handle both ISO strings and Date objects for backward compatibility
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(chat.id);
  };

  const handleChatSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(chat);
  };

  return (
    <div className="chat-item-wrapper">
      <button
        onClick={handleChatSelect}
        className={`chat-item ${isActive ? "active" : ""}`}
      >
        <div className="chat-content">
          <div className="chat-title">{chat.title}</div>
          <div className="chat-time">{formatTime(chat.lastMessageAt)}</div>
        </div>
      </button>
      <button
        type="button"
        onClick={handleDeleteClick}
        className="delete-btn"
        aria-label="Delete chat"
      >
        ×
      </button>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Chat"
        message="Are you sure you want to delete this chat? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </div>
  );
};

export default ChatItem;
