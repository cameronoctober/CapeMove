import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as authService from '../api/services/authService';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'moderator' | 'admin';
}

interface AuthState {
  accessToken?: string | null;
  user?: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const doRefresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const res = await authService.refresh();
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    tokenRefreshed(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    clearCredentials(state) {
      state.accessToken = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.status = 'loading';
        s.error = null;
      })
      .addCase(login.fulfilled, (s, action) => {
        s.status = 'succeeded';
        s.accessToken = action.payload.accessToken;
        s.user = action.payload.user;
      })
      .addCase(login.rejected, (s, action) => {
        s.status = 'failed';
        s.error = (action.payload as any) || 'Login failed';
      })
      .addCase(doRefresh.fulfilled, (s, action) => {
        s.accessToken = action.payload.accessToken;
      })
      .addCase(logout.fulfilled, (s) => {
        s.accessToken = null;
        s.user = null;
      });
  }
});

export const { setCredentials, tokenRefreshed, clearCredentials } = slice.actions;
export default slice.reducer;
