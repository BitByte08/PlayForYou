'use client';
import {useSocketStore} from "@/stores/socketStore";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Room = () => {
  const socket = useSocketStore(state => state.socket);
  const router = useRouter();
  const { connect, disconnect } = useSocketStore(state => state.actions);
  const sendSocket = () => socket?.emit('create_room');
  useEffect(() => {
    if (!socket) connect();
  }, [socket, connect]);
  useEffect(() => {
    socket?.on('add_room', (room: string) => {
      router.push(`room/${room}`);
    });
    window.removeEventListener('beforeunload', disconnect);
    return () => {
      window.removeEventListener('beforeunload', disconnect);
      socket?.off('add_room');
    };
  }, [socket, disconnect]);
  return (
    <div className="flex flex-wrap m-6">
      <input type="text" placeholder="방 이름" className='w-full h-10 border-1 border-default rounded mb-2' />
      <button className='w-full h-10 border-1 border-default rounded mb-2'
              onClick={()=>sendSocket()}
      >
        생성
      </button>
    </div>
  )
}

export default Room