export const initialState = {
	name: null,
	number: null,
	account_holder_name: null,
	branch_name: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TEXT':
			return {
				...state,
				[action.payload.name]:
					action.payload.value === '' || action.payload.value === null
						? null
						: action.payload.value,
			};

		default:
			return state;
	}
};
