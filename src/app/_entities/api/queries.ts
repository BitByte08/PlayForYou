// lib/unsplash.ts (API 호출 전용 함수)

import axiosInstance from "@/app/_entities/api/axios";

export async function getUnsplashImg() {
	const query = "white";

	try {
		const response = await axiosInstance.get("/photos/random", {
			params: {
				query,
				orientation: "landscape",
			},
		});

		return { url: response.data.urls.full };
	} catch (error) {
		console.error("Unsplash API Error:", error);
		throw new Error("Failed to fetch image");
	}
}
