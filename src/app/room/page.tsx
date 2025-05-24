'use client';
import {useSocketStore} from "@/stores/socketStore";

const Room = () => {
  const socket = useSocketStore(state => state.socket);
  const sendSocket = () => socket?.emit('create_room');
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