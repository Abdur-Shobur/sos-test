import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { UseAuth } from '../auth/AuthContext';
function PrivateRoutes({ children }) {
	const { role, loading, cookie } = useContext(UseAuth);
	const location = useLocation();
	console.log(role, 'Role');
	console.log(cookie, 'cookie');
	console.log(loading, 'loading');
	if (loading) {
		return (
			<div
				style={{ minHeight: '100vh' }}
				className="d-flex justify-content-center align-items-center  "
			>
				<PuffLoader color="#36d7b7" />
			</div>
		);
	}

	if (role === '1' || role === '2' || role === '3' || role === '4')
		return children;

	return (
		<Navigate to={'/sign-in'} state={{ from: location }} replace></Navigate>
	);
}

export default PrivateRoutes;
