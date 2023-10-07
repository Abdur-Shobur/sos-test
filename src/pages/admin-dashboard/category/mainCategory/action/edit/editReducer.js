export const initialState = {};
export const reducer = (state, action) => {
	if (action.type === 'INPUT') {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	} else if (action.type === 'FILE') {
		return {
			...state,
			image: action.payload,
		};
	} else if (action.type === 'API_DATA') {
		return {
			...action.payload,
		};
	}
};
