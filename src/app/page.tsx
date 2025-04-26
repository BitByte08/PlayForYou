'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSocketStore } from "@/stores/socketStore";
import AuthModal from '@/components/AuthModal';
import supabase from "@/supabaseClient"; // AuthModal을 임포트

export default function HomePage() {
    const socket = useSocketStore(state => state.socket);
    const { connect, disconnect } = useSocketStore(state => state.actions);
    const [rooms, setRooms] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
    const [session, setSession] = useState(null);

    // 서버 연결
    useEffect(() => {
        if (!socket) connect();
    }, []);

    // 소켓 이벤트 처리
    useEffect(() => {
        if (socket) {
            socket.on('room_list', (updatedRooms: string[]) => {
                setRooms(updatedRooms);
            });
            socket.emit('get_rooms'); // 최초 접속 시 목록 요청

            window.removeEventListener('beforeunload', disconnect);
            return () => {
                window.removeEventListener('beforeunload', disconnect);
                socket.off('room_list');
            };
        }
    }, [socket]);

    // 방 생성
    const createRoom = () => {
        if (socket) {
            socket.emit('create_room'); // 서버에 방 생성 요청
        }
    };

    // 방 삭제
    const deleteRoom = (roomId: string) => {
        if (socket) {
            socket.emit("delete_room", roomId);
        }
    };

    // 로그인 상태 확인
    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        fetchSession();
    }, []);

    // 로그아웃
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
      <main className="p-4">
          <h1 className="text-xl font-bold mb-4">방 리스트</h1>

          {/* 로그인/회원가입 버튼 */}
          {session ? (
            <div className="flex flex-col items-center">
                <p>로그인된 사용자: {session.user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                    로그아웃
                </button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)} // 모달 열기
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                로그인 / 회원가입
            </button>
          )}

          {/* 방 만들기 버튼 */}
          <button onClick={createRoom} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
              방 만들기
          </button>

          {/* 방 목록 */}
          <ul>
              {rooms.map((id) => (
                <li key={id} className="flex items-center mb-2">
                    <Link href={`/room/${id}`} className="text-blue-600 underline mr-4">
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

          {/* 모달 컴포넌트 */}
          <AuthModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      </main>
    );
}
