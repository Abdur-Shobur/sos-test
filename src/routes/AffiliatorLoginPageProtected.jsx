import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { USE_USER } from '../context/UserContext';

function AffiliatorLoginPageProtected({ children }) {
	const { AffiliateAuthCheck } = useContext(USE_USER);

	if (!AffiliateAuthCheck) {
		return children;
	}
	return <Navigate to={`/affiliates-dashboard`} />;
}

export default AffiliatorLoginPageProtected;
