export const initialState = {
	logo: null,
	logo_url: null,
	footer_image: null,
	footer_image_url: null,
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
