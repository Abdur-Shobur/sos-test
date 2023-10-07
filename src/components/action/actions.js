import swal from 'sweetalert';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import preview from '../../assets/img/products/vender-upload-thumb-preview.jpg';

// count word
// countWord(word,countNumber)
export const countWord = (payload = '', count = 10) => {
	if (payload?.length >= count) {
		return `${payload?.slice(0, count)}...`;
	} else {
		return payload;
	}
};

// show date time
// time(time).date
// time(time).dateTime
// time(time).time
export const time = (payload) => {
	const localTime = new Date(payload).toLocaleString();
	const mainDate = localTime.split(',')[0];
	const mainTime = localTime.split(',')[1];
	const dateTime = localTime;

	let lastYer1 = mainDate.split('/')[2].split('')[2];
	let lastYer2 = mainDate.split('/')[2].split('')[3];
	let year = lastYer1.concat(lastYer2);

	let dayAndMonth = mainDate.split('/');
	let day = dayAndMonth[1] + '/';
	let mon = dayAndMonth[0];
	let dayAndMon = day.concat(mon);

	const date = dayAndMon + '/' + year;
	// const date = mainDate;

	const splitTime = mainTime.split(' ');
	const AmPm = splitTime[2];
	const timeSplit = splitTime[1].split(':');
	const hr = timeSplit[0];
	const min = timeSplit[1];

	const time = hr + ':'.concat(min) + ' ' + AmPm;

	return { date, time, dateTime };
};

export const timeConvert = (e) => {
	// Input date and time in ISO 8601 format
	const isoDateTime = e;

	// Parse the ISO date and time
	const parsedDateTime = new Date(isoDateTime);

	// Convert to the desired format
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};

	const formattedDateTime = parsedDateTime.toLocaleString('en-US', options);

	return formattedDateTime;
	// 9/13/2023, 8:18 PM
};

export const timeToCovertCurrentTime = (e) => {
	// Input date and time in ISO 8601 format
	const isoDateTime = e;

	// Parse the ISO date and time
	const parsedDateTime = new Date(isoDateTime);

	// Calculate the time difference in milliseconds
	const currentTime = new Date();
	const timeDifference = currentTime - parsedDateTime;

	// Define time intervals
	const minute = 60 * 1000;
	const hour = 60 * minute;
	const day = 24 * hour;
	const month = 30 * day; // Approximate
	const year = 365 * day; // Approximate

	// Function to format the time difference
	function formatRelativeTime(timeDifference) {
		if (timeDifference < minute) {
			// return Math.floor(timeDifference / 1000) + ' sec ago';
			return 'just now';
		} else if (timeDifference < hour) {
			return Math.floor(timeDifference / minute) + ' min';
		} else if (timeDifference < day) {
			return Math.floor(timeDifference / hour) + ' hr';
		} else if (timeDifference < month) {
			return Math.floor(timeDifference / day) + ' days';
		} else if (timeDifference < year) {
			return Math.floor(timeDifference / month) + ' months';
		} else {
			return Math.floor(timeDifference / year) + ' years';
		}
	}

	// Format the relative time
	const relativeTime = formatRelativeTime(timeDifference);

	return relativeTime;
};

// show alert
// alert(title,text)
export const alert = (title, text) => {
	return swal(title, text);
};

// photo view
//  photView(image)
export const photoView = (payload, title = 'View Image') => {
	const url = `${process.env.REACT_APP_IMG_URL}/${payload}`;
	if (payload) {
		return swal({
			title: title,
			content: {
				element: 'img',
				attributes: {
					src: url,
					alt: 'Image',
					class: 'w-100',
				},
			},
		});
	}
	swal(title, 'No Screenshot Provided');
};

// download Image
// downloadImage(image)
export const downloadImage = (payload) => {
	const url = `${process.env.REACT_APP_IMG_URL}/${payload}`;
	return saveAs(url, 'image.jpg');
};
export const codeRender = (html) => {
	const element = document.createElement('div');
	element.innerHTML = html;
	return element.innerText;
};

export const handlerMenubar = (id, menu, dispatch) => {
	if (id === menu) {
		return dispatch(false);
	}
	dispatch(id);
};
export const handleSubMenubar = (e) => {
	e.stopPropagation();
};

// copy to clip board
// const {copy_data, set_copy_data, copied, click_button_handler}=CopyClipboardHandler()
export function CopyClipboardHandler() {
	const [copied, setCopied] = useState(false);
	const [copy_data, set_copy_data] = useState('');

	const click_button_handler = (e) => {
		set_copy_data(e);
		navigator.clipboard.writeText(e);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return { copy_data, set_copy_data, copied, click_button_handler };
}

export const StatusAllUpDown = () => {
	const [upDown, setUpDown] = useState(null);
	const arrowHandler = (e) => {
		if (e === null) {
			setUpDown(true);
		} else if (e === true) {
			setUpDown(false);
		} else {
			setUpDown(null);
		}
	};
	return { upDown, arrowHandler };
};

export const ImagePreview = (img) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks

	if (!img) return preview;

	const urlPath = img?.split(':')[0];

	switch (urlPath) {
		case 'blob':
			return img;

		case 'https':
			return img;
		default:
			return `${process.env.REACT_APP_IMG_URL}/${img}`;
		// 		function checkImageLoad(imgUrl, img, preview) {
		// 			return new Promise((resolve, reject) => {
		// 				const IMG = new Image();
		// 				IMG.src = `${imgUrl}/${img}`;

		// 				IMG.onload = () => {
		// 					resolve(`${imgUrl}/${img}`);
		// 				};

		// 				IMG.onerror = () => {
		// 					reject(preview);
		// 				};
		// 			});
		// 		}

		// 		// Usage example
		// 		const imgUrl = process.env.REACT_APP_IMG_URL;
		// 		const imgPath = img;
		// 		const previewImg = preview;

		// 		checkImageLoad(imgUrl, imgPath, previewImg)
		// 			.then((imageUrl) => {})
		// 			.catch((preview) => {});
		// }
	}
};

export const removeNullAndDelete_urlObj = (obj) => {
	const newObj = {};

	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '' && !key.includes('_url')) {
			newObj[key] = obj[key];
		}
	}

	return newObj;
};

export function getCookie(name) {
	const cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		if (cookie[0] === name) {
			return JSON.parse(cookie[1]);
		}
	}
	return null;
}

export function removeCookie(name, domain) {
	const pastDate = new Date(0);
	const expires = 'expires=' + pastDate.toUTCString();
	document.cookie = name + '=;' + expires + `;path=/;domain=${domain}`;
}

export function getCookie2(name) {
	const cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const [cookieName, cookieValue] = cookie.split('=');

		if (cookieName === name) {
			// Decode the cookie value if needed
			return decodeURIComponent(cookieValue);
		}
	}
	return null; // Cookie not found
}
