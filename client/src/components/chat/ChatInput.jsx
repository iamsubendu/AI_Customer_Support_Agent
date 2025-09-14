import React, { useState, useRef, useEffect } from "react";
import Button from "../custom/Button";
import Textarea from "../custom/Textarea";

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
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-white border-t">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
        disabled={disabled}
        rows={1}
        className="flex-1 min-h-[44px] max-h-[120px]"
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        loading={disabled}
        className="self-end"
      >
        {disabled ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};

export default ChatInput;
