import React from 'react';
import RatioCard from '../../components/cards/RatioCard';
import RecentOrders from './dashboard-components/recent-orders/RecentOrders';
// import NewCustomers from '../../components/newCustomers/NewCustomers';
// import TopProducts from '../../components/topProducts/TopProducts';
import {
	GetAdminDashboardData,
	GetAdminOrderVsRevenueChart,
	GetAdminRecentOrders10,
	GetCategoryByStatic,
} from '../../api/admin/apiAdmin';
import { SellsGraph } from './dashboard-components/chart/SellsGraph';
import { OrderOverview } from './dashboard-components/chart/OrderOverview';
import CategoryStatics from './dashboard-components/category-statics/CategoryStatics';
// import ChartComponent from './dashboard-components/Chart';

function AdminDashboard() {
	const { dashboard, isLoading } = GetAdminDashboardData();
	const { chartData, isLoading: chartIsLoading } =
		GetAdminOrderVsRevenueChart();
	const {
		recentOrders,
		refetch,
		isLoading: recentOrderLoading,
	} = GetAdminRecentOrders10();
	const { categoryStatus, isLoading: CategoryStaticsLoading } =
		GetCategoryByStatic();
	console.log(categoryStatus);

	return (
		<>
			<div className="content">
				{/* <!-- Top Statistics --> */}

				<div className="row">
					<RatioCard
						count={dashboard?.active_vendor ? dashboard?.active_vendor : '0'}
						title="Active Vendor"
						icon="mdi mdi-account-clock"
						isLoading={isLoading}
					/>
					<RatioCard
						count={dashboard?.active_afi ? dashboard?.active_afi : '0'}
						title="Active Affiliator"
						icon="mdi mdi-account-clock"
						isLoading={isLoading}
					/>
					<RatioCard
						count={dashboard?.today_order ? dashboard?.today_order : '0'}
						title="Today Order"
						isLoading={isLoading}
						icon="mdi mdi-package-variant"
					/>
					<RatioCard
						count={
							dashboard?.today_revenue ? `৳${dashboard?.today_revenue}` : '৳0'
						}
						title="Today Revenue"
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
						{/* <!-- Doughnut Chart --> */}
						<OrderOverview dashboard={dashboard} isLoading={isLoading} />
					</div>
				</div>

				<div className="row">
					<div className="col-12 p-b-15">
						<CategoryStatics
							categoryStatus={categoryStatus}
							isLoading={CategoryStaticsLoading}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 p-b-15">
						<RecentOrders
							recentOrders={recentOrders}
							refetch={refetch}
							isLoading={recentOrderLoading}
						/>
					</div>
				</div>

				{/* <div className="row">
					<div className="col-xl-5">
						<!-- New Customers -->
						<NewCustomers />
					</div>

					<div className="col-xl-7">
						<!-- Top Products -->
						<TopProducts />
					</div>
				</div> */}
			</div>
		</>
	);
}

export default AdminDashboard;
