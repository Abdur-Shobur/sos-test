export const MyApiFun = (initialState) => {
	const reducer = (state = initialState, action) => {
		switch (action.type) {
			case 'GET_DATA_FROM_API':
				return {
					...state,
					selected: action.payload.selected,
					apiDataColor: action.payload.apiDataColor,
					apiDataSize: action.payload.apiDataSize,
				};
			// crete fields
			case 'CREATE':
				return {
					...state,
					selected: [
						...state.selected,
						{
							color_name: action.payload.color_name,
							color_id: action.payload.color_id,
							size_name: action.payload.size_name,
							size_id: action.payload.size_id,
							id: state.selected[state.selected.length - 1]?.id + 1 || 1,
							qty: null,
						},
					],
				};

			//  CHANGE_SELECT_COLOR
			case 'CHANGE_SELECT_COLOR':
				return {
					...state,
					selected: state.selected.map((e) =>
						e.id === action.payload.id
							? {
									...e,
									color_id: action.payload.color_id,
									[action.payload.name]: action.payload.value,
							  }
							: { ...e }
					),
				};
			//  CHANGE_SELECT_SIZE
			case 'CHANGE_SELECT_SIZE':
				return {
					...state,
					selected: state.selected.map((e) =>
						e.id === action.payload.id
							? {
									...e,
									size_id: action.payload.size_id,
									[action.payload.name]: action.payload.value,
							  }
							: { ...e }
					),
				};

			// change value
			case 'CHANGE_VALUE':
				return {
					...state,
					selected: state.selected.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					),
				};

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
	return { reducer };
};
