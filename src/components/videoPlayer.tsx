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
    let isMuted = true;
    const [showModal, setShowModal] = useState(true); // 모달 표시 상태
    const [videoId, setVideoId] = useState<string | null>(null);
    const socket = useSocketStore(state => state.socket);
    const playerRef = useRef<YouTubePlayer>(undefined);
    const [isReady, setIsReady] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
        // 유저가 클릭하면 음소거 해제
        let succes = false;
        const setMute = setInterval(() => {
            if(!succes && playerRef.current?.getPlayerState()){
                try{
                    playerRef.current.unMute();
                    succes = true;
                    isMuted = false;
                }catch(e){
                    console.log(e);
                }
            }else{
                clearInterval(setMute);
            }
        },1000)
        playerRef.current.unMute();
    };
    const onPlayerReady = (event: any) => {
        playerRef.current = event.target;
        setIsReady(true);  // 준비 완료 상태 설정
    };
    useEffect(() => {
        setShowModal(props.reload);
    }, [props.reload]);
    useEffect(() => {
        if (isReady && playerRef.current) {
            console.log("isReady");
            let trying = 0;
            const reloading = setInterval(()=>{
                if((trying < 5) && playerRef.current?.getPlayerState())
                    try {
                        playerRef.current.seekTo(props.params || 0);
                        console.log("succes");
                        trying=5;
                    }catch (e){
                        console.log(e);
                    }finally {
                        trying++;
                    }
                else
                    clearInterval(reloading);
            },1000);
        }
    }, [isReady]);
    useEffect(() => {
        setVideoId(props.videoUrl);
    }, [props.videoUrl]);
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
                            mute: (isMuted ? 1 : 0),
                            controls: 0,
                            disablekb: 1,
                            origin: window.location.origin
                        }
                    }}
                    onReady={onPlayerReady}
                    onEnd={() => {props.handleVideoEnd()}}
                ></YouTube>
                <button onClick={() => {playerRef.current.playVideo();}}>play</button>
            </div>
        );
    }
}