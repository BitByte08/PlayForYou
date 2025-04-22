'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {useParams} from "next/navigation";

const socket = io('http://localhost:4000');

export default function Home() {
    const params = useParams();
    const roomId = params.roomId as string;
    const [videoUrl, setVideoUrl] = useState('');
    const [playlist, setPlaylist] = useState<string[]>([]);

    useEffect(() => {
        socket.emit('join_room', roomId);

        socket.on('init_playlist', (playlist: string[]) => {
            console.log('처음 받은 큐:', playlist);
            setPlaylist(playlist);
        });

        socket.on('video_added', (video: string) => {
            setPlaylist((prev) => [...prev, video]);
        });

        return () => {
            socket.off('init_playlist');
            socket.off('video_added');
        };
    }, []);

    const handleAdd = () => {
        if (videoUrl.trim()) {
            socket.emit('add_video', { roomId: roomId, videoUrl });
            setVideoUrl('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>🎶 공동 플레이리스트</h1>
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube 링크"
            />
            <button onClick={handleAdd}>추가</button>

            <ul>
                {playlist.map((url, i) => (
                    <li key={i}>{url}</li>
                ))}
            </ul>
        </div>
    );
}