// app/room/[id]/layout.tsx
'use client'
import {ReactNode} from 'react'
import {usePlaylistStore} from "@/stores/playlistStore";

export default function RoomLayout({ children }: { children: ReactNode }) {
    const playlist = usePlaylistStore(state => state.playlist);
    return (
        <div className="flex h-full w-full">
            {/* 사이드바 */}

            {/* 메인 */}
            <main className="flex-1 bg-black p-4 m-0">
                {children}
            </main>
        </div>
    )
}