import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SELECT_VALUE':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		default:
			return { state };
	}
};
