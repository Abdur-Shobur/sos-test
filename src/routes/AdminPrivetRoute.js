import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { USE_USER } from '../context/UserContext';

function AdminPrivetRoute({ children }) {
	const { loading, authCheck, role } = useContext(USE_USER);

	if (loading && !authCheck) {
		return (
			<div
				style={{ minHeight: '100vh' }}
				className="d-flex justify-content-center align-items-center  "
			>
				<PuffLoader color="#36d7b7" />
			</div>
		);
	}
	if (authCheck && role === 'admin') {
		return children;
	}
	if (!authCheck && role === null) {
		return <Navigate to={'/sign-in'} />;
	}
	return <Navigate to={'/sign-in'} />;
}

export default AdminPrivetRoute;
