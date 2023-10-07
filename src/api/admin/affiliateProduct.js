import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

// 3 get all Affiliates Request product
export const AffiliatesProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_admin_all_afi_product_data', page, search],
		() => {
			return http.get(
				`/admin/request/product/all?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};
// 3 get all Affiliates Request product Active
export const AffiliatesActiveProduct = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['fetch_admin_active_product_data', page, search],
		() => {
			return http.get(
				`/admin/request/product/active?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// get all Affiliates Request product Pending
export const AffiliatesPendingProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_admin_pending_product_data', page, search],
		() => {
			return http.get(
				`/admin/request/product/pending?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// get all Affiliates Request product Rejected
export const AffiliatesRejectedProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_admin_rejected_product_data', page, search],
		() => {
			return http.get(
				`/admin/request/product/rejected?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;

	return { products, refetch, isLoading };
};

// Affiliates Request product View
export const AffiliatesProductView = (id) => {
	const { data, isLoading, isError } = useQuery(
		['get_details_affiliate_req_view_product_data_from_admin', id],
		() => {
			return http.get(`/admin/request/product/view/${id}`);
		}
	);
	const product = data?.data?.product;

	return { product, isLoading, isError };
};
