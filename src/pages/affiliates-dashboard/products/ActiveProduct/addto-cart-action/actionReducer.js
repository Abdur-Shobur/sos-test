export const initialStateAction = {
	mainData: [],
	uniqueColor: [],
	findSize: [],
	selectedData: [],
	qty: null,
	totalQty: null,
};
export const reducerAction = (state = initialStateAction, action) => {
	const type = action.type;
	switch (type) {
		case 'API':
			const uniqueColorNames = [];
			const colorMap = {};
			action.payload.forEach((item) => {
				const { color_name, color_id, id } = item;
				if (!colorMap[color_name]) {
					colorMap[color_name] = true;
					uniqueColorNames.push({ color_name, color_id, id });
				}
			});

			return {
				...state,
				mainData: action.payload?.filter((e) => e.qty != null && e.qty != 0),
				uniqueColor: uniqueColorNames,
				selectedData: [
					{
						id: null,
						color: null,
						color_id: null,
						size: null,
						size_id: null,
						qty: null,
						preQty: null,
						sizes: [],
						uniqueID:
							parseInt(state.uniqueColor[state.uniqueColor.length - 1]?.id) +
								1 || 1,
					},
				],
			};

		case 'SELECT_COLOR_ID':
			const id = action.payload.id;
			const color_id = action.payload.color_id;
			const getUniqueID = action.payload.uniqueID;

			let firstData;

			firstData = {
				id,
				color: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				)[0].color_name,
				color_id,
				size: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				)[0].size_name,
				size_id: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				)[0].size_id,
				preQty: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				)[0].qty,
				sizes: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				),
			};

			return {
				...state,
				findSize: state.mainData.filter(
					(e) => e.color_id == action.payload.color_id
				),
				qty: null,
				selectedData: state.selectedData.map((e) =>
					e.uniqueID == getUniqueID ? { ...e, ...firstData } : e
				),
			};

		case 'SELECT_SIZE_ID':
			const uniqueID = action.payload.uniqueID;
			const mainId = action.payload.id;
			const sizeInfo = state.mainData
				.filter((e) => e.id == mainId)
				.map((x) => ({
					id: x.id,
					preQty: x.qty,
					size_id: x.size_id,
					size: x.size_name,
				}));

			return {
				...state,
				selectedData: state.selectedData.map((e) =>
					e.uniqueID == uniqueID
						? {
								...e,
								...sizeInfo[0],
						  }
						: e
				),
				sizeInfo,
			};

		case 'CREATE_NEW++':
			return {
				...state,
				selectedData: [
					...state.selectedData,
					{
						id: '',
						color: null,
						color_id: null,
						size: null,
						size_id: null,
						qty: null,
						preQty: null,
						sizes: [],
						uniqueID:
							parseInt(
								state.selectedData[state.selectedData.length - 1]?.uniqueID
							) + 1 || 1,
					},
				],
			};

		case 'UPDATE_QTY':
			return {
				...state,
				selectedData: state.selectedData.map((e) =>
					e.uniqueID === action.payload.uniqueID
						? { ...e, qty: action.payload.value }
						: e
				),
			};

		case 'CHANGE_ONLY_QTY':
			return {
				...state,
				selectedData: [{ qty: action.payload }],
			};

		case 'DELETE_SELECTED':
			return {
				...state,
				selectedData: state.selectedData.filter(
					(e) => e.uniqueID !== action.payload
				),
			};

		default:
			return state;
	}
};
