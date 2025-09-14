import React from "react";
import Button from "../custom/Button";
import ChatItem from "./ChatItem";
import LoadingSpinner from "../custom/LoadingSpinner";

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
  return (
    <div className="w-80 bg-gray-800 text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Support</h2>
          <Button
            variant="ghost"
            size="small"
            onClick={onLogout}
            className="text-gray-300 hover:text-white"
          >
            Logout
          </Button>
        </div>
        <div className="text-sm text-gray-400 mt-1">Welcome, {user?.name}</div>
      </div>

      <Button onClick={onNewChat} className="m-4 bg-blue-600 hover:bg-blue-700">
        + New Chat
      </Button>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner color="white" />
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <div className="text-2xl mb-2">💬</div>
            <div>No chats yet.</div>
            <div className="text-sm">Start a new conversation!</div>
          </div>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
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
