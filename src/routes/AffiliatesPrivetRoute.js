// import React from 'react';

// import { Navigate, useLocation } from 'react-router-dom';
// function AffiliatesPrivetRoute({ children }) {
// 	const location = useLocation();
// 	const auth = useAuthUser();
// 	const user = auth();

// 	if (user?.role === 'affiliator') {
// 		return children;
// 	}
// 	return (
// 		<Navigate to="/affiliates/sign-in" state={{ from: location }} replace />
// 	);
// }

// export default AffiliatesPrivetRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';

import { USE_USER } from '../context/UserContext';

function AffiliatesPrivetRoute({ children }) {
	const { loading, setLoading, AffiliateAuthCheck, role } =
		useContext(USE_USER);

	if (loading & !AffiliateAuthCheck) {
		return (
			<div
				style={{ minHeight: '100vh' }}
				className="d-flex justify-content-center align-items-center  "
			>
				<PuffLoader color="#36d7b7" />
			</div>
		);
	}
	if (AffiliateAuthCheck & (role === 'affiliator')) {
		return children;
	}
	return <Navigate to={'/affiliates/sign-in'} />;
}

export default AffiliatesPrivetRoute;
