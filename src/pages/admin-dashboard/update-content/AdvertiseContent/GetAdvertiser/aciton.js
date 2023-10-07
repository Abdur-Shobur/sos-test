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
	advertise_audience_files: [],
	advertise_audience_files_url: [],
	location_files_url: [],
	place_id: 0,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
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
			var day = originalDate.getDate().toString().padStart(2, '0');
			var month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
			var year = originalDate.getFullYear().toString();
			var formattedDate = day + '-' + month + '-' + year;

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
