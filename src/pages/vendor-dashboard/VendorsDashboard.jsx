import React, { useEffect } from 'react';
import RatioCard from '../../components/cards/RatioCard';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import {
	GetVendorDashboardData,
	GetVendorOrderVsRevenueChart,
	GetVendorTopSellingProduct,
} from '../../api/vendor/apiVendor';
import { SellsGraph } from '../admin-dashboard/dashboard-components/chart/SellsGraph';
import { Overview } from './dashboard-components/Overview';
import RecentOrders from './dashboard-components/RecentOrders/RecentOrders';

function VendorsDashboard() {
	const { dashboard, isLoading } = GetVendorDashboardData();
	const { chartData, isLoading: chartIsLoading } =
		GetVendorOrderVsRevenueChart();
	const { product, isLoading: toProductLoading } = GetVendorTopSellingProduct();
	console.log(product);
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<>
			<Helmet>
				<title>Vendor Dashboard-SOS</title>
			</Helmet>
			<div className="content">
				{/* <!-- Top Statistics --> */}
				<div className="row">
					<RatioCard
						count={dashboard?.active_order || '0'}
						title="Active Order"
						icon="mdi mdi-package-variant"
						isLoading={isLoading}
					/>
					<RatioCard
						count={dashboard?.pending_order || '0'}
						title="Pending Order"
						isLoading={isLoading}
						icon="mdi mdi-package-variant"
					/>
					<RatioCard
						count={dashboard?.tody_order || '0'}
						title="Today Order"
						isLoading={isLoading}
						icon="mdi mdi-package-variant"
					/>
					<RatioCard
						count={`৳${dashboard?.today_sell}` || '00'}
						title="Today Sell"
						isLoading={isLoading}
						icon="mdi mdi-currency-usd"
					/>
				</div>

				<div className="row">
					<div className="col-xl-8 col-md-12 p-b-15">
						{/* <!-- Sales Graph --> */}
						<SellsGraph chartData={chartData} chartIsLoading={chartIsLoading} />
					</div>
					<div className="col-xl-4 col-md-12 p-b-15">
						<Overview dashboard={dashboard} isLoading={isLoading} />
					</div>
					<div className="row">
						<div className="col-12 p-b-15">
							<RecentOrders product={product} isLoading={toProductLoading} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default VendorsDashboard;
