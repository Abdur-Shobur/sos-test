import user_icon from '../../../../../../assets/icons/user-icon.webp';

export const categoryReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return {
			...state,
			[action.payload.name]: action.payload.value,
		};
	} else if (action.type === 'FILE') {
		return {
			...state,
			image: action.payload,
			url: action.payload ? URL?.createObjectURL(action.payload) : user_icon,
		};
	}
};
