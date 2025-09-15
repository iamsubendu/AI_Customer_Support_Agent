import React from "react";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: chatLoading } = useSelector((state) => state.chat);

  // Show loader only for auth and chat history loading (not message sending)
  const isLoading = authLoading || chatLoading;

  if (!isLoading) return null;

  return (
    <div className="global-loader">
      <div className="global-loader-spinner">
        <div className="spinner"></div>
      </div>
      <div className="global-loader-text">
        {authLoading ? "Authenticating..." : "Loading chats..."}
      </div>
    </div>
  );
};

export default GlobalLoader;
