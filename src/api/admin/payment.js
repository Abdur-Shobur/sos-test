import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const AdminBankList = () => {
	const { data, refetch, isLoading } = useQuery(
		['get_admin_own_payments_all_items'],
		() => {
			return http.get(`/admin/bank/all`);
		}
	);
	const banks = data?.data?.message;
	return { banks, refetch, isLoading };
};
