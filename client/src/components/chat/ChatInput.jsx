import React, { useState, useRef, useEffect } from "react";
import Button from "../custom/Button";

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
    <form className="input-container" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Press Enter)"
        disabled={disabled}
        rows={1}
        className="message-input"
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        loading={disabled}
        className="send-btn"
      >
        {disabled ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};

export default ChatInput;
