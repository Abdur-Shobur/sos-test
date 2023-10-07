import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				url: URL.createObjectURL(action.payload[0]),
				image: action.payload[0],
			};

		case 'API_DATA':
			return {
				...action.payload,
			};

		default:
			return { state };
	}
};
