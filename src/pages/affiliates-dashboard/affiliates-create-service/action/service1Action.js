import preview from '../../../../assets/img/products/vender-upload-thumb-preview.jpg';

export const initialState1 = {
	data: {
		service_category_id: null,
		service_sub_category_id: null,
		title: null,
		tags: [],
		description: null,
		contract: null,
		image: {},
		image_url: '',
		commission: null,
		commission_type: 'flat',
		images: [],
		images_url: [],
		categoryAndSubData: [],
		subCategoryData: [],
	},
	required: {
		service_category_id: true,
		service_sub_category_id: true,
		title: true,
		tags: true,
		description: true,
		contract: true,
		image: true,
		commission: true,
		images: true,
	},
	apiRes: {
		service_category_id: null,
		service_sub_category_id: null,
		title: null,
		tags: null,
		description: null,
		contract: null,
		image: null,
		commission: null,
		commission_type: null,
		images: null,
	},
};

export const reducer1 = (state = initialState1, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				required: {
					...state.required,
					[action.payload.name]: action?.payload?.value?.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};
		case 'CATEGORY_DISPATCH':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
					service_sub_category_id: null,
				},
				required: {
					...state.required,
					[action.payload.name]: action?.payload?.value?.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};
		case 'API_DATA':
			let subCategoryData = action?.payload?.map(
				(e) => e?.servicesub_categories
			);
			return {
				...state,
				data: {
					...state.data,
					categoryAndSubData: action?.payload,
					subCategoryData: []?.concat(...subCategoryData),
				},
			};

		case 'RES_VALIDATION': {
			return {
				...state,
				apiRes: action.payload,
			};
		}

		case 'FILE':
			return {
				...state,
				data: {
					...state.data,
					url: action.payload ? URL.createObjectURL(action.payload) : preview,
					image: action.payload,
				},
				required: {
					...state.required,
					image: false,
				},
				apiRes: {
					...state.apiRes,
					image: null,
				},
			};
		case 'MULTI_FILE':
			let imgFile = [];
			let imgUrl = [];
			for (let i = 0; i < action.payload.value.length; i++) {
				imgFile.push(action.payload.value[i]);
				imgUrl.push(URL.createObjectURL(action.payload.value[i]));
			}
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: imgFile,
					[action.payload.url]: imgUrl,
				},
				required: {
					...state.required,
					images: false,
				},
				apiRes: {
					...state.apiRes,
					images: null,
				},
			};
		case 'FILE_WITH_NAME':
			return {
				...state,
				[action.payload.url]: action.payload.value
					? URL.createObjectURL(action.payload.value)
					: '',
				[action.payload.name]: action.payload.value,
			};
		case 'META_KEY':
			return {
				...state,
				data: {
					...state.data,
					tags: action?.payload?.map((e) => e.value),
				},
				required: {
					...state.required,
					tags: false,
				},
				apiRes: {
					...state.apiRes,
					tags: null,
				},
			};
		default:
			return state;
	}
};
