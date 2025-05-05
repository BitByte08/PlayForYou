'use client';
import { useSocketStore } from '@/stores/socketStore';
import { useState, useEffect } from 'react';
import Search from '../search';
import { usePathname } from 'next/navigation';
import { Playlist } from '../playlist';
import { IoSearchOutline, IoCreateOutline, IoPersonOutline, IoMusicalNotesOutline } from "react-icons/io5";
import {Modal} from "@/components/global/modal";
interface SidebarSectionProps {
    sidebarMode: string;
    setSidebarMode: (mode: string) => void;
    isSidebarOpen: boolean;
}
interface ModalProps{
    type: string;
    title: string;
    content: string;
}
export const Sidebar = () => {

    useEffect(() => {
        setTimeout(()=>{
            setIsSidebarOpen(false);
        },2000);
    },[]);
    const router = usePathname();
    const isInRoom = router.includes('/room');
    const [sidebarMode, setSidebarMode] = useState("default");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [modal, setModal] = useState<ModalProps|undefined>();
    const logic = (state:boolean) => {
        if(sidebarMode === "default") {
            setIsSidebarOpen(state);
        }else{
            setIsSidebarOpen(true);
        }
    }
    return (
        <div className={`h-full ${isSidebarOpen?"w-128":" w-26"} transition-all duration-500 flex flex-col gap-4`}>
            <section className={`h-full border-default rounded-2xl border-1 transition-all duration-500 flex flex-col p-6 background-default`}
                    id="sidebar"
                    onMouseEnter={() => logic(true)}
                    onMouseLeave={() => logic(false)}
            >
                <UserSection sidebarMode={sidebarMode} setSidebarMode={setSidebarMode} isSidebarOpen={isSidebarOpen} />
                {!isInRoom && <CreateRoomSection sidebarMode={sidebarMode} setSidebarMode={setSidebarMode} isSidebarOpen={isSidebarOpen} />}
                {isInRoom && <SearchSection sidebarMode={sidebarMode} setSidebarMode={setSidebarMode} isSidebarOpen={isSidebarOpen} />}
                <PlaylistSection sidebarMode={sidebarMode} setSidebarMode={setSidebarMode} isSidebarOpen={isSidebarOpen} />
            </section>
            {modal && <Modal type={modal.type} title={modal.title} content={modal.content} />}
        </div>
    )
}

const UserSection = (props:SidebarSectionProps) => {
    const { sidebarMode, setSidebarMode } = props;
    return (
        <div className="h-fit min-h-12 border-b-1 flex flex-col">
            <span onClick={()=>setSidebarMode((sidebarMode==="user")?"default":"user")}
                className="w-full m-auto cursor-pointer h-12 leading-[3rem] text-xl overflow-hidden flex flex-wrap"
            >
            <IoPersonOutline className="h-12 w-12 p-1" />
            사용자
            </span>
            <div className={`${sidebarMode === "user"?"h-40":"h-0"} overflow-hidden transition-h duration-500`}>
                <input type="text" placeholder="방 이름" className='w-full h-10 border-1 border-default rounded mb-2' />
                <button className='w-full h-10 border-1 border-default rounded'
                        onClick={()=>{}}
                >
                생성
                </button>
            </div>
        </div>
    )
}
const CreateRoomSection = (props:SidebarSectionProps) => {
    const { sidebarMode, setSidebarMode } = props;
    const socket = useSocketStore(state => state.socket);
    const sendSocket = () => socket?.emit('create_room');

    return (
        <div className="h-fit min-h-12 border-b-1 flex flex-col">
                <span onClick={()=>setSidebarMode((sidebarMode==="create")?"default":"create")}
                  className="w-full m-auto cursor-pointer h-12 leading-[3rem] text-xl flex flex-wrap overflow-hidden"
                >
                <IoCreateOutline className="h-12 w-12 pl-1.5 pr-0.5 pt-1 pb-1" />
                방 생성하기
                </span>
                <div className={`${sidebarMode === "create"?"h-30":"h-0"} overflow-hidden transition-h duration-500`}>
                    <input type="text" placeholder="방 이름" className='w-full h-10 border-1 border-default rounded mb-2' />
                    <button className='w-full h-10 border-1 border-default rounded'
                            onClick={()=>sendSocket()}
                    >
                    생성
                    </button>
                </div>
        </div>
    )
}

const SearchSection = (props:SidebarSectionProps) => {
    const { sidebarMode, setSidebarMode, } = props;
    return (
        <div className="h-fit min-h-12 border-b-1 flex flex-col m-0 p-0">
                <span onClick={()=>setSidebarMode((sidebarMode==="search")?"default":"search")}
                    className="w-full m-auto cursor-pointer h-12 leading-[3rem] text-xl flex flex-wrap overflow-hidden"
                >
                <IoSearchOutline className="h-12 w-12 p-1" />
                노래 검색
                </span>
                <div className={`${sidebarMode === "search"?"h-[calc(100vh-20rem)]":"h-0"} overflow-y-scroll transition-h duration-500 max-h-full scrollbar-hide`}>
                    <Search />
                </div>
        </div>
    )
}

const PlaylistSection = (props:SidebarSectionProps) => {
    const { sidebarMode, setSidebarMode } = props;
    return (
        <div className="h-fit min-h-12 border-b-1 flex flex-col m-0 p-0">
            <span onClick={()=>setSidebarMode((sidebarMode==="playlist")?"default":"playlist")}
                  className="w-full m-auto cursor-pointer h-12 leading-[3rem] text-xl flex flex-wrap overflow-hidden"
            >
            <IoMusicalNotesOutline className="h-12 w-12 pl-0.5 pr-1.5 pt-1 pb-1" />
            플레이리스트
            </span>
            <div className={`${sidebarMode === "playlist"?"h-[calc(100vh-20rem)]":"h-0"} overflow-scroll transition-h duration-500 max-h-full`}>
                <Playlist />
            </div>
        </div>
    )
}