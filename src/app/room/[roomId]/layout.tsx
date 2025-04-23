// app/room/[id]/layout.tsx
'use client'
import {ReactNode} from 'react'
import {usePlaylistStore} from "@/stores/playlistStore";
import {musicType} from "@/type";

export default function RoomLayout({ children }: { children: ReactNode }) {
    const playlist = usePlaylistStore(state => state.playlist);
    return (
        <div className="flex h-screen">
            {/* 사이드바 */}
            <aside className="w-full md:w-1/4 bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold mb-4">🎵 플레이리스트</h2>
                <ul className="space-y-2">
                    {playlist.map((music:musicType) => (
                        <li key={music.url} className="bg-gray-800 p-2 rounded">{music.name}</li>
                    ))
                    }
                </ul>
            </aside>

            {/* 메인 */}
            <main className="flex-1 bg-black p-4 m-0">
                {children}
            </main>
        </div>
    )
}