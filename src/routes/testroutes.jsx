import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin-dashboard/AdminDashboard';
import SignIn from '../pages/sign-in/SignIn';

export const Routes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/login'} element={<SignIn />} />
				<Route
					path={'/'}
					element={
						// <RequireAuth loginPath={'/login'}>
						// </RequireAuth>
						<AdminDashboard />
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
