import { useQuery } from 'react-query';
import { http } from './axiosInstance';

// get brand
export const BrandData = () => {
	const { data, isLoading: brandsIsLoading } = useQuery(
		'get_all_brands_in_vendor',
		() => {
			return http.get(`/vendor-brands`);
		}
	);
	const brands = data?.data?.brands?.data;
	return { brands, brandsIsLoading };
};

// get all category
export const Category = () => {
	const { data, isLoading: isLoadingCategory } = useQuery(
		'get_all_category_in_vendor',
		() => {
			return http.get(`/vendor-all-category`);
		}
	);
	const category = data?.data?.category;
	return { category, isLoadingCategory };
};

// get all sub category
export const SubCategory = (payload) => {
	const { data, isLoadingSubCategory } = useQuery(
		['sub_category_by_main_category', payload],
		() => {
			return http.get(`/vendor-category-subcategory/${payload}`);
		}
	);
	const subCategory = data?.data?.message;
	return { subCategory, isLoadingSubCategory };
};

// get color
export const Color = () => {
	const { data, isLoadingColor } = useQuery('fetch_vendor_color_data', () => {
		return http.get(`/view-color/active`);
	});
	const colors = data?.data?.color;
	return { colors, isLoadingColor };
};

// get size
export const Size = () => {
	const { data, isLoadingSize } = useQuery('fetch_vendor_size_data', () => {
		return http.get(`/view-size/active`);
	});
	const sizes = data?.data?.size;

	return { sizes, isLoadingSize };
};

export const EditProductById = (id) => {
	const { data, isLoading, refetch } = useQuery(
		['vendor_single_edit_product_data', id],
		() => {
			return http.get(`/vendor-edit-product/${id}`);
		}
	);
	const editProduct = data?.data?.product;
	return { editProduct, isLoading, refetch };
};
