import React, { createContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { http } from '../components/action/axiosInstance';
import { getCookie } from '../components/action/actions';

export const UseAuth = createContext();

function AuthContext({ children }) {
	const [role, setRole] = useState(null);
	const [cookie, setCookie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [logoutLoading, setLogOutLoading] = useState(false);
	const logout = () => {
		setLogOutLoading(true);
		http.post(`/logout`).then((res) => {
			if (res.data.status === 200) {
				localStorage.clear();
				swal('Success', res.data.message, 'success');
				setLoading(false);
				setLogOutLoading(false);
				return setRole(null);
			}
			setLogOutLoading(false);
		});
	};

	useEffect(() => {
		// setLoading(true);
		// const get_role_cookie = async () => {
		// 	const cK = await getCookie('userInfo');
		// 	setCookie(cK);
		// 	setRole(cK.role);
		// };
		// get_role_cookie();

		const get_role = () => {
			const r = localStorage.getItem('role');
			setRole(r);
		};
		get_role();
	}, []);

	useEffect(() => {
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
		// 	console.log(cK, 'ck');
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
	}, []);

	console.log(loading, cookie, role);
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
