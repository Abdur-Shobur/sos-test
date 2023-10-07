import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import TopNavBar from '../components/topNavBar/TopNavBar';
import { useState } from 'react';
import VendorSidebar from '../components/sidebar/VendorSidebar';
import BarLoaders from '../components/loader/BarLoaders';
import UserSidebar from '../components/sidebar/UserSidebar';
import { UserProfileAPI } from '../api/user';

function UserLayout() {
	const [sidebar, setSidebar] = useState(true);
	const { user, res } = UserProfileAPI();
	return (
		<div
			className={`ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light ${
				sidebar ? 'sidebar-minified-out' : 'sidebar-minified'
			}`}
			id="body"
		>
			<div className="wrapper">
				{/* <!-- LEFT MAIN SIDEBAR --> */}
				<UserSidebar setSidebar={setSidebar} />
				{!sidebar && (
					<div
						onClick={() => setSidebar((e) => !e)}
						className="sidebarOverlayMenu"
					></div>
				)}

				<div className="ec-page-wrapper">
					{/* <!-- Top Nav Bar --> */}
					<TopNavBar
						setSidebar={setSidebar}
						from={'user'}
						user={user}
						res={res}
					/>
					<div className="ec-content-wrapper">
						<React.Suspense fallback={<BarLoaders />}>
							<Outlet />
						</React.Suspense>
					</div>

					<Footer />
				</div>
			</div>
		</div>
	);
}

export default UserLayout;
