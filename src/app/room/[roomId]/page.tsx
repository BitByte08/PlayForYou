'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {useParams} from "next/navigation";
import {usePlaylistStore} from "@/stores/playlistStore";

const socket = io('http://localhost:4000');

export default function Home() {
    const params = useParams();
    const roomId = params.roomId as string;
    const [videoUrl, setVideoUrl] = useState('');
    const playlist = usePlaylistStore(state => state.playlist);
    const {setPlaylist, addPlaylist} = usePlaylistStore(state => state.actions);
    useEffect(() => {
        socket.emit('join_room', roomId);

        socket.on('init_playlist', (playlist: musicType[]) => {
            console.log('처음 받은 큐:', playlist);
            setPlaylist(playlist);
        });

        socket.on('video_added', (video: musicType) => {
            addPlaylist(video);
        });

        return () => {
            socket.off('init_playlist');
            socket.off('video_added');
        };
    }, []);

    const handleAdd = () => {
        if (videoUrl.trim()) {
            socket.emit('add_video', { roomId: roomId, musicInfo: {name:"music",url:videoUrl} });
            setVideoUrl('');
        }
    };

    return (
        <div className="h-full w-full">
            <h1>🎶 공동 플레이리스트</h1>
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube 링크"
            />
            <button onClick={handleAdd}>추가</button>
        </div>
    );
}