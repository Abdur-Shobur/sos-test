import { toast } from 'react-toastify';

export const Use_sign_in = (res) => {
	localStorage.setItem('token', res.data.token);
	localStorage.setItem('role', res.data.role);
	return toast(`Login Success ${res.data.username}`, {
		position: 'top-right',
		autoClose: 300,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
