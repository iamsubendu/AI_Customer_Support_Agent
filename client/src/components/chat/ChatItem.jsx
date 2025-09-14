import React from "react";
import Button from "../custom/Button";

const ChatItem = ({ chat, isActive, onSelect, onDelete }) => {
  const formatTime = (dateString) => {
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
    <div className="flex items-center group">
      <button
        onClick={() => onSelect(chat)}
        className={`flex-1 text-left p-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
      >
        <div className="font-medium truncate mb-1">{chat.title}</div>
        <div
          className={`text-xs ${isActive ? "text-blue-100" : "text-gray-400"}`}
        >
          {formatTime(chat.lastMessageAt)}
        </div>
      </button>
      <Button
        variant="ghost"
        size="small"
        onClick={handleDelete}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300"
      >
        ×
      </Button>
    </div>
  );
};

export default ChatItem;
