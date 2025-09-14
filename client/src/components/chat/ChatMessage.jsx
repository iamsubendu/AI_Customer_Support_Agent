import React from "react";

const ChatMessage = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const messageClasses = isUser
    ? "bg-blue-600 text-white ml-auto"
    : "bg-white text-gray-800 border border-gray-200";

  return (
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${messageClasses}`}
    >
      <div className="text-sm">{message.content}</div>
      <div
        className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}
      >
        {formatTime(message.timestamp || new Date())}
      </div>
    </div>
  );
};

export default ChatMessage;
