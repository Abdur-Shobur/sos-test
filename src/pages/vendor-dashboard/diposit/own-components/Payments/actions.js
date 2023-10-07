export const initialState = {
	admin_bank_id: null,
	vendor_bank_number: null,
	balance: null,
	transition_id: null,
	screenshot: null,
	reference_field: null,
};
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TEXT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'API':
			return {
				...state,
				admin_bank_id: action.payload,
			};

		default:
			return state;
	}
};
