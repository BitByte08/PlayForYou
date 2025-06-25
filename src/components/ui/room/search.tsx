'use client';

import { useState } from 'react';
import axios from 'axios';
import {useSocketStore} from "@/stores/socketStore";
import { useUserStore } from '@/stores/userStore';
import Image from "next/image";
import {useModalStore} from "@/stores/modalStore";
import {ModalProps} from "@/interface";
interface searchResult {
    title: string;
    videoId: string;
    thumbnail: string;
}
export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<searchResult[]>([]);
    const socket = useSocketStore(state => state.socket);
    const {setModal, clearModal} = useModalStore(state => state.actions);
    const { roomId } = useUserStore();
    const handleSearch = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/search?q=` + query); // Next.js에서 프록시 설정도 가능
        setResults(res.data);
    };
    const handleAdd = (title:string, videoId:string) => {
        if(socket) {
          socket.emit('add_music', {roomId: roomId, musicInfo: {name: title, id: videoId}});
          const modalInfo:ModalProps = {
            content: title, title: "노래 추가됨", type: "alert", autoClose: true
          };
          setModal(modalInfo);
          setTimeout(() => clearModal(),5000);
        }
    };
    return (
        <>
            <div className="sticky top-0 text-default flex h-12 gap-2 z-1 mb-4">
                <input
                    className="glass-default w-full h-full rounded-full px-3 focus:outline-none focus:ring-1 focus:ring-[var(--highlight-color)]"
                    placeholder="검색어 입력"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    className="min-w-12 min-h-12  glass-default text-white rounded-full py-2 hover:bg-[var(--highlight-color)] transition"
                >
                    검색
                </button>
            </div>
            <ul className="h-fit z-0 flex flex-wrap gap-2">
                {results.map((video) => (
                    <li key={video.videoId} className="w-[calc(50%-1rem)] glass-default p-2 rounded shadow-sm flex gap-2 items-start text-default">
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