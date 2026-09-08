import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

const AUTH_STORAGE_KEY = 'onnride_auth';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isHydrated: boolean;
}

function loadAuthFromStorage(): Pick<AuthState, 'accessToken' | 'refreshToken' | 'user'> {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null, user: null };
  }
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { accessToken: null, refreshToken: null, user: null };
    return JSON.parse(raw) as Pick<AuthState, 'accessToken' | 'refreshToken' | 'user'>;
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth(state) {
      const stored = loadAuthFromStorage();
      state.accessToken = stored.accessToken;
      state.refreshToken = stored.refreshToken;
      state.user = stored.user;
      state.isHydrated = true;
    },
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            user: action.payload.user,
          }),
        );
      }
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      if (typeof window !== 'undefined' && state.accessToken && state.refreshToken) {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            user: action.payload,
          }),
        );
      }
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    },
  },
});

export const { hydrateAuth, setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
