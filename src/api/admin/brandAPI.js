import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const GetBrands = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_brand_all_items', page, search],
		() => {
			return http.get(`/view-brand?page=${page}&search=${search}`);
		}
	);
	const brands = data?.data?.brand;
	return { brands, refetch, isLoading };
};

export const GetBrandsById = (id) => {
	const { data: editData, isLoading } = useQuery(
		['get_edit_brand_item', id],
		() => {
			return http.get(`/edit-brand/${id}`);
		}
	);
	const editableData = editData?.data?.category;
	return { editableData, isLoading };
};
