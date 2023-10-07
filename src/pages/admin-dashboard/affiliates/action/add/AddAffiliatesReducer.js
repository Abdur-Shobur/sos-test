import { initialState } from './AddAffiliatesInitialState';
import user_icon from '../../../../../assets/icons/user-icon.webp';

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				image: action.payload,
				url: action.payload ? URL?.createObjectURL(action.payload) : user_icon,
			};
		case 'RESET':
			return {
				...state,
				image: {},
				name: '',
				email: ' ',
				number: ' ',
				password: ' ',
				status: 'pending',
				url: user_icon,
			};

		default:
			return { state };
	}
};
