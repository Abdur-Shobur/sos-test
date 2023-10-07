export const initialState = {
	data: {
		subject: null,
		support_box_category_id: '',
		support_problem_topic_id: null,
		description: null,
		file: {},
	},
	apiResponse: {
		subject: null,
		support_box_category_id: null,
		support_problem_topic_id: null,
		description: null,
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'CATEGORY_SELECT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
					support_problem_topic_id: null,
				},
				apiResponse: {
					...state.apiResponse,
					[action.payload.name]: null,
				},
			};
		case 'VALIDATION_ERROR':
			return {
				...state,
				apiResponse: {
					...state.apiResponse,
					...action.payload,
				},
			};
		case 'FILE':
			return {
				...state,
				data: {
					...state.data,
					file: action.payload,
				},
			};
		case 'RESET':
			return initialState;
		default:
			return state;
	}
};
