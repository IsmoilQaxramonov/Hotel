import { create } from "zustand";
import type { LoginResponse } from "../../types/auth.types";
import { loginUser } from "../../modules/auth/api/auth.api";

interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  isLoading: boolean;
  isRestoring: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isRestoring: false,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const { data } = await loginUser(username, password);

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

  restore: () => {
  set({ isRestoring: true });

  const token = localStorage.getItem("token");

  if (token) {
    set({ token });
  }

  setTimeout(() => {
    set({ isRestoring: false });
  }, 10);
},

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
