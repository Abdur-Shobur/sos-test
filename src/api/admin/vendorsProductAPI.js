import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

// 1 get all vendor product
export const GetVendorProductAll = (page, search) => {
	// get product
	const { data, refetch, isLoading } = useQuery(
		['fetch_view-product_data', page, search],
		() => {
			return http.get(`/view-product?page=${page}&search=${search}`);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// 2 get all vendor active product
export const GetVendorProductActive = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_view-active-product_data', page, search],
		() => {
			return http.get(`/view-product/active?page=${page}&search=${search}`);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// 3 get all vendor pending product
export const GetVendorProductPending = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_view-pending-product_data', page, search],
		() => {
			return http.get(`/view-product/pending?page=${page}&search=${search}`);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// 4 get all vendor rejected product
export const GetVendorProductRejected = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_view-reject-product_data', page, search],
		() => {
			return http.get(`/view-product/rejected?page=${page}&search=${search}`);
		}
	);
	const products = data?.data?.product;
	return { products, refetch, isLoading };
};

// 5 get all vendor product by id
export const GetVendorProductById = (id) => {
	const { data, isLoading, refetch } = useQuery(
		['get_details_admin_view_product_data', id],
		() => {
			return http.get(`/edit-product/${id}`);
		}
	);
	const product = data?.data?.product;
	return { product, isLoading, refetch };
};
