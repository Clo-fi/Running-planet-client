import { create } from 'zustand';
import { UserType } from '../types/user/user';

interface UserStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));