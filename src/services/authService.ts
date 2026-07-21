import { api } from "./api";

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    email: string;
    name: string;
    token: string;
}

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/users/signup", data);
    return response.data;
};
// authService.ts — це функції запитів до бекенду.
// signUp просто відправляє дані й повертає відповідь. 
// Нічого не зберігає.
// Зберігання — це робота Redux (authSlice)
// authService.ts — «поговорити з бекендом» (відправити/отримати);
// authSlice.ts — «зберегти результат» (у store).