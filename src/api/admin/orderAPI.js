import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const ViewOrderProduct = (id) => {
	const { data, isLoading, refetch } = useQuery(
		['get_details_admin_order_history_view__data', id],
		() => {
			return http.get(`/admin/order/view/${id}`);
		}
	);
	const product = data?.data?.message;
	return { product, isLoading, refetch };
};
