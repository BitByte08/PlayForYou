'use client';

import { useEffect, useState } from 'react';
import { useSocketStore } from "@/stores/socketStore";
import supabase from "@/supabaseClient";
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [sidebarMode, setSidebarMode] = useState("default");


    const socket = useSocketStore(state => state.socket);
    const { connect, disconnect } = useSocketStore(state => state.actions);
    const [rooms, setRooms] = useState<string[]>([]);
    const [session, setSession] = useState(null);

    // 서버 연결
    useEffect(() => {
        if (!socket) connect();
    }, []);

    // 소켓 이벤트 처리
    useEffect(() => {
        socket?.on('room_list', (updatedRooms: string[]) => {
            setRooms(updatedRooms);
        });
        socket?.emit('get_rooms');

        window.removeEventListener('beforeunload', disconnect);
        return () => {
            window.removeEventListener('beforeunload', disconnect);
            socket?.off('room_list');
        };
    }, [socket]);

    useEffect(() => {
        if(sidebarMode === "create") {
            setIsSidebarOpen(true);
        }
    },[sidebarMode]);
    // 방 생성
    const createRoom = () => {
        setSidebarMode("create");
        //socket?.emit('create_room');
    };

    // 방 삭제
    const deleteRoom = (roomId: string) => {
        socket?.emit("delete_room", roomId);
    };

    // 로그인 상태 확인
    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            console.log(data);
        };

        fetchSession();
    }, []);

    // 로그아웃
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
        <div className='flex flex-wrap m-6'>
            {rooms?.map((roomId) => {
                return (
                    <RoomButton roomId={roomId} deleteRoom={deleteRoom} key={roomId} />
                )
            })}
        </div>
    );
}

interface RoomButtonProps {
    roomId: string;
    deleteRoom: (roomId: string) => void;
}

const RoomButton = (props:RoomButtonProps) => {
    const router = useRouter();
    const { roomId, deleteRoom } = props;
    return (
        <div className='w-1/2 h-20 px-1 pt-1 pb-1' >
            <section className='w-full h-full border-1 border-default flex rounded-lg p-2' >
                <button className='w-full'
                        onClick={() => router.push(`/room/${roomId}`)}>{roomId}</button>
                <div className='ml-auto border-l-1 border-gray-300 dark:border-gray-700 pl-2 min-w-17 flex flex-col justify-between'>
                    <button className='w-full border-1 border-default rounded' onClick={() => deleteRoom(roomId)}>
                        방 삭제
                    </button>
                    <button className='w-full border-1 border-default rounded' onClick={() => deleteRoom(roomId)}>
                        방 삭제
                    </button>
                </div>
            </section>
        </div>
    )
}
