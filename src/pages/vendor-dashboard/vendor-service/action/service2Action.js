export const initialState2 = {
	data: {
		package_title__1: null,
		package_title__2: null,
		package_title__3: null,

		price__1: null,
		price__2: null,
		price__3: null,

		times__1: null,
		times__2: null,
		times__3: null,

		revision_max_time__1: null,
		revision_max_time__2: null,
		revision_max_time__3: null,

		package_description__1: null,
		package_description__2: null,
		package_description__3: null,
	},
	required: {
		package_title__1: true,
		package_title__2: true,
		package_title__3: true,

		price__1: true,
		price__2: true,
		price__3: true,

		times__1: true,
		times__2: true,
		times__3: true,

		revision_max_time__1: true,
		revision_max_time__2: true,
		revision_max_time__3: true,

		package_description__1: true,
		package_description__2: true,
		package_description__3: true,
	},
	apiRes: {
		package_title: null,
		time: null,
		revision_max_time: null,
		price: null,
		package_description: null,
	},
};

export const reducer2 = (state = initialState2, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action?.payload?.value.trim()
						? action?.payload?.value.trim()
						: null,
				},
				error: {
					...state.error,
					[action.payload.name]: action?.payload?.value?.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name.split('__')[0]]: null,
				},
			};
		case 'API_DATA':
			return {
				...state,
				data: {
					...state.data,
					subCategoryData: action?.payload,
				},
			};
		case 'package_description':
			return {
				...state,
				data: {
					...state.data,
					package_description: [
						action?.payload.package_description1,
						action?.payload.package_description2,
						action?.payload.package_description3,
					],
				},
			};
		case 'FILE':
			return {
				...state,
				data: {
					...state.data,
					url: action.payload ? URL.createObjectURL(action.payload) : '',
					image: action.payload,
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
					tags: action.payload?.map((e) => e.value),
				},
				error: {
					...state.error,
					tags: false,
				},
			};
		case 'RES_VALIDATION':
			return {
				...state,
				apiRes: action.payload,
			};
		default:
			return state;
	}
};
