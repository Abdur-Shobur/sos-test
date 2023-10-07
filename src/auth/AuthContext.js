import React, { createContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { http } from '../components/action/axiosInstance';
import { getCookie, removeCookie } from '../components/action/actions';
import { DOMAIN_URL, LIVE_LINK } from '../components/env';

export const UseAuth = createContext();

function AuthContext({ children }) {
	const [role, setRole] = useState(null);
	const [cookie, setCookie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [logoutLoading, setLogOutLoading] = useState(false);

	const logout = () => {
		setLogOutLoading(true);
		http.post(`/logout`).then((res) => {
			if (res.data.status === 200) {
				localStorage.clear();
				removeCookie('userInfo', DOMAIN_URL);
				removeCookie('user_info', DOMAIN_URL);
				swal('Success', res.data.message, 'success');
				setLoading(false);
				setLogOutLoading(false);
				setRole(null);
				return (window.location.href = `${LIVE_LINK}`);
			}
			setLogOutLoading(false);
		});
	};

	useEffect(() => {
		const get_role_cookie = async () => {
			setLoading(true);
			const cK = await getCookie('userInfo');
			// const user_info = await getCookie('user_info');
			// setuser_info(user_info);
			if (cK) {
				setCookie(cK);
				setRole(cK.role);
				setLoading(false);
			} else {
				setCookie(null);
				setRole(null);
				setLoading(false);
			}
		};
		get_role_cookie();

		// const get_role = () => {
		// 	const r = localStorage.getItem('role');
		// 	setRole(r);
		// };
		// get_role();
	}, []);

	// useEffect(() => {
	// const getingCookie = async () => {
	// 	try {
	// 		const get = getCookie2('user_info');
	// 		const decoded = await jwt_decode(get);
	// 		setCookie(decoded);
	// 	} catch (error) {
	// 	}
	// };
	// getingCookie();
	// const unsubscribe = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const cK = await getCookie('userInfo');
	// 		setCookie(cK);
	// 		setRole(cK.role);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		setLoading(false);
	// 	}
	// };
	// return () => {
	// 	unsubscribe();
	// };
	// const get_role_cookie = () => {
	// 	const cK = getCookie('userInfo');
	// 	setLoading(true);
	// 	if (cK) {
	// 		setCookie(cK);
	// 		setRole(cK.role);
	// 	} else {
	// 		setCookie(null);
	// 		setRole(null);
	// 	}
	// 	setLoading(false);
	// };
	// get_role_cookie();
	// }, []);
	const value = {
		setRole,
		loading,
		setLoading,
		logout,
		logoutLoading,
		cookie,
		role,
	};

	return <UseAuth.Provider value={value}>{children}</UseAuth.Provider>;
}

export default AuthContext;
