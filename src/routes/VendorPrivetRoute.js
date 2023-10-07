import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';

import { USE_USER } from '../context/UserContext';

function VendorPrivetRoute({ children }) {
	const { loading, setLoading, VendorAuthCheck, role } = useContext(USE_USER);

	if (loading & !VendorAuthCheck) {
		return (
			<div
				style={{ minHeight: '100vh' }}
				className="d-flex justify-content-center align-items-center  "
			>
				<PuffLoader color="#36d7b7" />
			</div>
		);
	}
	if (VendorAuthCheck & (role === 'vendor')) {
		return children;
	}
	return <Navigate to={'/vendors/sign-in'} />;
}

export default VendorPrivetRoute;
