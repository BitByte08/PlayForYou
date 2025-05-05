import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketStore {
    socket: Socket | null;
    actions: {
        connect: () => void;
        disconnect: () => void;
    }
}

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    actions: {
        connect: () => {
            const socket = io(`${process.env.NEXT_PUBLIC_SOCKET}`,{
                path: "/socket.io",
                transports: ["websocket"]
            });
            set({socket});
            console.log(`${process.env.NEXT_PUBLIC_SOCKET}`);
            // 기본 이벤트 등록도 여기서 할 수 있어
            socket.on('connect', () => {
                console.log('✅ 소켓 연결됨:', socket.id);
            });

            socket.on('disconnect', () => {
                console.log('❌ 소켓 연결 종료');
            });
        },
        disconnect: () => {
            const socket = useSocketStore.getState().socket;
            if (socket) {
                socket.disconnect();
                set({socket: null});
            }
        }
    }
}));