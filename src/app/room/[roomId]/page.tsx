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
  const { setPlaylist, addPlaylist } = usePlaylistStore(state => state.actions);
  const [fir, setFir] = useState<boolean>(false);

  useEffect(() => {
    if (socket === null) connect();
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const Handle = (event) => {
        socket.emit('leave_room', roomId);
      };

      socket.emit('join_room', roomId);
      socket.emit('get_music', roomId);

      socket.on('playlist', (playlist: musicType[]) => {
        setPlaylist(playlist);
      });

      socket.on('music_state', (state: RoomState) => {
        if (state?.currentMusic) {
          setPlaySing(state.currentMusic.id);
          setPlayParams(state.startedAt);
        } else {
          setPlaySing('');
          setPlayParams(0);
        }
      });

      socket.on("room_deleted", () => {
        alert("이 방은 삭제되었습니다.");
        router.push("/"); // 메인 페이지 등으로 이동
      });

      window.removeEventListener('beforeunload', disconnect);
      window.addEventListener('beforeunload', Handle);

      return () => {
        window.removeEventListener('beforeunload', Handle);
        socket.emit('leave_room', roomId);
        socket.off('leave_room');
        socket.off("room-deleted");
        socket.off('init_playlist');
        socket.off('video_added');
      };
    }
  }, [socket, roomId, connect, disconnect, setPlaylist]);

  useEffect(() => {
    console.log(playSing);
  }, [playSing]);

  // handleVideoEnd는 socket에 접근하므로 useCallback을 사용하여 최적화
  const handleVideoEnd = useCallback(() => {
    if (socket) socket.emit('end_music', roomId);
  }, [socket, roomId]);

  // Memoized videoUrl and playParams to avoid unnecessary re-renders
  const memoizedVideoUrl = useMemo(() => playSing, [playSing]);
  const memoizedPlayParams = useMemo(() => playParams, [playParams]);

  // 가상 음악 데이터 설정 (현재는 예시로 넣은 것)
  let currentMusic;
  let elapsed = 1;
  let duration = 10;

  return (
    <div className="flex h-full w-full">
      {/* 오른쪽 메인 영역 */}
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <NowPlaying
          title={currentMusic?.name || '재생 중인 곡 없음'}
          thumbnail={`https://i.ytimg.com/vi/${currentMusic?.id}/mqdefault.jpg`}
          elapsed={elapsed}
          duration={duration}
        />
        <VideoPlayer
          videoUrl={memoizedVideoUrl}
          params={memoizedPlayParams}
          handleVideoEnd={handleVideoEnd}
          reload={true}
        />
      </div>
      {/* 왼쪽 툴바 */}
      <SearchSection roomId={roomId} />
    </div>
  );
}
