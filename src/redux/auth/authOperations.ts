import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signUp, type SignUpData } from "../../services/authService";
import { setAuthHeader } from "../../services/api";

export const register = createAsyncThunk(
    "auth/register",
    async (credentials: SignUpData, thunkAPI) => {
        try {
            const data = await signUp(credentials);
            setAuthHeader(data.token);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration failed"
            );
            }
            return thunkAPI.rejectWithValue("Registration failed");
        }
    }
);

//authOperations.ts - thunk register — з'єднує запит + Redux
// thunk автоматично створює три дії:

// auth/register/pending — запит пішов (тут вмикаємо лоадер);
// auth/register/fulfilled — успіх (тут пишемо дані в стан);
// auth/register/rejected — помилка (тут показуємо повідомлення).

// register і є thunk. «thunk» — це просто назва такого типу функції 
// в Redux (асинхронна дія, створена через createAsyncThunk)