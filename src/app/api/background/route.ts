import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = process.env.UNSPLASH_QUERY || "abstract,blur";

	try {
		// Unsplash 정식 API: 랜덤 사진 1장
		const response = await axiosInstance.get("/photos/random", {
			params: {
				query: query,
				orientation: "landscape",
			},
		});

		const imageUrl = response.data.urls.full;

		return NextResponse.json({ url: imageUrl });
	} catch (error) {
		console.error("Unsplash API Error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch image" },
			{ status: 500 }
		);
	}
}
