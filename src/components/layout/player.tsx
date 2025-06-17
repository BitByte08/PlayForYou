import VideoPlayer from "@/containers/room/videoPlayer";
import {Playlist} from "@/containers/room/playlist";


const Player = () => {
    return (
        <div className="flex flex-col p-6 h-full">
            <div className="flex-1/3">
                <VideoPlayer />
            </div>
            <div className="flex-2/3">
                <Playlist />
            </div>
        </div>
    )
}

export default Player;