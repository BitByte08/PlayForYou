'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [playlist, setPlaylist] = useState<string[]>([]);

    useEffect(() => {
        socket.emit('join_room', "room123");

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
      socket.emit('add_video', { roomId: 'room123', videoUrl });
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