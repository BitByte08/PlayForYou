'use client';

import { useState } from 'react';
import axios from 'axios';
import {useSocketStore} from "@/stores/socketStore";
import { useUserStore } from '@/stores/userStore';
import Image from "next/image";
interface searchResult {
    title: string;
    videoId: string;
    thumbnail: string;
}
export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<searchResult[]>([]);
    const socket = useSocketStore(state => state.socket);
    const { roomId } = useUserStore();
    const handleSearch = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/search?q=` + query); // Next.js에서 프록시 설정도 가능
        setResults(res.data);
    };
    const handleAdd = (title:string, videoId:string) => {
        if(socket)
            socket.emit('add_music', { roomId: roomId, musicInfo: {name:title,id:videoId} });

    };
    return (
        <>
            <div className="sticky top-0 background-default text-default">
                <input
                    className="w-full border border-gray-400 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="검색어 입력"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    className="w-full bg-blue-500 text-white rounded py-2 mb-4 hover:bg-blue-600 transition"
                >
                    검색
                </button>
            </div>
            <ul className="space-y-3 overflow-scroll h-fit">
                {results.map((video) => (
                    <li key={video.videoId} className="bg-white p-2 rounded shadow-sm flex gap-2 items-start highlight text-default">
                        <Image
                            src={video.thumbnail}
                            alt="thumb"
                            width={0}
                            height={0}
                            className="w-20 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-default">{video.title}</p>
                        </div>
                        <button onClick={()=>handleAdd(video.title,video.videoId)} className='text-default'>추가</button>
                    </li>
                ))}
            </ul>
        </>
    );
}