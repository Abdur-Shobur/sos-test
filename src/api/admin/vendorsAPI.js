import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

// 1 get all vendor
export const VendorsAll = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_vendor_all_list', page, search],
		() => {
			return http.get(`/vendor/view/all?page=${page}&email=${search}`);
		}
	);

	const vendors = data?.data?.vendor;
	return { vendors, refetch, isLoading };
};

// 2 get single vendor by id
export const VendorsByID = (id) => {
	const { data, isLoading } = useQuery(['edit_vendor_list_data', id], () => {
		return http.get(`/edit-vendor/${id}`);
	});
	const edit_vendor = data?.data?.vendor;
	return { edit_vendor, isLoading };
};

// 3 get  active vendors by id
export const GetActiveVendors = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_active_vendor_list', page, search],
		() => {
			return http.get(`/vendor/view/active?page=${page}&email=${search}`);
		}
	);

	const vendors = data?.data?.vendor;
	return { vendors, isLoading, refetch };
};

// 4 get   pending vendors
export const GetPendingVendors = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_pending_vendor_list', page, search],
		() => {
			return http.get(`/vendor/view/pending?page=${page}&email=${search}`);
		}
	);
	const vendors = data?.data?.vendor;
	return { vendors, isLoading, refetch };
};
