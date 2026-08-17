import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  signUp,
  logIn as logInRequest, //logIn as logInRequest — конфлікт імен;
  type LogInData,
  type SignUpData,
} from '../../services/authService';
import { clearAuthHeader, setAuthHeader } from '../../services/api';
import type { RootState } from '../store';
import { getCurrentUser } from '../../services/authService';
import { logOut as logOutRequest } from '../../services/authService';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: SignUpData, thunkAPI) => {
    try {
      const data = await signUp(credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Registration failed'
        );
      }
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials: LogInData, thunkAPI) => {
    try {
      const data = await logInRequest(credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Login failed'
        );
      }
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      setAuthHeader(token);
      const data = await getCurrentUser();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Failed to refresh'
        );
      }
      return thunkAPI.rejectWithValue('Failed to refresh');
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await logOutRequest();
      clearAuthHeader();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Logout failed"
        );
      }
      return thunkAPI.rejectWithValue("Logout failed")
  }
});
//authOperations.ts - thunk register — з'єднує запит + Redux
// thunk автоматично створює три дії:

// auth/register/pending — запит пішов (тут вмикаємо лоадер);
// auth/register/fulfilled — успіх (тут пишемо дані в стан);
// auth/register/rejected — помилка (тут показуємо повідомлення).

// register і є thunk. «thunk» — це просто назва такого типу функції
// в Redux (асинхронна дія, створена через createAsyncThunk)
// createAsyncThunk — створює async-дію (бо reducers синхронні, а тут запит);
//"auth/logIn" — назва дії. З неї Redux генерує три:
// - auth/logIn/pending, /fulfilled, /rejected (їх ловить slice);

//credentials — те, що передаси при dispatch(logIn({...})). Тип LogInData = { email, password };
// thunkAPI — набір інструментів Redux (нам потрібен rejectWithValue)
