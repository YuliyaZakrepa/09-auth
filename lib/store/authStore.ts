import { User } from "@/types/user";
import { create } from "zustand";
type AuthStore = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearIsAuthenticated: () => void;
};
export const useAuthStore = create<AuthStore>()((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true, isLoading: false }));
  },
  updateUser: (data: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false, isLoading: false }));
  },
}));
