export const initialState = {
	bankName: null,
	bankNumber: null,
	accountHolderName: null,
	branchName: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TEXT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		default:
			return state;
	}
};
