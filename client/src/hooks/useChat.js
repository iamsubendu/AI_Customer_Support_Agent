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
  addUserMessage,
  clearError,
} from "../store/slices/chatSlice";

export const useChat = () => {
  const dispatch = useDispatch();
  const { chats, currentChat, messages, loading, sending, typing, error } =
    useSelector((state) => state.chat);

  const loadHistory = useCallback(async () => {
    const result = await dispatch(loadChatHistory());
    return result;
  }, [dispatch]);

  const loadMessages = useCallback(
    async (chatId) => {
      const result = await dispatch(loadChatMessages(chatId));
      return result;
    },
    [dispatch]
  );

  const sendChatMessage = useCallback(
    async (message, chatId) => {
      dispatch(addUserMessage(message));
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

  const startNewChat = useCallback(() => {
    dispatch(setCurrentChat(null));
    dispatch(clearMessages());
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
    deleteChat: deleteChatById,
    selectChat,
    startNewChat,
    setTyping: setTypingStatus,
    clearError: clearChatError,
  };
};
