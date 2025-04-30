'use client'
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from "next/navigation";
import { usePlaylistStore } from "@/stores/playlistStore";
import { musicType } from "@/type";
import VideoPlayer from "@/components/videoPlayer";
import { useSocketStore } from "@/stores/socketStore";
import { router } from "next/client";
import SearchSection from "@/components/search";
import NowPlaying from "@/components/player";
import { useUserStore } from '@/stores/userStore';

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
  const [videoUrl, setVideoUrl] = useState('');
  const [playSing, setPlaySing] = useState('');
  const [playParams, setPlayParams] = useState<number>(0);
  const playlist = usePlaylistStore(state => state.playlist);
  const { setPlaylist, clearPlaylist } = usePlaylistStore(state => state.actions);
  const [fir, setFir] = useState<boolean>(false);
  const {setRoomId, clearRoomId} = useUserStore();
  useEffect(() => {
    if (socket === null) connect();
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const Handle = (event) => {
        clearPlaylist();
        socket.emit('leave_room', roomId);
      };
      socket?.on('playlist', (resPlaylist: MusicData[]) => {
        setPlaylist(resPlaylist);
      });
      socket.emit('join_room', roomId);
      socket.emit('get_music', roomId);
      setRoomId(roomId);
      socket.on('playlist', (resPlaylist: musicType[]) => {
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
  }, [socket, roomId, connect, disconnect, setPlaylist]);

  useEffect(() => {
    console.log(playSing);
  }, [playSing]);

  // handleVideoEnd는 socket에 접근하므로 useCallback을 사용하여 최적화
  const handleVideoEnd = () => {
    if (socket) socket.emit('end_music', roomId);
  };

  // 가상 음악 데이터 설정 (현재는 예시로 넣은 것)
  let currentMusic;
  let elapsed = 1;
  let duration = 10;

  return (
    <main className="flex h-full w-full">
      {/* 오른쪽 메인 영역 */}
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {/* <NowPlaying
          title={currentMusic?.name || '재생 중인 곡 없음'}
          thumbnail={`https://i.ytimg.com/vi/${currentMusic?.id}/mqdefault.jpg`}
          elapsed={elapsed}
          duration={duration}
        /> */}
        <VideoPlayer />
      </div>
      {/* 왼쪽 툴바 */}
    </main>
  );
}
