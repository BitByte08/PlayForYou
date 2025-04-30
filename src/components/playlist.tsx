'use client';
import { usePlaylistStore } from "@/stores/playlistStore";
import Image from "next/image";
interface MusicData {
    name: string,
    id: string
};
export const Playlist = () => {
    const playlist = usePlaylistStore(state => state.playlist);
    return (
        <div className="playlist">
            {playlist?.length<=0 && <h2>플레이리스트가 비어있어요.</h2>}
            <ul>
                {playlist?.map((music) => (
                    <MusicBlock key={music.id} music={music} />
                ))}
            </ul>
        </div>
    )
}
interface MusicBlockProps {
    music: MusicData;
}
const MusicBlock = (props:MusicBlockProps) => {
    const {music} = props;
    return (
        <li className="bg-gray-200 dark:bg-gray-700 p-4 rounded mb-1">
            <Image src={`https://img.youtube.com/vi/${music.id}/0.jpg`} alt="thumb" className="w-20 h-16 rounded object-cover" />
            <span>{music.name}</span>
        </li>
    )
}