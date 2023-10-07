// initial state
export const initialState = {
	InitialItems: {
		id: 1,
		name: null,
		phone: null,
		email: null,
		city: null,
		address: null,
		vendor_id: null,
		product_id: null,
		variants: [],
	},
	selected: [],
	apiData: {},
};
// all logic
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE':
			return {
				...state,
				InitialItems: {
					id: 1,
					name: null,
					phone: null,
					email: null,
					city: null,
					address: null,
					vendor_id: state.apiData.vendor_id,
					product_id: state.apiData.product_id,
					cart_id: state.apiData.id,
					amount: state.apiData.amount,
					variants: [],
				},
				selected: [...state.selected, action.payload],
			};
		// change text
		case 'TEXT':
			return {
				...state,
				InitialItems: {
					...state.InitialItems,
					[action.payload.name]: action.payload.value,
				},
			};

		// variant Data
		case 'VARIANT':
			// Check if variant with the same ID already exists in the variants array
			const existingVariantIndex = state.InitialItems.variants.findIndex(
				(v) => v.id === action.payload.id
			);
			if (existingVariantIndex !== -1) {
				// If the variant exists, update its values
				const updatedVariants = state.InitialItems.variants.map((v, index) => {
					if (index === existingVariantIndex) {
						return {
							...v,
							qty: action.payload.value,
							size: action.payload.size,
							color: action.payload.color,
							variant_id: action.payload.variant_id,
						};
					} else {
						return v;
					}
				});
				return {
					...state,
					InitialItems: {
						...state.InitialItems,
						variants: updatedVariants,
					},
				};
			} else {
				// If the variant doesn't exist, add a new object with a unique ID
				const newVariant = {
					id: action.payload.id,
					qty: action.payload.value,
					size: action.payload.size,
					color: action.payload.color,
					variant_id: action.payload.variant_id,
				};
				return {
					...state,
					InitialItems: {
						...state.InitialItems,
						variants: [...state.InitialItems.variants, newVariant],
					},
				};
			}
		// Api Data
		case 'API_DATA':
			return {
				...state,
				apiData: action.payload.api,
				InitialItems: {
					...state.InitialItems,
					product_id: action.payload.product_id,
					vendor_id: action.payload.vendor_id,
					cart_id: action.payload.cart_id,
					amount: action.payload.amount,
				},
			};
		// Clear fiels
		case 'ClEAR':
			return {};

		// delete fields
		case 'DELETE':
			return {
				...state,
				selected: state.selected.filter((e) => e.id !== action.payload),
			};

		default:
			return {
				state,
			};
	}
};
