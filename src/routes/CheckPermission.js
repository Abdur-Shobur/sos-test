import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UseAuth } from '../auth/AuthContext';

const CheckPermission = ({ roleID, children }) => {
	const { role, loading } = useContext(UseAuth);
	console.log(loading, 'role permission loading');
	console.log(role, 'role permission role');

	if (roleID === role) {
		return children;
	}

	// return children;

	localStorage.removeItem('role');
	localStorage.removeItem('token');

	return <Navigate to="/sign-in" />;
};

export default CheckPermission;
