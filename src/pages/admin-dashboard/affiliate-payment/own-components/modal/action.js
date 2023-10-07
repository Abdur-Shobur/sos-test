export const initialState = {
	admin_bank_name: null,
	admin_transition_id: null,
	admin_screenshot: null,
	status: 'success',
	checked: false,
};
export const reducer = (state = initialState, action) => {
	const type = action.type;
	switch (type) {
		case 'INPUT':
			return { ...state, [action.payload.name]: action.payload.value };
		case 'API':
			return { ...state, admin_bank_name: action.payload.value };

		default:
			return state;
	}
};
