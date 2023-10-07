import userIcon from '../../../../../assets/icons/user-icon.webp';

export const initialState = {
	name: null,
	number: null,
	number2: null,
	email: null,
	old_password: null,
	new_password: null,
	confirm_password: null,
	image: null,
	url: userIcon,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TEXT':
			return {
				...state,
				[action.payload.name]:
					action.payload.value === '' || undefined || null
						? null
						: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				image: action.payload,
				url: action.payload ? URL?.createObjectURL(action.payload) : userIcon,
			};
		case 'API_DATA':
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
