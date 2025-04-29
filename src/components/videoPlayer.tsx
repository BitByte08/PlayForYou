'use client';

import {useEffect, useRef, useState} from 'react';
import {useSocketStore} from "@/stores/socketStore";
import YouTube, { YouTubePlayer} from 'react-youtube';
import {setInterval} from "node:timers";
import SoundModal from "@/components/soundModal";
type VideoPlayerProps = {
    videoUrl:string,
    params:number,
    handleVideoEnd:()=>void,
    reload:boolean,
}
export default function VideoPlayer(props: VideoPlayerProps) {
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(true); // 모달 표시 상태
    const [videoId, setVideoId] = useState<string | null>(null);
    const socket = useSocketStore(state => state.socket);
    const playerRef = useRef<YouTubePlayer>(undefined);
    const [isReady, setIsReady] = useState(false);
    const [start, setStart] = useState<number>(0);
    const handleModalClose = () => {
        setShowModal(false);
        // 유저가 클릭하면 음소거 해제
        let succes = false;
        const setMute = setInterval(() => {
            if(!succes && playerRef.current?.getPlayerState()){
                try{
                    playerRef.current.unMute();
                    succes = true;
                    setIsMuted(false);
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

        }
    };
    const onPlayerReady = (event: any) => {
        playerRef.current = event.target;
        setIsReady(true);  // 준비 완료 상태 설정
    };
    useEffect(() => {
        setShowModal(props.reload);
    }, [props.reload]);
    useEffect(() => {
        if(props.videoUrl!==videoId) setVideoId(props.videoUrl);
    }, [props.videoUrl]);
    useEffect(() => {
        if(props.params!==start) setStart(props.params)
    }, [props.params]);
    if (videoId===""||videoId==undefined) return <div>🎬 재생할 영상이 없습니다</div>;
    else {
        if(socket)
            socket.emit('start_play', {videoId});
        return (
            <div className="aspect-video w-full">
                {showModal && <SoundModal onClose={handleModalClose} />}
                <YouTube
                    videoId={videoId}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            mute: (isMuted?1:0),
                            controls: 0,
                            rel: 0,
                            modestbranding: 1,
                            start: (Date.now()-start)/1000,
                            disablekb: 1,
                            origin: window.location.origin
                        }
                    }}
                    onReady={onPlayerReady}
                    onEnd={() => {props.handleVideoEnd()}}
                ></YouTube>
                <button onClick={() => {props.handleVideoEnd();}} className='text-default '>skip</button>
            </div>
        );
    }
}