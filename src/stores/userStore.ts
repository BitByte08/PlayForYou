// stores/userStore.ts
import { create } from 'zustand';

interface UserState {
    roomId: string | null;
    setRoomId: (roomId: string) => void;
    clearRoomId: () => void;
}
