import React from 'react';
import Image from 'next/image';

export default function NowPlaying({ title, thumbnail, elapsed, duration }: {
    title: string;
    thumbnail: string;
    elapsed: number;
    duration: number;
}) {
    const percentage = Math.min(100, (elapsed / duration) * 100);

    return (
        <div className="flex items-center bg-gray-900 text-white p-4 rounded-xl shadow-md">
            <Image src={thumbnail} alt="thumbnail" className="w-24 h-24 rounded-lg mr-4 object-cover" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <div className="w-full bg-gray-700 h-2 rounded mt-2">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${percentage}%` }} />
                </div>
                <p className="text-sm text-gray-300 mt-1">
                    {Math.floor(elapsed / 60)}:{('0' + elapsed % 60).slice(-2)} / {Math.floor(duration / 60)}:{('0' + duration % 60).slice(-2)}
                </p>
            </div>
        </div>
    );
}