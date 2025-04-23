'use client';

import { useEffect, useState } from 'react';

interface VideoPlayerProps {
    videoUrl: string;  // 예: https://www.youtube.com/watch?v=dQw4w9WgXcQ
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    const [videoId, setVideoId] = useState<string | null>(null);

    useEffect(() => {
        console.log(videoUrl);
        const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (match) setVideoId(match[1]);
    }, [videoUrl]);

    if (!videoId) return <div>🎬 재생할 영상이 없습니다</div>;

    return (
        <div className="aspect-video w-full">
            <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>
    );
}