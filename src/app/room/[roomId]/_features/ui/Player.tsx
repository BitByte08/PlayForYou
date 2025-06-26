'use client';

import {useSocketStore} from "@/stores/socketStore";
import {useEffect, useRef, useState} from "react";
import YouTube, {YouTubeEvent, YouTubePlayer} from "react-youtube";
import {useUserStore} from "@/stores/userStore";
import {ModalProps, RoomState} from "@/interface";
import {useModalStore} from "@/stores/modalStore";

interface VideoPlayerProps {
	className?: string;
}
export default function Player({className}:VideoPlayerProps) {
  const socket = useSocketStore(state => state.socket);
  const roomId = useUserStore(state => state.roomId);
  const setModal = useModalStore(state => state.actions.setModal)
  const playerRef = useRef<YouTubePlayer>(undefined);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);
  const [nowPlay, setNowPlay] = useState<string>('');
  const [isMute, setIsMute] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [nowPlayParams, setNowPlayParams] = useState<number>(Date.now());
  const handleModalClose = () => {
    setShowModal(false);
    // 유저가 클릭하면 음소거 해제
    let success = false;
    const setMute = setInterval(() => {
      if (!success && playerRef.current?.getPlayerState()) {
        try {
          playerRef.current.unMute();
          success = true;
          setIsMute(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        clearInterval(setMute);
      }
    }, 1000)
    try {
      playerRef.current.unMute();
    } catch (e) {
      console.error(e);
    }
  };
  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    try {
      playerRef.current.unMute();
    } catch (e) {
      console.log(e);
    }
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
  }, [socket]);
  useEffect(() => {
    if (nowPlay) {
      const calculatedStart = Math.floor((Date.now() - nowPlayParams) / 1000);
      setVideoStartTime(calculatedStart);
    }
  }, [nowPlay, nowPlayParams]);
  const handleVideoEnd = () => {
    if (socket) socket.emit('end_music', roomId);
  };
  useEffect(() => {
    if (showModal && roomId) {
      const State: ModalProps = {
        content: "소리를 들으려면 확인 버튼을 눌려주세요.", title: "소리 켜기", type: "alert", action: handleModalClose
      }
      setModal(State);
    }
  }, [showModal, roomId]);
  return (
		<>
      {nowPlay !== "" && (
        <>
          <YouTube
	          className={`h-full w-full ${className}`}
            videoId={nowPlay}
            opts={{
              host: "https://www.youtube-nocookie.com", // 이걸 "https://www.youtube-nocookie.com"으로 바꿔도 react-youtube가 무시하는 경우가 많음
              playerVars: {
                autoplay: 1,
                mute: isMute ? 1 : 0,
                controls: 0,
                rel: 0,
                modestbranding: 1,
                start: videoStartTime,
                disablekb: 1,
                fs: 0, // 전체화면 버튼 제거
                iv_load_policy: 3, // 주석(annotations) 제거
              }
            }}
            onReady={onPlayerReady}
            onEnd={handleVideoEnd}
          />
        </>
      )}
		</>
  );

}