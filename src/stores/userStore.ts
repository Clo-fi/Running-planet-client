import { create } from 'zustand';
import { UserType, userLocation } from '../types/user/user';

interface UserStore {
  user: UserType | null;
  location: userLocation | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
  setLocation: ({ lat, lot }: userLocation) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  location: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLocation: ((location) => set({ location }))
}));