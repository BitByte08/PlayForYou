'use client';

import { useEffect, useState } from 'react';
import { useSocketStore } from "@/stores/socketStore";
import supabase from "@/supabaseClient";
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        <main className="w-full h-full flex text-gray-700 dark:text-gray-200 gap-4">
            <section className={`w-full h-full border-default rounded-4xl border-1 transition-w duration-300 `} id="room-list">
                <div className='flex flex-wrap m-6'>
                    {rooms?.map((roomId) => {
                        return (
                            <RoomButton roomId={roomId} deleteRoom={deleteRoom} key={roomId} />
                        )
                    })}
                </div>
            </section>
            <section className={`${isSidebarOpen?"w-3/7":" w-32"}  h-full border-default rounded-2xl border-1 transition-all duration-300 flex flex-col p-6`} id="sidebar">
                {sidebarMode === "default" && <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen?"닫기":"열기"}</button>}
                {sidebarMode === "create" && <CreateRoomSidebar />}
            </section>
        </main>
    );
}

interface RoomButtonProps {
    roomId: string;
    deleteRoom: (roomId: string) => void;
}
const RoomButton = (props:RoomButtonProps) => {
    const router = useRouter();
    const { roomId } = props;
    const { deleteRoom } = props;
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

const CreateRoomSidebar = () => {
    return (
        <>
            <span className='text-2xl text-center'>방 생성하기</span>
            <input type="text" placeholder="방 이름" className='w-full h-10 border-1 border-default rounded' />
        </>
    )
}