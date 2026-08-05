import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, refreshUser } from './authOperations';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
// сила async thunk: одна дія register, а slice сам реагує
// на всі три стадії — початок, успіх, помилку.
// Лоадер і помилки керуються автоматично
// authSlice.ts - зберігає результат у store + керує loading/error
// реакція на register i logIn, logOut

// isRefreshing — прапорець «зараз відновлюємо сесію». 
// Потрібен, щоб не показувати сторінки, 
// поки не з'ясуємо, залогінений юзер чи ні 
// (інакше блимне login перед dictionary).
