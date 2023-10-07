import React, { useContext } from 'react';
import { PuffLoader } from 'react-spinners';
import { UseAuth } from '../auth/AuthContext';
function PrivateRoutes({ children }) {
	const { loading } = useContext(UseAuth);

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

	return children;
}

export default PrivateRoutes;
