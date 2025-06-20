import {useSocketStore} from "@/stores/socketStore";
import {useEffect, useState} from "react";
import supabase from "@/supabaseClient";
import RoomButton from "@/components/ui/main/RoomButton";


const RoomList = () => {
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
  return (
    <div className='flex flex-wrap m-6'>
      {rooms?.map((roomId) => {
        return (
          <RoomButton roomId={roomId} deleteRoom={deleteRoom} key={roomId} />
        )
      })}
    </div>
  )
}

export default RoomList