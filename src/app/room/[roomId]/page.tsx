'use client'
import { useEffect } from 'react';
import { useParams } from "next/navigation";
import { usePlaylistStore } from "@/stores/playlistStore";
import { MusicType } from "@/type";
import { useSocketStore } from "@/stores/socketStore";
import { router } from "next/client";
import { useUserStore } from '@/stores/userStore';
import {Playlist} from "@/app/room/[roomId]/_features/ui/Playlist";
import Search from "@/app/room/[roomId]/_features/ui/Search";
import Player from "@/app/room/[roomId]/_features/ui/Player";
import {GlassContainer, GlassHighlightContainer} from "@/components/ui/Containers";


export interface RoomState {
  currentMusic: MusicType;
  startedAt: number;
  endCount: number;
}

export default function Home() {
  const socket = useSocketStore(state => state.socket);
  const { connect, disconnect } = useSocketStore(state => state.actions);
  const params = useParams();
  const roomId = params.roomId as string;
  const { setPlaylist, clearPlaylist } = usePlaylistStore(state => state.actions);
  const { setRoomId, clearRoomId } = useUserStore();
  useEffect(() => {
    if (!socket) connect();
  }, [socket, connect]);
  useEffect(() => {
    if (socket) {
      const Handle = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        clearPlaylist();
        socket.emit('leave_room', roomId);
				disconnect();
      };
      socket?.on('playlist', (resPlaylist: MusicType[]) => {
        setPlaylist(resPlaylist);
      });
      socket.emit('join_room', roomId);
      socket.emit('get_music', roomId);
      setRoomId(roomId);

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
	    <GlassContainer className="px-6 py-4 rounded-[2rem] w-3/5 overflow-y-auto">
	      <Search />
	    </GlassContainer>
	    <GlassContainer className="h-full w-2/5 rounded-[2rem] px-6 py-4 overflow-y-auto">
		    <GlassHighlightContainer className="rounded-[0.25rem] sticky top-0 mb-4 aspect-video">
		      <Player className="rounded-[0.25rem]" />
		    </GlassHighlightContainer>
		    <Playlist className="h-fit w-full"/>
	    </GlassContainer>
    </main>
  );
}
