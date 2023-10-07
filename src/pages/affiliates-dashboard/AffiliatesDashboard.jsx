import React from 'react';
import RatioCard from '../../components/cards/RatioCard';
// import RecentOrders from '../../components/recentOrders/RecentOrders';
import { Helmet } from 'react-helmet';
import {
	GetAffiliateDashboardData,
	GetAffiliateOrderVsRevenueChart,
} from '../../api/affiliate/apiAffiliate';
import { SellsGraph } from '../admin-dashboard/dashboard-components/chart/SellsGraph';
import { Overview } from './dashobard-components/Overview';

function AffiliatesDashboard() {
	const { dashboard, isLoading } = GetAffiliateDashboardData();
	const { chartData, isLoading: chartIsLoading } =
		GetAffiliateOrderVsRevenueChart();
	return (
		<>
			<Helmet>
				<title>Dashboard-SOS</title>
			</Helmet>
			<div className="content">
				{/* <!-- Top Statistics --> */}
				<div className="row">
					<RatioCard
						count={dashboard?.active_orders || '0'}
						title="Active Orders"
						icon="mdi mdi-package-variant"
						isLoading={isLoading}
					/>
					<RatioCard
						count={dashboard?.active_product || '0'}
						title="Active Product"
						isLoading={isLoading}
						icon="mdi mdi-package-variant"
					/>
					<RatioCard
						count={dashboard?.requested_product || '0'}
						title="Requested Product"
						isLoading={isLoading}
						icon="mdi mdi-package-variant"
					/>
					<RatioCard
						count={`৳${dashboard?.today_earning}` || '00'}
						title="Today Earning"
						isLoading={isLoading}
						icon="mdi mdi-currency-usd"
					/>
				</div>

				<div className="row">
					<div className="col-xl-8 col-md-12 p-b-15">
						{/* <!-- Sales Graph --> */}
						<SellsGraph
							chartData={chartData}
							chartIsLoading={chartIsLoading}
							is="commission"
						/>
					</div>
					<div className="col-xl-4 col-md-12 p-b-15">
						{/* <!-- Doughnut Chart --> */}
						<Overview dashboard={dashboard} isLoading={isLoading} />
					</div>
				</div>
			</div>
		</>
	);
}

export default AffiliatesDashboard;
