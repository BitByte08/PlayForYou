import VideoPlayer from "@/components/ui/room/videoPlayer";
import {Playlist} from "@/components/ui/room/playlist";


const Info = () => {
    return (
        <div className="flex flex-col p-6 h-full">
            <div className="flex-2/6">
                <VideoPlayer />
            </div>
            <div className="flex-3/6">
                <Playlist />
            </div>
            <div className="flex-1/6">

            </div>
        </div>
    )
}

export default Info;