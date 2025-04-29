// app/room/[id]/layout.tsx
'use client'
import {ReactNode} from 'react'
import {usePlaylistStore} from "@/stores/playlistStore";

export default function RoomLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}