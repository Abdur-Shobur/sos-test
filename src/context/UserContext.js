// import { createContext, useEffect, useState } from 'react';
// import swal from 'sweetalert';
// import { http } from '../components/action/axiosInstance';

// export const USE_USER = createContext();

// function UserContext({ children }) {
// 	// get user
// 	const [authCheck, setAuthCheck] = useState(false);
// 	const [VendorAuthCheck, setVendorAuthCheck] = useState(false);
// 	const [AffiliateAuthCheck, setAffiliateAuthCheck] = useState(false);
// 	const [loading, setLoading] = useState(true);
// 	const [role, setRole] = useState(null);

// 	useEffect(() => {
// 		const get_role = localStorage.getItem('role');
// 		setRole(get_role);
// 	}, []);

// 	const Logout = () => {
// 		http.post(`/logout`).then((res) => {
// 			if (res.data.status === 200) {
// 				localStorage.removeItem('auth_token');
// 				localStorage.removeItem('auth_name');
// 				localStorage.removeItem('role');
// 				swal('Success', res.data.message, 'success');
// 				setLoading(false);
// 				return setRole(null);
// 			}
// 		});
// 	};

// 	const VendorFun = async () => {
// 		try {
// 			const res = await http.get('/checkingAuthenticatedVendor');

// 			if (res.data) {
// 				setRole('vendor');
// 				setLoading(false);
// 				setVendorAuthCheck(true);
// 			}
// 		} catch (error) {
// 			if (error) {
// 				setRole(null);
// 				setVendorAuthCheck(false);
// 				setLoading(false);
// 				localStorage.removeItem('auth_token');
// 				localStorage.removeItem('auth_name');
// 				localStorage.removeItem('role');
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		if (role === 'admin') {
// 			const AdminFun = async () => {
// 				try {
// 					const res = await http.get('/checkingAuthenticated');

// 					if (res.data) {
// 						setRole('admin');
// 						setLoading(false);
// 						setAuthCheck(true);
// 					}
// 				} catch (error) {
// 					if (error) {
// 						setRole(null);
// 						setAuthCheck(false);
// 						setLoading(false);
// 						localStorage.removeItem('auth_token');
// 						localStorage.removeItem('auth_name');
// 						localStorage.removeItem('role');
// 					}
// 				}
// 			};
// 			AdminFun();
// 		} else if (role === 'vendor') {
// 			const VendorFun = async () => {
// 				try {
// 					const res = await http.get('/checkingAuthenticatedVendor');

// 					if (res.data) {
// 						setRole('vendor');
// 						setLoading(false);
// 						setVendorAuthCheck(true);
// 					}
// 				} catch (error) {
// 					if (error) {
// 						setRole(null);
// 						setVendorAuthCheck(false);
// 						setLoading(false);
// 						localStorage.removeItem('auth_token');
// 						localStorage.removeItem('auth_name');
// 						localStorage.removeItem('role');
// 					}
// 				}
// 			};
// 			VendorFun();
// 		} else if (role === 'affiliator') {
// 			setRole('affiliator');
// 			setLoading(false);
// 			setAffiliateAuthCheck(true);
// 		}
// 	}, []);

// 	const value = {
// 		loading,
// 		setLoading,
// 		authCheck,
// 		Logout,
// 		setAuthCheck,
// 		role,
// 		setRole,
// 		VendorAuthCheck,
// 		setVendorAuthCheck,
// 		AffiliateAuthCheck,
// 		setAffiliateAuthCheck,
// 	};
// 	return <USE_USER.Provider value={value}>{children}</USE_USER.Provider>;
// }

// export default UserContext;
