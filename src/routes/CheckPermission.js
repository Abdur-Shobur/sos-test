import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UseAuth } from '../auth/AuthContext';
import { LIVE_LINK, TEST } from '../components/env';

const CheckPermission = ({ roleID, children }) => {
	const { role } = useContext(UseAuth);
	const navigate = useNavigate();

	if (roleID === role) {
		return children;
	}
	if (role) {
		if (role === '1') {
			return <Navigate to={`/`} replace={true} />;
		} else if (role === '2') {
			return <Navigate to={`/vendors-dashboard`} replace={true} />;
		} else if (role === '3') {
			return <Navigate to={`/affiliates-dashboard`} replace={true} />;
		} else {
			return <Navigate to={`/user-dashboard`} replace={true} />;
		}
	}

	if (TEST !== 'ok') {
		return children;
	}
	// (window.location.href = `${LIVE_LINK}/login`);
	return navigate(`${LIVE_LINK}/login`);
};

export default CheckPermission;
