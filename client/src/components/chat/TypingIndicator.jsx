import React from "react";

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
      <span className="typing-text">AI is typing...</span>
    </div>
  );
};

export default TypingIndicator;
