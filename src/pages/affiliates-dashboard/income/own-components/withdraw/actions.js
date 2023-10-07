export const initialState = {
	// admin_bank_id: null,
	// vendor_bank_number: null,
	// balance: null,
	// transition_id: null,
	// screenshot: null,
	// reference_field: null,

	branch_name: null,
	holder_name: null,
	ac_or_number: null,
	bank_name: null,
	amount: null,
};
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TEXT':
			return {
				...state,
				[action.payload.name]:
					action.payload.value !== '' ? action.payload.value : null,
			};
		case 'API':
			return {
				...state,
				bank_name: action.payload,
			};

		default:
			return state;
	}
};
