import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import TopNavBar from '../components/topNavBar/TopNavBar';
import { useState } from 'react';
import VendorSidebar from '../components/sidebar/VendorSidebar';
import BarLoaders from '../components/loader/BarLoaders';
import { VendorProfileAPI } from '../api/vendor/apiVendor';

function VendorLayout() {
	const [sidebar, setSidebar] = useState(true);
	const { user, res } = VendorProfileAPI();
	return (
		<div
			className={`ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light ${
				sidebar ? 'sidebar-minified-out' : 'sidebar-minified'
			}`}
			id="body"
		>
			<div className="wrapper">
				{/* <!-- LEFT MAIN SIDEBAR --> */}
				<VendorSidebar setSidebar={setSidebar} />
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
						from={'vendor'}
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

				{/* footer  */}
			</div>
		</div>
	);
}

export default VendorLayout;
