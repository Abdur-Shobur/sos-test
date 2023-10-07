import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

// size
export const GetAllSize = () => {
	const { data, refetch } = useQuery('fetch_view_size_data', () => {
		return http.get(`/view-size`);
	});
	const size = data?.data?.size;
	return { size, refetch };
};

export const GetAllSizeActive = () => {
	const { data, refetch } = useQuery('fetch_active_size_data', () => {
		return http.get(`/view-size/active`);
	});
	const size = data?.data?.size;
	return { size, refetch };
};

// color
export const GetAllColor = () => {
	const { data, refetch } = useQuery('fetch_color_data', () => {
		return http.get(`/view-color`);
	});
	const color = data?.data?.color;
	return { color, refetch };
};

export const GetAllColorActive = () => {
	const { data, refetch } = useQuery('fetch_active_color_data', () => {
		return http.get(`/view-color/active`);
	});
	const size = data?.data?.size;
	return { size, refetch };
};
