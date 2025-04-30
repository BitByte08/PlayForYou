// stores/playlistStore.ts
import { create } from 'zustand'
import {musicType} from "@/type";

type PlaylistState = {
    playlist: musicType[]
    currentVideo?: string
}

type PlaylistActions = {
    actions: {
        setPlaylist: (list: musicType[]) => void
        addPlaylist: (music: musicType) => void
        clearPlaylist: () => void,
        getFirstSong: () => musicType
    }
}

export const usePlaylistStore = create<PlaylistState & PlaylistActions>((set,get) => ({
    playlist: [],
    actions: {
        setPlaylist: (list) => set({ playlist: [...list] }),
        addPlaylist: (music: musicType) => set((state)=>({playlist: [...state.playlist, music]})),
        clearPlaylist: () => set({ playlist: undefined }),
        getFirstSong: (()=> get().playlist[0])
    }
}))