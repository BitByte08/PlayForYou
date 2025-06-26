"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {getUnsplashImg} from "@/app/_entities/api/queries";

const BackgroundImg = () => {
	const [bgUrl, setBgUrl] = useState("");

	useEffect(() => {
		async function fetchImage() {
			try {
				const data = await getUnsplashImg();
				setBgUrl(data.url);
			} catch (error) {
				console.error("Failed to fetch image:", error);
			}
		}

		fetchImage();
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
