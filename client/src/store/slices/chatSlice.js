import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../../services/api";

const initialState = {
  chats: [],
  currentChat: null,
  messages: [],
  loading: false,
  sending: false,
  typing: false,
  error: null,
};

export const loadChatHistory = createAsyncThunk(
  "chat/loadHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatAPI.getHistory();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load chat history"
      );
    }
  }
);

export const loadChatMessages = createAsyncThunk(
  "chat/loadMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await chatAPI.getChat(chatId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load chat messages"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, chatId }, { rejectWithValue, getState }) => {
    try {
      const response = await chatAPI.sendMessage(message, chatId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (chatId, { rejectWithValue }) => {
    try {
      await chatAPI.deleteChat(chatId);
      return chatId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete chat"
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setTyping: (state, action) => {
      state.typing = action.payload;
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",
        content: action.payload,
        timestamp: new Date(),
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload.chats;
      })
      .addCase(loadChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.chat.messages;
      })
      .addCase(loadChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.typing = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.typing = false;
        state.messages = action.payload.messages;

        if (!state.currentChat) {
          const newChat = {
            id: action.payload.chatId,
            title:
              action.payload.messages[0].content.substring(0, 50) +
              (action.payload.messages[0].content.length > 50 ? "..." : ""),
            lastMessageAt: new Date(),
          };
          state.currentChat = newChat;
          state.chats.unshift(newChat);
        } else {
          state.chats = state.chats.map((chat) =>
            chat.id === state.currentChat.id
              ? { ...chat, lastMessageAt: new Date() }
              : chat
          );
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.typing = false;
        state.error = action.payload;
        state.messages.pop();
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.chats = state.chats.filter((chat) => chat.id !== action.payload);
        if (state.currentChat && state.currentChat.id === action.payload) {
          state.currentChat = null;
          state.messages = [];
        }
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentChat,
  clearMessages,
  setTyping,
  addUserMessage,
  clearError,
} = chatSlice.actions;
export default chatSlice.reducer;
