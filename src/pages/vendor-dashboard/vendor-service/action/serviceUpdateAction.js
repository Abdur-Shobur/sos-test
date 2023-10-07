export const initialState = {
	data: {
		categoryAndSubData: [],
		subCategoryData: [],
		id: null,
		user_id: null,
		service_category_id: null,
		service_sub_category_id: null,
		rating: null,
		title: null,
		description: null,
		tags: null,
		contract: null,
		status: null,
		commission: null,
		commission_type: null,
		image: null,
		image_path: null,
		images: null,
		created_at: null,
		updated_at: null,
		deleted_at: null,
		image_file: null,
		image_file_url: null,
		images_update: [],
		images_url: [],
		servicepackages: [],
		serviceimages: [],
		packages: {
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
	},
	apiRes: {
		service_category_id: null,
		service_sub_category_id: null,
		title: null,
		description: null,
		tags: null,
		contract: null,
		commission: null,
		commission_type: null,
		time: null,
		package_title: null,
		package_description: null,
		price: null,
		revision_max_time: null,
	},
};
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};

		case 'API_DATA':
			let pack = action.payload?.servicepackages;
			return {
				...state,
				data: {
					...state.data,
					...action.payload,
					image_path: action.payload?.image,
					packages: {
						package_title__1: pack?.[0].package_title || null,
						package_title__2: pack?.[1].package_title || null,
						package_title__3: pack?.[2].package_title || null,

						price__1: pack?.[0].price || null,
						price__2: pack?.[1].price || null,
						price__3: pack?.[2].price || null,

						times__1: pack?.[0].time || null,
						times__2: pack?.[1].time || null,
						times__3: pack?.[2].time || null,

						revision_max_time__1: pack?.[0].revision_max_time || null,
						revision_max_time__2: pack?.[1].revision_max_time || null,
						revision_max_time__3: pack?.[2].revision_max_time || null,

						package_description__1: pack?.[0].package_description || null,
						package_description__2: pack?.[1].package_description || null,
						package_description__3: pack?.[2].package_description || null,
					},
				},
			};

		case 'PACKAGE_UPDATE':
			return {
				...state,
				data: {
					...state.data,
					packages: {
						...state.data.packages,
						[action.payload.name]: action.payload.value,
					},
				},
			};

		case 'UPDATE_PACKAGE':
			return {
				...state,
				data: {
					...state.data,
					packages: {
						...state.data.packages,
						[action.payload.name]: action.payload.value,
					},
				},
			};

		case 'CATEGORY_DISPATCH_API':
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

		case 'CATEGORY_DISPATCH':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
					service_sub_category_id: null,
				},

				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};

		case 'TAGS_CHANGE_META':
			return {
				...state,
				data: {
					...state.data,
					tags: action.payload?.map((e) => e.value),
				},
			};

		case 'API_RESPONSE':
			return {
				...state,
				apiRes: action.payload,
			};

		case 'test_api':
			return {
				...state,
				data: action.payload,
			};
		case 'MULTI_FILE':
			let imgFile = [];
			let imgUrl = [];
			for (let i = 0; i < action.payload.value.length; i++) {
				imgFile.push({
					id: i,
					file: action.payload.value[i],
				});
				imgUrl.push({
					id: i,
					url: URL.createObjectURL(action.payload.value[i]),
				});
			}
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: imgFile ? imgFile : [],
					[action.payload.url]: imgUrl ? imgUrl : [],
				},
				apiRes: {
					...state.apiRes,
					images: null,
				},
			};
		case 'DELETE_MULTI_IMAGE':
			return {
				...state,
				data: {
					...state.data,
					images_url: state.data.images_url.filter(
						(e) => e.id !== action.payload
					),
					images_update: state.data.images_update.filter(
						(e) => e.id !== action.payload
					),
				},
			};
		case 'FILE_WITH_NAME':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value
						? action.payload.value
						: null,
					[action.payload.url]: action.payload.value
						? URL.createObjectURL(action.payload.value)
						: '',
				},
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};
