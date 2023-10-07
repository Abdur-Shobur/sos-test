export const initialState = {
	campaign_objective: '',
	user_id: '',
	campaign_name: '',
	conversion_location: '',
	performance_goal: '',
	platforms: '',
	budget_amount: '',
	start_date: '',
	start_date_view: new Date(),
	end_date: '',
	end_date_view: new Date(),
	age: '',
	gender: 'male',
	detail_targeting: '',
	country: 0,
	city: '',
	device: '',
	platform: '',
	inventory: '',
	format: '',
	primary_text: '',
	media: '',
	heading: '',
	description: '',
	call_to_action: '',
	destination: '',
	tracking: '',
	url_perimeter: '',
	number: '',
	last_description: '',
	status: 'pending',
	deleted_at: '',
	created_at: '',
	updated_at: '',
	location_files: null,
	advertise_audience_files: null,
	advertise_audience_files_url: [],
	location_files_url: [],
	place_id: 0,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'API':
			function getTime(e = '20-11-2020') {
				// Input date string
				const inputDateString = e;

				// Parse the input date string into a Date object
				const parts = inputDateString?.split('-');
				const year = parseInt(parts[2], 10);
				const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
				const day = parseInt(parts[0], 10);

				const dateObj = new Date(year, month, day);

				// Define an array of weekday names
				const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

				// Get the day of the week and month name
				const dayOfWeek = weekdays[dateObj.getUTCDay()];
				const monthName = dateObj.toLocaleString('en-US', { month: 'short' });

				// Format the output date string
				const formattedDateString = `${dayOfWeek} ${monthName} ${dateObj.getUTCDate()} ${dateObj.getUTCFullYear()} 00:00:00 GMT+0600 (Bangladesh Standard Time)`;

				return formattedDateString;
			}

			return {
				...action.payload,
				end_date_view: getTime(action?.payload?.end_date),
				start_date_view: getTime(action?.payload?.start_date),
			};
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'COUNTRY_SELECT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
				place_id: action.payload.place_id,
			};
		case 'DATE_FORMATE':
			var originalDate = new Date(action.payload.value);

			// Desired format: 20-11-2020
			var day1 = originalDate.getDate().toString().padStart(2, '0');
			var month1 = (originalDate.getMonth() + 1).toString().padStart(2, '0');
			var year1 = originalDate.getFullYear().toString();
			var formattedDate = day1 + '-' + month1 + '-' + year1;

			return {
				...state,
				[action.payload.name]: formattedDate,
				[action.payload.viewDate]: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				// url: action.payload ? URL.createObjectURL(action.payload) : 'preview',
				// photo: action.payload,
				location_files: action.payload,
			};
		case 'MULTI_FILE':
			let imgFile = [];
			let imgUrl = [];
			for (let i = 0; i < action.payload.value.length; i++) {
				imgFile.push(action.payload.value[i]);
				imgUrl.push(URL.createObjectURL(action.payload.value[i]));
			}
			return {
				...state,
				[action.payload.name]: imgFile,
				[action.payload.url]: imgUrl,
			};
		default:
			return { state };
	}
};
