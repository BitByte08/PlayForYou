'use client';

import { useSocketStore } from "@/stores/socketStore";
import { useEffect, useRef, useState } from "react";
import SoundModal from "./soundModal";
import YouTube, {YouTubeEvent, YouTubePlayer} from "react-youtube";
import { useUserStore } from "@/stores/userStore";

interface MusicData {
    name: string;
    id: string;
  }
  
  export interface RoomState {
    currentMusic: MusicData;
    startedAt: number;
    endCount: number;
  }

export default function VideoPlayer() {
    const socket = useSocketStore(state => state.socket);
    const roomId = useUserStore(state => state.roomId);
    const playerRef = useRef<YouTubePlayer>(undefined);
    const [videoStartTime, setVideoStartTime] = useState<number>(0);
    const [nowPlay, setNowPlay] = useState<string>('');
    const [isMute, setIsMute] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [nowPlayParams,setNowPlayParams] = useState<number>(Date.now());
    const handleModalClose = () => {
        setShowModal(false);
        // 유저가 클릭하면 음소거 해제
        let succes = false;
        const setMute = setInterval(() => {
            if(!succes && playerRef.current?.getPlayerState()){
                try{
                    playerRef.current.unMute();
                    succes = true;
                    setIsMute(false);
                }catch(e){
                    console.log(e);
                }
            }else{
                clearInterval(setMute);
            }
        },1000)
        try{
            playerRef.current.unMute();
        }catch(e){
            console.error(e);
        }
    };
    const onPlayerReady = (event:YouTubeEvent) => {
        playerRef.current = event.target;
    };
    useEffect(() => {
        if (!socket) return;

        const handleMusicState = (state: RoomState) => {
            if (state?.currentMusic) {
            setNowPlay(state.currentMusic.id);
            setNowPlayParams(state.startedAt);
            } else {
            setNowPlay('');
            setNowPlayParams(0);
            }
        };

        socket.off('music_state', handleMusicState); // 중복 방지
        socket.on('music_state', handleMusicState);

        return () => {
            socket.off('music_state', handleMusicState);
        };
    },[socket]);
    useEffect(() => {
        if (nowPlay) {
          const calculatedStart = Math.floor((Date.now() - nowPlayParams) / 1000);
          setVideoStartTime(calculatedStart);
        }
      }, [nowPlay, nowPlayParams]);
    const handleVideoEnd = () => {
        if (socket) socket.emit('end_music', roomId);
      };
    return (
            <div className="aspect-video w-full">
                {showModal && <SoundModal onClose={handleModalClose} />}
                {nowPlay!==""&&<><YouTube
                    videoId={nowPlay}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            mute: (isMute?1:0),
                            controls: 0,
                            rel: 0,
                            modestbranding: 1,
                            start: videoStartTime,
                            disablekb: 1
                        }
                    }}
                    onReady={onPlayerReady}
                    onEnd={() => handleVideoEnd()}
                ></YouTube>
                <button onClick={() => handleVideoEnd()} className='text-default '>skip</button>
                </>}
            </div>
        );
    
}