import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { USE_USER } from '../context/UserContext';

function AdminLoginPageProtected({ children }) {
	const { loading, setLoading, authCheck, role } = useContext(USE_USER);

	if (!authCheck) {
		return children;
	}
	return <Navigate to={`/`} />;
}

export default AdminLoginPageProtected;
