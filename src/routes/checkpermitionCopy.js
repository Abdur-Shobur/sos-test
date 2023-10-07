import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { UseAuth } from '../auth/AuthContext';

const CheckPermission = ({ roleID, children }) => {
	const { role } = useContext(UseAuth);

	if (roleID === role) {
		return children;
	}

	localStorage.removeItem('role');
	localStorage.removeItem('token');
	swal('Error', 'You are not authorized to access this page', 'error');

	return <Navigate to="/sign-in" />;
};

export default CheckPermission;
