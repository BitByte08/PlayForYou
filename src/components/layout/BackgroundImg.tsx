"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BackgroundImg = () => {
	const [bgUrl, setBgUrl] = useState("");

	useEffect(() => {
		fetch("/api/background")
			.then((res) => res.json())
			.then((data) => setBgUrl(data.url));
	}, []);

	if (!bgUrl) return null;

	return (
		<Image
			src={bgUrl}
			alt="BackgroundImg"
			fill
			unoptimized
			className="fixed left-0 top-0 w-full h-full object-cover z-0"
		/>
	);
};

export default BackgroundImg;
