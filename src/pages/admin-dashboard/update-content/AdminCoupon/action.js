// initialState
export const initialState = {
	data: {
		name: null,
		amount: null,
		commission: null,
		expire_date: null,
		expire_date_view: new Date(),
		limitation: null,
		user_id: null,
	},
	required: {
		name: true,
		amount: true,
		commission: true,
		expire_date: true,
		limitation: true,
		user_id: true,
	},
	apiRes: {
		name: null,
		amount: null,
		commission: null,
		expire_date: null,
		limitation: null,
		user_id: null,
	},
};

// reducer
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				required: {
					...state.required,
					[action.payload.name]: action.payload.value.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};
		case 'INPUT_NUMBER':
			const stringToNumber = parseInt(action?.payload?.value);
			return {
				...state,
				data: {
					...state.data,
					[action?.payload?.name]: isNaN(stringToNumber)
						? null
						: stringToNumber,
				},
				required: {
					...state.required,
					[action?.payload?.name]: action?.payload?.value.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action?.payload?.name]: isNaN(stringToNumber)
						? 'Must be a number of input field'
						: null,
				},
			};
		case 'input':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]: action.payload.value,
				},
				required: {
					...state.required,
					[action.payload.name]: action.payload.value.trim() ? false : true,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]: null,
				},
			};
		case 'DATE_FORMATE':
			// var originalDate = new Date(action.payload.value);

			// Desired format: 20-11-2020
			// var day = originalDate.getDate().toString().padStart(2, '0');
			// var month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
			// var year = originalDate.getFullYear().toString();
			// var formattedDate = day + '-' + month + '-' + year;

			// Input date string
			// const inputDateString = "2023-09-10T05:55:06.000000Z";
			// const inputDateString = new Date(action.payload.value);

			// Create a Date object from the input string
			const inputDate = new Date(action.payload.value);

			// Extract year, month, day, hour, minute, and second components
			const year = inputDate.getUTCFullYear();
			console.log(inputDate.getUTCHours());
			const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with leading zeros
			const day = String(inputDate.getUTCDate() + 1).padStart(2, '0');
			const hour = String(inputDate.getUTCHours()).padStart(2, '0');
			const minute = String(inputDate.getUTCMinutes()).padStart(2, '0');
			const second = String(inputDate.getUTCSeconds()).padStart(2, '0');

			// Create the desired output date string
			const outputDateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]:
						outputDateString.split('-')[0] === '1970' ? null : outputDateString,
					[action.payload.viewDate]: action.payload.value,
				},
				required: {
					...state.apiRes,
					[action.payload.name]:
						outputDateString.split('-')[0] === '1970'
							? 'Date is Required'
							: null,
				},
			};
		case 'API_DATA':
			return {
				...state,
				data: {
					...action.payload,
					user_id: action?.payload?.id,
				},
			};
		case 'RES_VALIDATION': {
			return {
				...state,
				apiRes: action.payload,
			};
		}
		default:
			return state;
	}
};
