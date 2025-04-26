// app/room/[id]/layout.tsx
'use client'
import {ReactNode} from 'react'
import {usePlaylistStore} from "@/stores/playlistStore";
import ResizableSidebar from "@/components/sidebar";

export default function RoomLayout({ children }: { children: ReactNode }) {
    const playlist = usePlaylistStore(state => state.playlist);
    return (
        <div className="flex h-screen">
            {/* 사이드바 */}
            <ResizableSidebar playlist={playlist} ></ResizableSidebar>

            {/* 메인 */}
            <main className="flex-1 bg-black p-4 m-0">
                {children}
            </main>
        </div>
    )
}