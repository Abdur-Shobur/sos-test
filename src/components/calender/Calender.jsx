import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
	const [value, onChange] = useState(new Date());

	return (
		<div>
			<DatePicker onChange={onChange} value={value} className="" />
		</div>
	);
}

export default MyCalendar;
