'use client';

import { useRef, useState, useEffect } from 'react';
import { musicType } from '@/type';

interface Props {
    playlist: musicType[];
}

export default function ResizableSidebar({ playlist }: Props) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [sidebarWidth, setSidebarWidth] = useState<number>(300);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const startResizing = () => setIsResizing(true);
    const stopResizing = () => setIsResizing(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;
        const newWidth = e.clientX;
        setSidebarWidth(Math.max(200, Math.min(newWidth, 500))); // 최소 200, 최대 500px
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    return (
        <>
            <aside
                ref={sidebarRef}
                style={{ width: sidebarWidth }}
                className="bg-gray-900 text-white p-4 h-screen"
            >
                <h2 className="text-xl font-bold mb-4">🎵 플레이리스트</h2>
                <ul className="space-y-2">
                    {playlist.map((music) => (
                        <li key={music.id} className="bg-gray-800 p-2 rounded">{music.name}</li>
                    ))}
                </ul>
            </aside>
            <div
                onMouseDown={startResizing}
                className="w-1 h-screen bg-blue-500 cursor-col-resize"
            />
        </>
    );
}