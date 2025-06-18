'use client';

import { useEffect, useState } from 'react';
import { useSocketStore } from "@/stores/socketStore";
import supabase from "@/supabaseClient";
import RoomButton from "@/components/ui/main/RoomButton";

export default function HomePage() {
    const socket = useSocketStore(state => state.socket);
    const { connect, disconnect } = useSocketStore(state => state.actions);
    const [rooms, setRooms] = useState<string[]>([]);
    //const [session, setSession] = useState(null);

    // 서버 연결
    useEffect(() => {
        if (!socket) connect();
    }, [socket, connect]);

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
    }, [socket, disconnect]);
    // 방 생성

    // 방 삭제
    const deleteRoom = (roomId: string) => {
        socket?.emit("delete_room", roomId);
    };

    // 로그인 상태 확인
    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            //setSession(data.session);
            console.log(data);
        };

        fetchSession();
    }, []);

    // 로그아웃
    // const handleLogout = async () => {
    //     await supabase.auth.signOut();
    //     setSession(null);
    // };

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
