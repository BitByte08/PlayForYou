'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SearchSection() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        const res = await axios.get('http://localhost:4000/search?q=' + query); // Next.js에서 프록시 설정도 가능
        setResults(res.data);
    };

    return (
        <div className="p-4">
            <input
                className="border px-2 py-1"
                placeholder="검색어 입력"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
                검색
            </button>

            <ul className="mt-4">
                {results.map((video) => (
                    <li key={video.id.videoId} className="mb-2">
                        <p className="font-bold">{video.snippet.title}</p>
                        <img src={video.snippet.thumbnails.default.url} alt="thumb" />
                    </li>
                ))}
            </ul>
        </div>
    );
}