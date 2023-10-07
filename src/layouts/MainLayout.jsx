import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import TopNavBar from '../components/topNavBar/TopNavBar';
import { useState } from 'react';
import BarLoaders from '../components/loader/BarLoaders';
import { AdminProfileAPI } from '../api/admin/apiAdmin';

function MainLayout() {
	const [sidebar, setSidebar] = useState(true);
	const { user, res } = AdminProfileAPI();

	return (
		<div
			className={`ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light ${
				sidebar ? 'sidebar-minified-out' : 'sidebar-minified'
			}`}
			id="body"
		>
			<div className="wrapper">
				{/* <!-- LEFT MAIN SIDEBAR --> */}
				<Sidebar setSidebar={setSidebar} />

				<div className="ec-page-wrapper">
					{!sidebar && (
						<div
							onClick={() => setSidebar((e) => !e)}
							className="sidebarOverlayMenu"
						></div>
					)}
					{/* <!-- Top Nav Bar --> */}
					<TopNavBar
						from="admin"
						user={user}
						setSidebar={setSidebar}
						res={res}
					/>
					<div className="ec-content-wrapper">
						<React.Suspense fallback={<BarLoaders />}>
							<Outlet />
						</React.Suspense>
					</div>

					<Footer />
				</div>

				{/* footer  */}
			</div>
		</div>
	);
}

export default MainLayout;
