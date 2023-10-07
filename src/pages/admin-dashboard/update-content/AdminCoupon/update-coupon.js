export const initialState = {
	data: {
		name: '',
		amount: '',
		commission: '',
		expire_date: '',
		limitation: '',
		user_id: '',
		status: '',
		expire_date_view: new Date(),
	},
	apiRes: {
		amount: null,
		commission: null,
		limitation: null,
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
		case 'INPUT_NUMBER':
			const stringToNumber = action?.payload?.value;
			return {
				...state,
				data: {
					...state.data,
					[action?.payload?.name]: isNaN(stringToNumber)
						? null
						: parseInt(stringToNumber),
				},

				apiRes: {
					...state.apiRes,
					[action?.payload?.name]: isNaN(stringToNumber)
						? 'Must be a number'
						: null,
				},
			};

		case 'API_DATA':
			// Input date string
			// const inputDateString = '2023-09-07 18:00:00';
			const inputDateString = action.payload?.expire_date;

			// Parse the input date string
			const inputDateParts = inputDateString.split(' ');
			const datePart = inputDateParts[0];
			const timePart = inputDateParts[1];
			const [year, month, day] = datePart.split('-');
			const [hour, minute, second] = timePart.split(':');

			// Create a Date object in UTC
			const outputDate = new Date(
				Date.UTC(year, month - 1, day - 1, hour, minute, second)
			);

			// Format the date in the desired output format
			const outputDateString = outputDate.toISOString();

			return {
				data: {
					...action?.payload,
					expire_date_view: outputDateString,
				},
				apiRes: {
					amount: null,
					commission: null,
					limitation: null,
				},
			};
		case 'DATE_FORMATE':
			const inputDate = new Date(action.payload.value);

			// Extract year, month, day, hour, minute, and second components
			const year2 = inputDate.getUTCFullYear();
			const month2 = String(inputDate.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with leading zeros
			const day2 = String(inputDate.getUTCDate() + 1).padStart(2, '0');
			const hour2 = String(inputDate.getUTCHours()).padStart(2, '0');
			const minute2 = String(inputDate.getUTCMinutes()).padStart(2, '0');
			const second2 = String(inputDate.getUTCSeconds()).padStart(2, '0');

			// Create the desired output date string
			const outputDateString2 = `${year2}-${month2}-${day2} ${hour2}:${minute2}:${second2}`;

			return {
				...state,
				data: {
					...state.data,
					[action.payload.name]:
						outputDateString2.split('-')[0] === '1970'
							? null
							: outputDateString2,
					[action.payload.viewDate]: action.payload.value,
				},
				apiRes: {
					...state.apiRes,
					[action.payload.name]:
						outputDateString2.split('-')[0] === '1970'
							? 'Date is Required'
							: null,
				},
			};
		case 'RESET':
			return {
				data: {
					name: '',
					amount: '',
					commission: '',
					limitation: '',
					user_id: '',
					expire_date: '',
					status: '',
				},
				apiRes: {
					amount: null,
					commission: null,
					limitation: null,
				},
			};
		default:
			return state;
	}
};
