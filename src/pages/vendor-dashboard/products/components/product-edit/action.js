export const initialState = {
	api: {
		category: [],
		subcategory: [],
		brands: [],
		colors: [],
		sizes: [],
	},
	selected: {},
	initial: {
		category_id: null,
		subcategory_id: null,
		brand_id: null,
		name: null,
		short_description: null,
		long_description: null,
		selling_price: null,
		original_price: null,
		qty: null,
		image: null,
		url: null,
		images: [],
		product_images_url: [],
		update_product_images_url: [],
		update_product_images: [],
		meta_title: null,
		meta_keyword: [],
		meta_description: null,
		tags: [],
		discount_type: null,
		discount_rate: null,

		variants: [],
		specifications: [
			// {
			// 	id: null,
			// 	specification: null,
			// 	specification_ans: null,
			// },
		],

		colors: [],
		sizes: [],
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'API':
			return {
				...state,
				initial: {
					...state.initial,
					category_id: action.payload?.category_id,
					subcategory_id: action.payload?.subcategory_id,
					brand_id: action.payload?.brand_id,
					name: action.payload?.name,
					short_description: action.payload?.short_description,
					long_description: action.payload?.long_description,
					selling_price: action.payload?.selling_price,
					original_price: action.payload?.original_price,
					qty: action.payload?.qty,
					image: null,
					url: action?.payload?.image,
					meta_title: action.payload?.meta_title,
					meta_keyword: action.payload?.meta_keyword,
					meta_description: action.payload?.meta_description,
					tags: action?.payload?.tags,
					// tags: JSON?.parse(action?.payload?.tags),
					discount_type: action.payload?.discount_type,
					discount_rate: action.payload?.discount_rate,
					variants: action.payload?.variants
						? action.payload?.variants?.map((v) => ({
								...v,
								color_id: v.color_id || null,
								color_name: v.color_name || null,
								size_id: v.size_id || null,
								size_name: v.size_name || null,
						  }))
						: [],
					specifications: action.payload?.specifications?.map((spec) => ({
						id: spec.id,
						specification: spec.specification,
						specification_ans: spec.specification_ans,
					})),
					colors: action.payload?.colors,
					sizes: action.payload?.sizes,
					product_images_url: action.payload?.product_image?.map((image) => ({
						u: image.image,
						id: image.id,
					})),
				},
			};
		case 'INPUT':
			return {
				...state,
				initial: {
					...state.initial,
					[action.payload.name]: action.payload.value,
				},
			};
		case 'INPUT_subcategory_id':
			return {
				...state,
				initial: {
					...state.initial,
					// [action.payload.name]: action.payload.value,
					subcategory_id: state.api.subcategory[0]?.id
						? state.api.subcategory[0]?.id
						: null,
				},
			};

		case 'GET_UTILITY_API_brands':
			return {
				...state,
				api: {
					...state.api,
					[action.payload.apiName]: action.payload.apiData,
				},
			};
		case 'GET_UTILITY_APIcategory':
			return {
				...state,
				api: {
					...state.api,
					[action.payload.apiName]: action.payload.apiData,
				},
			};
		case 'GET_UTILITY_API_subcategory':
			return {
				...state,
				initial: {
					...state.initial,
					subcategory_id: action.payload.apiData[0]?.id
						? action.payload.apiData[0]?.id
						: null,
				},
				api: {
					...state.api,
					[action.payload.apiName]: action.payload.apiData
						? action.payload.apiData
						: null,
				},
			};
		case 'GET_UTILITY_API_colors':
			return {
				...state,
				api: {
					...state.api,
					[action.payload.apiName]: action.payload.apiData,
				},
			};
		case 'GET_UTILITY_API_sizes':
			return {
				...state,
				api: {
					...state.api,
					[action.payload.apiName]: action.payload.apiData,
				},
			};

		case 'MAIN_FILE':
			return {
				...state,
				initial: {
					...state.initial,
					urlNew: action.payload[0]
						? URL.createObjectURL(action.payload[0])
						: null,
					image: action.payload[0] ? action.payload[0] : null,
				},
			};

		case 'ADD_IMAGE':
			const newImages = Array.from(action.images).map((image, i) => {
				const imageUrl = URL.createObjectURL(image);
				return {
					u: imageUrl,
					id:
						state.initial.update_product_images_url[
							state.initial.update_product_images_url.length - 1
						]?.id +
							i +
							1 || i + 1,
				};
			});
			const newImagesFiles = Array.from(action.images).map((image, i) => {
				// const imageUrl = URL.createObjectURL(image);
				return {
					u: image,
					id:
						state.initial.update_product_images[
							state.initial.update_product_images.length - 1
						]?.id +
							i +
							1 || i + 1,
				};
			});
			return {
				...state,
				initial: {
					...state.initial,
					update_product_images_url: [
						...state.initial.update_product_images_url,
						...newImages,
					],
					update_product_images: [
						...state.initial.update_product_images,
						...newImagesFiles,
					],
					images: [
						...state.initial.update_product_images.map((i) => i.u),
						...action.images,
					],
				},
			};

		case 'DELETE_IMAGE':
			return {
				...state,
				initial: {
					...state.initial,
					update_product_images_url:
						state.initial.update_product_images_url.filter(
							(item) => item.id !== action.id
						),
					update_product_images: state.initial.update_product_images.filter(
						(item) => item.id !== action.id
					),
					images: state.initial.update_product_images
						.filter((item) => item.id !== action.id)
						.map((i) => i.u),
				},
			};

		case 'CREATE_COLOR_SIZE':
			return {
				...state,
				initial: {
					...state.initial,
					variants: [
						...state.initial.variants,
						{
							color_name: action.payload.color_name,
							color_id: action.payload.color_id,
							size_name: action.payload.size_name,
							size_id: action.payload.size_id,
							id:
								parseInt(
									state.initial.variants[state.initial.variants.length - 1]?.id
								) + 1 || 1,
							qty: null,
						},
					],
				},
			};

		// change value
		case 'CHANGE_COLOR_SIZE':
			return {
				...state,
				initial: {
					...state.initial,
					variants: state.initial.variants.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					),
				},
			};

		//  CHANGE_SELECT_COLOR
		case 'CHANGE_ONLY_SELECT_COLOR':
			return {
				...state,
				initial: {
					...state.initial,
					variants: state.initial.variants.map((e) =>
						e.id === action.payload.id
							? {
									...e,
									color_id: action.payload.color_id,
									[action.payload.name]: action.payload.value,
							  }
							: { ...e }
					),
				},
			};
		//  CHANGE_SELECT_SIZE
		case 'CHANGE_ONLY_SELECT_SIZE':
			return {
				...state,
				initial: {
					...state.initial,
					variants: state.initial.variants.map((e) =>
						e.id === action.payload.id
							? {
									...e,
									size_id: action.payload.size_id,
									[action.payload.name]: action.payload.value,
							  }
							: { ...e }
					),
				},
			};

		case 'DELETE_COLOR_SIZE':
			return {
				...state,
				initial: {
					...state.initial,
					variants: state.initial.variants.filter(
						(e) => e.id != action.payload
					),
				},
			};

		case 'SPECIFICATION_CREATE':
			return {
				...state,
				initial: {
					...state.initial,
					specifications: [
						...state.initial.specifications,

						{
							id:
								parseInt(
									state.initial.specifications[
										state.initial.specifications.length - 1
									]?.id
								) + 1 || 1,
							specification: null,
							specification_ans: null,
						},
					],
				},
			};
		case 'SPECIFICATION_TEXT_CHANGE':
			return {
				...state,
				initial: {
					...state.initial,
					specifications: state.initial.specifications.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					),
				},
			};

		case 'DELETE_SPECIFICATIONS':
			return {
				...state,
				initial: {
					...state.initial,
					specifications: state.initial.specifications.filter(
						(e) => e.id != action.payload
					),
				},
			};
		case 'TAGS_CHANGE':
			return {
				...state,
				initial: {
					...state.initial,
					tags: action.payload?.map((e) => e.value),
				},
			};
		case 'TAGS_CHANGE_META':
			return {
				...state,
				initial: {
					...state.initial,
					meta_keyword: action.payload?.map((e) => e.value),
				},
			};

		default:
			return state;
	}
};
