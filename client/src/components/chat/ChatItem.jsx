import React from "react";
import Button from "../custom/Button";

const ChatItem = ({ chat, isActive, onSelect, onDelete }) => {
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

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this chat?")) {
      onDelete(chat.id);
    }
  };

  return (
    <div className="chat-item-wrapper">
      <button
        onClick={() => onSelect(chat)}
        className={`chat-item ${isActive ? "active" : ""}`}
      >
        <div className="chat-title">{chat.title}</div>
        <div className="chat-time">{formatTime(chat.lastMessageAt)}</div>
      </button>
      <Button
        variant="link"
        size="small"
        onClick={handleDelete}
        className="delete-btn"
      >
        ×
      </Button>
    </div>
  );
};

export default ChatItem;
