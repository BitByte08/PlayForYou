// stores/userStore.ts
import { create } from 'zustand';

interface UserState {
  roomId: string | null;
  setRoomId: (id: string) => void;
  clearRoomId: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  roomId: null,
  setRoomId: (id) => set({ roomId: id }),
  clearRoomId: () => set({ roomId: null }),
}));