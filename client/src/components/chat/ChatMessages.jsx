import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({ messages, typing }) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll to bottom when new messages arrive or typing starts/stops
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Check if user has scrolled up and show scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (messages.length === 0) {
    return (
      <div className="messages-container" ref={messagesContainerRef}>
        <div className="welcome-message">
          <div className="welcome-icon">🤖</div>
          <div className="welcome-title">Welcome to AI Customer Support!</div>
          <div className="welcome-subtitle">
            Start a conversation by typing your message below.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      {messages.map((message, index) => (
        <div
          key={message.id || `message-${index}-${message.role}`}
          className={`message-wrapper ${
            message.role === "user" ? "user" : "assistant"
          }`}
        >
          <ChatMessage message={message} isUser={message.role === "user"} />
        </div>
      ))}

      {typing && (
        <div className="message-wrapper assistant">
          <div className="message assistant">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          className="scroll-to-bottom-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14L12 19L17 14M7 5L12 10L17 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatMessages;
