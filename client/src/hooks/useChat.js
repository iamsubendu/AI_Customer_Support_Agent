import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  loadChatHistory,
  loadChatMessages,
  sendMessage,
  deleteChat,
  setCurrentChat,
  clearMessages,
  setTyping,
  clearError,
  startNewChat as startNewChatAction,
} from "../store/slices/chatSlice";

export const useChat = () => {
  const dispatch = useDispatch();
  const {
    chats,
    currentChat,
    messages,
    loading,
    sending,
    typing,
    error,
    historyLoaded,
  } = useSelector((state) => state.chat);

  const loadHistory = useCallback(async () => {
    if (!historyLoaded && !loading) {
      const result = await dispatch(loadChatHistory());
      return result;
    }
    return { type: "chat/loadHistory/skipped" };
  }, [dispatch, historyLoaded, loading]);

  const loadMessages = useCallback(
    async (chatId) => {
      const result = await dispatch(loadChatMessages(chatId));
      return result;
    },
    [dispatch]
  );

  const sendChatMessage = useCallback(
    async (message, chatId) => {
      // Don't add user message immediately - let server response handle all messages
      const result = await dispatch(sendMessage({ message, chatId }));
      return result;
    },
    [dispatch]
  );

  const deleteChatById = useCallback(
    async (chatId) => {
      const result = await dispatch(deleteChat(chatId));
      return result;
    },
    [dispatch]
  );

  const selectChat = useCallback(
    (chat) => {
      dispatch(setCurrentChat(chat));
    },
    [dispatch]
  );

  const startNewChat = useCallback(async () => {
    dispatch(startNewChatAction());
    // Refresh chat history after starting new chat
    await dispatch(loadChatHistory());
  }, [dispatch]);

  const setTypingStatus = useCallback(
    (status) => {
      dispatch(setTyping(status));
    },
    [dispatch]
  );

  const clearChatError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    chats,
    currentChat,
    messages,
    loading,
    sending,
    typing,
    error,
    loadHistory,
    loadMessages,
    sendMessage: sendChatMessage,
    sendChatMessage,
    deleteChat: deleteChatById,
    selectChat,
    startNewChat,
    setTyping: setTypingStatus,
    clearError: clearChatError,
  };
};
