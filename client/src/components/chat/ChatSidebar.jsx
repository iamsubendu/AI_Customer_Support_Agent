import React from "react";
import Button from "../custom/Button";
import ChatItem from "./ChatItem";

const ChatSidebar = ({
  chats,
  currentChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  user,
  onLogout,
  sidebarOpen = false,
  onCloseSidebar,
}) => {
  return (
    <div
      id="sidebar"
      className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
    >
      <div className="sidebar-header">
        <h2 className="sidebar-title">AI Support</h2>
        <div className="header-buttons">
          <Button
            variant="link"
            size="small"
            onClick={onLogout}
            className="logout-btn"
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="user-info">Welcome, {user?.name}</div>

      <Button onClick={onNewChat} className="new-chat-btn">
        + New Chat
      </Button>

      <div className="chat-list">
        {!chats || chats.length === 0 ? (
          <div className="empty-chats">
            <div className="empty-icon">💬</div>
            <div>No chats yet.</div>
            <div className="empty-subtitle">Start a new conversation!</div>
          </div>
        ) : (
          <div>
            {chats.map((chat, index) => (
              <ChatItem
                key={chat.id || `chat-${index}`}
                chat={chat}
                isActive={currentChat?.id === chat.id}
                onSelect={onSelectChat}
                onDelete={onDeleteChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
