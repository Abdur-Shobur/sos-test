import { useEffect } from 'react';

export const useCustomEffect = (
	colors,
	sizes,
	brands,
	category,
	subcategory,
	dispatch,
	editProduct
) => {
	useEffect(() => {
		dispatch({
			type: 'GET_UTILITY_API_brands',
			payload: {
				apiName: 'brands',
				apiData: brands,
			},
		});
	}, [brands]);

	useEffect(() => {
		dispatch({
			type: 'GET_UTILITY_APIcategory',
			payload: {
				apiName: 'category',
				apiData: category,
			},
		});
	}, [dispatch, category]);

	useEffect(() => {
		dispatch({
			type: 'GET_UTILITY_API_subcategory',
			payload: {
				apiName: 'subcategory',
				apiData: subcategory,
			},
		});
	}, [subcategory]);

	useEffect(() => {
		dispatch({
			type: 'GET_UTILITY_API_colors',
			payload: {
				apiName: 'colors',
				apiData: colors,
			},
		});
	}, [colors]);

	useEffect(() => {
		dispatch({
			type: 'GET_UTILITY_API_sizes',
			payload: {
				apiName: 'sizes',
				apiData: sizes,
			},
		});
	}, [sizes]);
};
