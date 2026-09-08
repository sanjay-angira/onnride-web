import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import searchReducer from './searchSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      auth: authReducer,
      chat: chatReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
