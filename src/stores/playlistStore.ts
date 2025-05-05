// stores/playlistStore.ts
import { create } from 'zustand'
import {MusicType} from "@/type";

type PlaylistState = {
    playlist: MusicType[]
    currentVideo?: string
}

type PlaylistActions = {
    actions: {
        setPlaylist: (list: MusicType[]) => void
        addPlaylist: (music: MusicType) => void
        clearPlaylist: () => void,
        getFirstSong: () => MusicType
    }
}

export const usePlaylistStore = create<PlaylistState & PlaylistActions>((set,get) => ({
    playlist: [],
    actions: {
        setPlaylist: (list) => set({ playlist: [...list] }),
        addPlaylist: (music: MusicType) => set((state)=>({playlist: [...state.playlist, music]})),
        clearPlaylist: () => set({ playlist: undefined }),
        getFirstSong: (()=> get().playlist[0])
    }
}))