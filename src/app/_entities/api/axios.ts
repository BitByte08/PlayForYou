import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.unsplash.com",
	headers: {
		Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
	},
});

export default axiosInstance;
