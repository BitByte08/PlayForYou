// stores/playlistStore.ts
import { create } from 'zustand'

type PlaylistState = {
    playlist: musicType[]
    currentVideo?: string
}

type PlaylistActions = {
    actions: {
        setPlaylist: (list: musicType[]) => void
        addPlaylist: (music: musicType) => void
    }
}

export const usePlaylistStore = create<PlaylistState & PlaylistActions>((set) => ({
    playlist: [],
    actions: {
        setPlaylist: (list) => set({ playlist: list }),
        addPlaylist: (music: musicType) => set((state)=>({playlist: [...state.playlist, music]}))
    }
}))