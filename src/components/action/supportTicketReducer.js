export const initialState = {
	id: 1,
	description: '',
	support_box_id: '',
	file: {},
	url: '',
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value.trim(),
			};
		case 'DELETE_URL':
			return {
				...state,
				file: '',
				url: '',
			};
		case 'FILE':
			return {
				...state,
				file: action.payload,
				url: action.payload ? URL?.createObjectURL(action.payload) : '',
			};

		case 'CLEAR':
			return {
				...state,
				file: '',
				url: '',
				description: '',
			};
		case 'API':
			return {
				...state,
				support_box_id: action.payload,
			};
		default:
			return state;
	}
};
