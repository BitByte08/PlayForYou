'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import io from "socket.io-client";

const socket = io('http://localhost:4000');
export default function HomePage() {
    const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() => {

        socket.on('room_list', (updatedRooms: string[]) => {
            setRooms(updatedRooms);
        });
        socket.emit('get_rooms'); // 최초 접속 시 목록 요청

        return () => {
            socket.off('room_list');
        };
    }, []);

    const createRoom = () => {
        socket.emit('create_room'); // 서버에 방 생성 요청
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
                    </li>
                ))}
            </ul>
        </main>
    );
}