import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  content: string;
  senderRole: 'CUSTOMER' | 'VENDOR' | 'PLATFORM';
  senderId?: string;
  createdAt: string;
  attachmentUrl?: string | null;
}

export interface ChatState {
  activeBookingId: string | null;
  messages: ChatMessage[];
  unreadCount: number;
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'disconnected';
}

const initialState: ChatState = {
  activeBookingId: null,
  messages: [],
  unreadCount: 0,
  connectionStatus: 'idle',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveBooking(state, action: PayloadAction<string | null>) {
      state.activeBookingId = action.payload;
      state.messages = [];
      state.unreadCount = 0;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
    setConnectionStatus(
      state,
      action: PayloadAction<ChatState['connectionStatus']>,
    ) {
      state.connectionStatus = action.payload;
    },
    resetChat() {
      return initialState;
    },
  },
});

export const {
  setActiveBooking,
  setMessages,
  addMessage,
  setUnreadCount,
  setConnectionStatus,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
