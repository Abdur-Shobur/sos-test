import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
	if (action.type === 'INPUT') {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	} else if (action.type === 'CATEGORY_ID') {
		return {
			...state,
			category_id: action.payload,
		};
	} else if (action.type === 'CLEAR') {
		return {
			...state,
			name: '',
			status: 'pending',
			category_id: action.payload,
		};
	}
};
