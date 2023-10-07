import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const GetCategory = (page) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_main_category_data', page],
		() => {
			return http.get(`/view-category?page=${page}`);
		}
	);
	const category_data = data?.data?.category;
	return { category_data, refetch, isLoading };
};

export const GetCategoryById = (id) => {
	const { data: editData, isLoading } = useQuery(
		['get_edit_category_item', id],
		() => {
			return http.get(`/edit-category/${id}`);
		}
	);
	const editableData = editData?.data?.category;
	return { editableData, isLoading };
};

export const GetSubCategory = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_sub_category_data', page, search],
		() => {
			return http.get(`/view-subcategory?page=${page}&search=${search}`);
		}
	);
	const subcategory = data?.data?.subcategory;
	return { subcategory, refetch, isLoading };
};

export const GetCategoryData = () => {
	const { data } = useQuery('fetch_main_category_data', () => {
		return http.get(`/all-category`);
	});
	const category = data?.data?.category.data;
	return { category };
};

export const SubCategoryById = (id) => {
	const { data: sub_category_data, isLoading } = useQuery(
		['fetch_sub_category_edit_data', id],
		() => {
			return http.get(`/edit-subcategory/${id}`);
		}
	);
	const subcategory = sub_category_data?.data?.subcategory;
	return { subcategory, isLoading };
};
