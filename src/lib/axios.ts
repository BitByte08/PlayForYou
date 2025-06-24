import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.unsplash.com",
	headers: {
		Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
	},
});

export default axiosInstance;
