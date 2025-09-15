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
  historyLoaded: false,
  isNewChat: false, // Track if we're in a new chat session
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
      // If selecting an existing chat, we're no longer in a new chat
      if (action.payload) {
        state.isNewChat = false;
      }
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
        timestamp: new Date().toISOString(),
      });
    },
    clearError: (state) => {
      state.error = null;
    },
    startNewChat: (state) => {
      state.currentChat = null;
      state.messages = [];
      state.isNewChat = true; // Mark that we're starting a new chat
    },
    resetChatState: (state) => {
      state.chats = [];
      state.currentChat = null;
      state.messages = [];
      state.loading = false;
      state.sending = false;
      state.typing = false;
      state.error = null;
      state.historyLoaded = false;
      state.isNewChat = false;
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
        state.historyLoaded = true;
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

        // Replace messages with server response (which includes all messages)
        state.messages = action.payload.messages;

        // Handle chat creation and updates
        const chatId = action.payload.chatId;

        if (!state.currentChat || state.currentChat.id !== chatId) {
          // Either no current chat or different chat ID - find or create chat
          let chat = state.chats.find((c) => c.id === chatId);

          if (!chat) {
            // Create new chat entry
            chat = {
              id: chatId,
              title:
                action.payload.messages[0].content.substring(0, 50) +
                (action.payload.messages[0].content.length > 50 ? "..." : ""),
              lastMessageAt: new Date().toISOString(),
            };
            state.chats.unshift(chat);
          }

          state.currentChat = chat;
        }

        // Update the current chat's last message time and title
        state.chats = state.chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                lastMessageAt: new Date().toISOString(),
                // Update title if this is the first message (only 2 messages total)
                title:
                  action.payload.messages.length === 2
                    ? action.payload.messages[0].content.substring(0, 50) +
                      (action.payload.messages[0].content.length > 50
                        ? "..."
                        : "")
                    : chat.title,
              }
            : chat
        );

        // Reset new chat flag after first message
        if (state.isNewChat) {
          state.isNewChat = false;
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
  startNewChat,
  resetChatState,
} = chatSlice.actions;
export default chatSlice.reducer;
