// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';

// import { USE_USER } from '../context/UserContext';

// function NewAdminPrivet({ children }) {
// 	const { loading, setLoading, authCheck } = useContext(USE_USER);

// 	if (loading & !authCheck) {
// 		return <h1>Loading</h1>;
// 	}
// 	if (authCheck) {
// 		setLoading(false);
// 		return children;
// 	}
// 	return <Navigate to={'/sign-in'} />;
// }

// export default NewAdminPrivet;
