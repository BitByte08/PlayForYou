'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSocketStore} from "@/stores/socketStore";
export default function HomePage() {
    const socket = useSocketStore(state => state.socket);
    const {connect, disconnect} = useSocketStore(state => state.actions);
    const [rooms, setRooms] = useState<string[]>([]);
    useEffect(() => {
        if(!socket) connect();
    }, []);
    useEffect(() => {
        if(socket){
            socket.on('room_list', (updatedRooms: string[]) => {
                setRooms(updatedRooms);
            });
            socket.emit('get_rooms'); // 최초 접속 시 목록 요청
            window.addEventListener('beforeunload', () => disconnect());
            return () => {
                socket.off('room_list');
            };
        }
    }, [socket]);

    const createRoom = () => {
        if(socket) {
            socket.emit('create_room'); // 서버에 방 생성 요청
        }
    };
    const deleteRoom = (roomId: string) => {
        if(socket) {
            socket.emit("delete_room", roomId);
        }
    };
    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">방 리스트</h1>
            <button onClick={createRoom} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                방 만들기
            </button>
            <ul>
                {rooms.map((id) => (
                    <li key={id}>
                        <Link href={`/room/${id}`} className="text-blue-600 underline">
                            {id} 입장
                        </Link>
                        <button
                            onClick={() => deleteRoom(id)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            방 삭제
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}