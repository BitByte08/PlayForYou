// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND,
	withCredentials: false, // 필요에 따라 설정
});

export default axiosInstance;
