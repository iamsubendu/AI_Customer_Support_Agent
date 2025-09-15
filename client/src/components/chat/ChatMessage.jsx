import React from "react";

const ChatMessage = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    // Handle ISO string timestamps from Redux state
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`message ${isUser ? "user" : "assistant"}`}>
      <div style={{ flex: 1 }}>
        <div className="message-content">{message.content}</div>
        <div className="message-time">
          {formatTime(message.timestamp || new Date())}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
