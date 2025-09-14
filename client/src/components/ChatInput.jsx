import React, { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  return (
    <div className="input-container">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "0.75rem", width: "100%" }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="message-input"
          placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          rows="1"
          style={{
            resize: "none",
            overflow: "hidden",
            minHeight: "44px",
            maxHeight: "120px",
          }}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !message.trim()}
        >
          {disabled ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
