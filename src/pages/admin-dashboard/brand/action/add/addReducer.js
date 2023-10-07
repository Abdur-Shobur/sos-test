import { initialState } from './initialState';
import preview from '../../../../../assets/img/products/vender-upload-thumb-preview.jpg';

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
				url: action.payload[0]
					? URL.createObjectURL(action.payload[0])
					: preview,
				image: action.payload[0],
			};

		case 'API_DATA':
			return {
				...action.payload,
			};

		default:
			return { state };
	}
};
