import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "./storage";
import authReducer from "./auth/authSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // створює «persistor», який керує збереженням/відновленням

export type RootState = ReturnType<typeof store.getState>; // тип усього стану застосунку
export type AppDispatch = typeof store.dispatch; //тип функції dispatch мого store
// Це типи для TypeScript, які роблять роботу з Redux безпечною й зручною.
// reducer: { auth: persistedAuthReducer} - reducer'и, які станом керують
// store.getState() — функція Redux, що повертає весь поточний стан