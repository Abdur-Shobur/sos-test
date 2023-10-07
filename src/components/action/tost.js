import { toast } from 'react-toastify';

const tost = (payload, autoClose = 300) => {
	return toast(payload, {
		position: 'top-right',
		autoClose: autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
export default tost;
