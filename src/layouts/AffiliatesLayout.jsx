import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import AffiliatesSidebar from '../components/sidebar/AffiliatesSidebar';
import TopNavBar from '../components/topNavBar/TopNavBar';
import BarLoaders from '../components/loader/BarLoaders';
import { AffiliateProfileAPI } from '../api/affiliate/apiAffiliate';

function AffiliatesLayout() {
	const [sidebar, setSidebar] = useState(true);
	const { user, res } = AffiliateProfileAPI();

	return (
		<div
			className={`ec-header-fixed ec-sidebar-fixed ec-sidebar-light ec-header-light ${
				sidebar ? 'sidebar-minified-out' : 'sidebar-minified'
			}`}
			id="body"
		>
			<div className="wrapper">
				{/* <!-- LEFT MAIN SIDEBAR --> */}
				<AffiliatesSidebar setSidebar={setSidebar} />
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
						from={'affiliate'}
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

export default AffiliatesLayout;
