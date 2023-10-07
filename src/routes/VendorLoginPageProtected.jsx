import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { USE_USER } from '../context/UserContext';

function VendorLoginPageProtected({ children }) {
	const { loading, setLoading, VendorAuthCheck } = useContext(USE_USER);

	if (!VendorAuthCheck) {
		return children;
	}
	return <Navigate to={`/vendors-dashboard`} />;
}

export default VendorLoginPageProtected;
