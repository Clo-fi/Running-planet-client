import { create } from 'zustand';


// 유저 기본 정보 타입 정의
interface UserBaseInfo {

  nickname: string;
  userWeight: number;
  gender: 'male' | 'female';
  crewId?: string;

}

// Zustand를 이용한 상태 관리
interface UserStore {

  user: UserBaseInfo | null;
  setUser: (user: UserBaseInfo) => void;
  clearUser: () => void;

}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));