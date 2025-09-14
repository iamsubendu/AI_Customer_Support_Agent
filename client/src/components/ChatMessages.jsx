import React from "react";

const ChatMessages = ({ messages, typing, messagesEndRef }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "2rem",
            fontSize: "1.1rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            🤖 Welcome to AI Customer Support!
          </div>
          <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            Start a conversation by typing your message below.
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {formatTime(message.timestamp || new Date())}
            </div>
          </div>
        ))
      )}

      {typing && (
        <div className="message assistant">
          <div className="typing-indicator">
            <span>AI is typing</span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
