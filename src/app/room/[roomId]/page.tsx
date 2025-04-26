'use client'
import { useEffect, useState } from 'react';
import {useParams} from "next/navigation";
import {usePlaylistStore} from "@/stores/playlistStore";
import {musicType} from "@/type";
import VideoPlayer from "@/components/videoPlayer";
import {useSocketStore} from "@/stores/socketStore";
import {setInterval} from "node:timers";
import SearchSection from "@/components/search";
import NowPlaying from "@/components/player";
import {router} from "next/client";

interface MusicData {
    name: string,
    id: string
};
export interface RoomState {
    currentMusic: MusicData;
    startedAt: number;
    endCount: number;
};

export default function Home() {
    const socket = useSocketStore(state => state.socket);
    const {connect, disconnect} = useSocketStore(state => state.actions);
    const params = useParams();
    const roomId = params.roomId as string;
    const [videoUrl, setVideoUrl] = useState('');
    const [playSing, setPlaySing] = useState("");
    const [playParams, setPlayParams] = useState<number>(0);
    const playlist = usePlaylistStore(state => state.playlist);
    const {setPlaylist, addPlaylist} = usePlaylistStore(state => state.actions);
    useEffect(() => {

    }, [playlist]);
    useEffect(() => {
        if(socket===null) connect();
    }, []);
    useEffect(() => {
        console.log(playSing);
    }, [playSing]);
    useEffect(() => {
        if(socket) {
            socket.emit('join_room', roomId);
            socket.emit('get_music', roomId);
            socket.on('playlist', (playlist: musicType[]) => {
                console.log('처음 받은 큐:', playlist);
                setPlaylist(playlist);
            });

            socket.on('music_state', (state: RoomState) => {
                setPlaySing(state.currentMusic.id);
            });
            socket.on("room_deleted", () => {
                alert("이 방은 삭제되었습니다.");
                router.push("/"); // 메인 페이지 등으로 이동
            });

            window.addEventListener('beforeunload', () => {
                socket.emit('leaveRoom', roomId);
                disconnect();
            });
            return () => {
                window.removeEventListener('beforeunload', () => {
                    socket.emit('leaveRoom', roomId);
                    disconnect();
                });
                socket.off('leaveRoom');
                socket.off("room-deleted");
                socket.off('init_playlist');
                socket.off('video_added');
            };
        }
    }, [socket]);
    const handleVideoEnd = () => {
        // 여기에서만 socket 접근
        if(socket) socket.emit('music-ended', roomId);
    };
    let currentMusic;
    let elapsed=1;
    let duration=10;
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
                <VideoPlayer videoUrl={playSing} params={playParams} handleVideoEnd={handleVideoEnd} reload={true} />
            </div>
            {/* 왼쪽 툴바 */}
            <SearchSection roomId={roomId} />
        </div>
    );
}