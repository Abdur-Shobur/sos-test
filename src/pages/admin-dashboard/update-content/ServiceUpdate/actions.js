export const initialState = {
	service_banner_description: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value.trim(),
			};

		default:
			return state;
	}
};
