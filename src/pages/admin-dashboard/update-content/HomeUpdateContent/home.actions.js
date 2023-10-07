export const initialState = {
	org_one_photo: null,
	org_one_photo_url: null,

	org_photo: null,
	org_photo_url: null,

	chose_card_one_icon: null,
	chose_card_two_icon: null,
	chose_card_three_icon: null,
	chose_card_four_icon: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value.trim(),
			};
		case 'FILE_WITH_NAME':
			return {
				...state,
				[action.payload.url]: action.payload.value
					? URL.createObjectURL(action.payload.value)
					: null,
				[action.payload.name]: action.payload.value
					? action.payload.value
					: null,
			};

		default:
			return state;
	}
};
