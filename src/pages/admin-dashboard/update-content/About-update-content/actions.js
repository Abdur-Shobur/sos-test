export const initialState = {
	vision_image_one: null,
	vision_image_one_url: null,
	vision_image_two: null,
	vision_image_two_url: null,
	vision_image_three: null,
	vision_image_three_url: null,
	mission_image: null,
	mission_image_url: null,
	about_banner_image: null,
	about_banner_image_url: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value.trim(),
			};
		case 'FILE_WITH_NAME':
			return {
				...state,
				[action.payload.url]: action.payload.value
					? URL.createObjectURL(action.payload.value)
					: null,
				[action.payload.name]: action.payload.value
					? action.payload.value
					: null,
			};

		default:
			return state;
	}
};
