import React from "react";

const ChatSidebar = ({
  chats,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  user,
  onLogout,
  loading,
}) => {
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
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">AI Support</h2>
        <div className="user-info">
          <span>{user?.name}</span>
          <button
            onClick={onLogout}
            className="btn btn-link"
            style={{ color: "white", fontSize: "0.8rem" }}
          >
            Logout
          </button>
        </div>
      </div>

      <button onClick={onNewChat} className="new-chat-btn">
        + New Chat
      </button>

      <div className="chat-list">
        {loading ? (
          <div className="loading" style={{ color: "white", padding: "1rem" }}>
            Loading chats...
          </div>
        ) : chats.length === 0 ? (
          <div
            style={{ color: "#bdc3c7", padding: "1rem", textAlign: "center" }}
          >
            No chats yet. Start a new conversation!
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <button
                className={`chat-item ${
                  currentChat?.id === chat.id ? "active" : ""
                }`}
                onClick={() => onSelectChat(chat)}
                style={{ flex: 1, textAlign: "left" }}
              >
                <div className="chat-title">{chat.title}</div>
                <div className="chat-time">
                  {formatTime(chat.lastMessageAt)}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm("Are you sure you want to delete this chat?")
                  ) {
                    onDeleteChat(chat.id);
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e74c3c",
                  cursor: "pointer",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                  marginLeft: "0.5rem",
                  borderRadius: "4px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(231, 76, 60, 0.1)")
                }
                onMouseLeave={(e) => (e.target.style.background = "none")}
                title="Delete chat"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
