import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginRequest } from './auth.api';

// import { RootState, AppThunk } from '../../app/store';

export interface CatUser {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  currentUser: CatUser | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  currentUser: null,
  status: 'idle'
};

export const loginAsync = createAsyncThunk(
  'auth/loginRequest',
  async (credentials: { username: string; password: string }) => {
    const response = await loginRequest(
      credentials.username,
      credentials.password
    );
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentUser = action.payload;
      });
  }
});

export default authSlice.reducer;
