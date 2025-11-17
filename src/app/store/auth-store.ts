import { create } from "zustand";
import type { LoginResponse } from "../../types/auth.types";
import { loginUser } from "../../modules/auth/api/auth.api";

interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  // 🔐 LOGIN
  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const {data} = await loginUser(username, password);

      // faqat token localStoragega
      localStorage.setItem("token", data.access_token);

      set({
        user: data,
        token: data?.access_token,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  // 🔁 AUTO RESTORE
  restore: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
      // role_id, token_type, refresh_token maxfiy → localStoragega BEPISAND SAQLANMAYDI
      // agar userni olish api bo‘lsa shu yerda chaqilsa bo‘ladi.
    }
  },

  // 🚪 LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
