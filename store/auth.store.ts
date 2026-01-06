import { create } from "zustand";

interface User {
  id: string;
  fullName: string;
  role: string;
}
interface AuthState {
  access_token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  access_token: null,
  user: null,

  setAuth: (token, user) =>
    set({
      access_token: token,
      user,
    }),

  clearAuth: () =>
    set({
      access_token: null,
      user: null,
    }),
}));
