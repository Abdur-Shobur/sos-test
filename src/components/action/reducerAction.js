// this reducer did not used every where
import view from '../../assets/img/products/vender-upload-thumb-preview.jpg';
export const reducer = (state, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				url: action.payload[0] ? URL.createObjectURL(action.payload[0]) : view,
				image: action.payload[0],
			};
		// case 'MULTI_FILE_IMAGE':
		// 	return {
		// 		...state,
		// 		multi_url: [...state.multi_url, action.payload?.map((e) => e.files[0])],
		// 		multi_url: action.payload.map((e) => [...e, URL.createObjectURL(e)]),
		// 		images: action.payload.map((e) => [...e, e]),
		// 	};
		case 'API_DATA':
			return {
				...action.payload,
			};
		case 'COLOR':
			return {
				...state,
				code: action.payload,
			};
		case 'TAGS':
			return {
				...state,
				tags: action.payload?.map((e) => e.value),
			};
		case 'META_KEY':
			return {
				...state,
				meta_keyword: action.payload?.map((e) => e.value),
			};
		case 'CATEGORY':
			return {
				...state,
				category_id:
					action.payload.name === 'category_id' ? action.payload.value : null,
				subcategory_id:
					action.payload.name === 'subcategory_id'
						? action.payload.value
						: null,
			};
		case 'product_size':
			return {
				...state,
				sizes: action.payload?.map((e) => e.id),
			};
		case 'product_color':
			return {
				...state,
				colors: action.payload?.map((e) => e.id),
			};
		case 'product_color_edit':
			return {
				...state,
				colors: action.payload,
			};

		default:
			return { state };
	}
};
