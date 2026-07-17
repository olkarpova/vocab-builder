import { configureStore } from "@reduxjs/toolkit";
import authRedcer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authRedcer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;