export const initialState = {
	data: {
		subscription_amount: null,
		card_time: null,
		card_heading: null,
		card_feature_title: null,
		card_facilities_title: [
			{
				id: 1,
				name: '',
				value: '',
			},
		],
	},

	apiRes: {
		card_symbol_icon: null,
		subscription_amount: null,
		card_time: null,
		card_heading: null,
		card_feature_title: null,
		card_facilities_title: null,
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

				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};
		case 'CREATE':
			return {
				...state,
				data: {
					...state.data,
					card_facilities_title: [
						...state?.data?.card_facilities_title,
						{
							id:
								state?.data?.card_facilities_title[
									state?.data?.card_facilities_title.length - 1
								]?.id + 1 || 1,
							key: 'no',
							value: '',
						},
					],
				},
			};

		// change text
		case 'CHANGE_TEXT':
			return {
				...state,
				data: {
					...state.data,
					card_facilities_title: state?.data?.card_facilities_title.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					),
				},
			};

		// delete card_facilities_title
		case 'DELETE':
			return {
				...state,
				data: {
					...state.data,
					card_facilities_title: state?.data?.card_facilities_title.filter(
						(e) => e.id !== action.payload
					),
				},
			};
		case 'API_DATA':
			return {
				...state,
				data: {
					...action.payload,
					// card_facilities_title: action.payload.card_facilities_title.map(e),
				},
			};
		case 'VALIDATION_ERROR':
			return {
				...state,
				apiRes: action.payload,
			};
		default:
			return state;
	}
};

export const updateFacility = {
	data: {
		affiliate_request: null,
		product_qty: null,
		service_qty: null,

		subscription_id: null,

		service_create: null,
		product_approve: null,
		product_request: null,
	},
	apiRes: {},
};

export const updateFacilityReducer = (state = updateFacility, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},

				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};

		case 'API_DATA':
			return {
				...state,
				data: {
					affiliate_request: action.payload.affiliate_request
						? action.payload.affiliate_request
						: null,
					product_qty: action.payload.product_qty
						? action.payload.product_qty
						: null,
					service_qty: action.payload.service_qty
						? action.payload.service_qty
						: null,

					subscription_id: action.payload.subscription_id
						? action.payload.subscription_id
						: null,

					service_create: action.payload.service_create
						? action.payload.service_create
						: null,
					product_approve: action.payload.product_approve
						? action.payload.product_approve
						: null,
					product_request: action.payload.product_request
						? action.payload.product_request
						: null,
				},
			};
		case 'VALIDATION_ERROR':
			return {
				...state,
				apiRes: action.payload,
			};
		default:
			return state;
	}
};
