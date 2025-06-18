'use client'
import { useEffect } from 'react';
import { useParams } from "next/navigation";
import { usePlaylistStore } from "@/stores/playlistStore";
import { MusicType } from "@/type";
import { useSocketStore } from "@/stores/socketStore";
import { router } from "next/client";
import { useUserStore } from '@/stores/userStore';
import {Playlist} from "@/components/ui/room/playlist";
import Search from "@/components/ui/room/search";

interface MusicData {
  name: string;
  id: string;
}

export interface RoomState {
  currentMusic: MusicData;
  startedAt: number;
  endCount: number;
}

export default function Home() {
  const socket = useSocketStore(state => state.socket);
  const { connect, disconnect } = useSocketStore(state => state.actions);
  const params = useParams();
  const roomId = params.roomId as string;
  const playlist = usePlaylistStore(state => state.playlist);
  const { setPlaylist, clearPlaylist } = usePlaylistStore(state => state.actions);
  const { setRoomId, clearRoomId } = useUserStore();
  useEffect(() => {
    if (socket === null) connect();
  }, [socket, connect]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (socket) {
      const Handle = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        clearPlaylist();
        socket.emit('leave_room', roomId);
      };
      socket?.on('playlist', (resPlaylist: MusicData[]) => {
        setPlaylist(resPlaylist);
      });
      socket.emit('join_room', roomId);
      socket.emit('get_music', roomId);
      setRoomId(roomId);
      socket.on('playlist', (resPlaylist: MusicType[]) => {
        if(playlist!=resPlaylist)
          setPlaylist(resPlaylist);
      });
      

      socket.on("room_deleted", () => {
        clearRoomId();
        alert("이 방은 삭제되었습니다.");
        router.push("/"); // 메인 페이지 등으로 이동
      });

      window.removeEventListener('beforeunload', disconnect);
      window.addEventListener('beforeunload', Handle);

      return () => {
        window.removeEventListener('beforeunload', Handle);
        clearPlaylist();
        socket.emit('leave_room', roomId);
        socket.off('leave_room');
        socket.off("room_deleted");
        socket.off('init_playlist');
        socket.off('video_added');
      };
    }
  }, [socket]);


  // handleVideoEnd는 socket에 접근하므로 useCallback을 사용하여 최적화
  // 가상 음악 데이터 설정 (현재는 예시로 넣은 것)
  return (
    <main className="flex h-full w-full">
      {/* 오른쪽 메인 영역 */}
      <div className="flex-1 w-full h-full p-4 space-y-4 ">
        {/* <NowPlaying
          title={currentMusic?.name || '재생 중인 곡 없음'}
          thumbnail={`https://i.ytimg.com/vi/${currentMusic?.id}/mqdefault.jpg`}
          elapsed={elapsed}
          duration={duration}
        /> */}
        <div className="flex-1 flex flex-row h-full">
          <Playlist />
          <Search />
        </div>
      </div>
      {/* 왼쪽 툴바 */}
    </main>
  );
}
