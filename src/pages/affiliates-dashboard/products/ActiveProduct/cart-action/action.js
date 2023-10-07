export const initialState = {
	data: [],
	totalQty: null,
};
export const reducer = (state = initialState, action) => {
	const type = action.type;
	switch (type) {
		case 'API':
			return {
				...state,
				data: action?.payload?.map((item) => ({
					id: item.id,
					preQty: item.qty,
					qty: null,
					color: item.color_name,
					size: item.size_name,
				})),
			};
		case 'CHANGE_ONLY_QTY':
			return {
				...state,
				data: [{ qty: action.payload }],
				totalQty: action.payload,
			};
		case 'CHANGE_QTY':
			return {
				...state,
				data: state.data.map((e) =>
					e.id === action.payload.id
						? { ...e, [action.payload.name]: action.payload.value }
						: { ...e }
				),
				totalQty: state.data
					.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					)
					?.filter((e) => e.qty !== null)
					?.map((e) => parseInt(e.qty))
					?.reduce((pre, cur) => pre + cur, 0),
			};

		default:
			break;
	}
};
