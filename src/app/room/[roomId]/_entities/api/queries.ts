// queries/search.ts
import axios from '@/app/room/[roomId]/_entities/api/axios'; // @는 tsconfig.json에서 baseUrl과 paths 설정이 필요함

export const searchQuery = async (query: string) => {
	const res = await axios.get('/search', {
		params: {
			q: query }
	});
	return res.data;
};
