export const initialState = {
	data: {
		email: null,
		password: null,
	},
	error: {
		email: false,
		password: false,
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value
						? action.payload.value.trim()
						: null,
				},
				error: {
					...state.error,
					[action.payload.name]:
						action.payload.value === null || action.payload.value === ''
							? true
							: false,
				},
			};

		case 'RESET':
			return initialState;

		default:
			return state;
	}
};
