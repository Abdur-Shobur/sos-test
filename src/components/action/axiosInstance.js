import axios from 'axios';
import { getCookie } from './actions';

export const http = axios.create({
	baseURL: process.env.REACT_APP_LOCAL_URL,
	headers: { 'X-Requested-With': 'XMLHttpRequest' },
	withCredentials: true,
});
http.interceptors.request.use(function (config) {
	const cK = getCookie('userInfo');

	const token = localStorage.getItem('token');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export const multipartConfig = {
	headers: {
		'content-type': 'multipart/form-data',
	},
};
