export const initialState = {};
export const editReducer = (state = initialState, action) => {
	if (action.type === 'INPUT') {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	} else if (action.type === 'GET_API') {
		return {
			...action.payload,
		};
	}
};
