import React from 'react';
import RecentOrdersRow from './RecentOrdersRow';
import TableBodyLoading from '../../../../components/loader/TableBodyLoading';
import { NoDataFound } from '../../../../components/table/TableComponents';

function RecentOrders({ recentOrders, refetch, isLoading }) {
	return (
		<div
			className="card card-table-border-none card-default recent-orders"
			id="recent-orders"
		>
			<div className="card-header justify-content-between">
				<h2>Recent Orders</h2>
			</div>
			<div className="card-body pt-0 pb-5">
				<div className="table-responsive">
					<table className="table" style={{ width: '100%' }}>
						<thead>
							<tr>
								<th>Sr.</th>
								<th>Product</th>
								<th>Name</th>
								<th>Vendor Name</th>
								<th>Affiliate Name</th>
								<th>Price</th>
								<th>Commission</th>
								<th>Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						{isLoading ? (
							<TableBodyLoading />
						) : (
							<tbody style={{ verticalAlign: 'middle' }}>
								{recentOrders?.length > 0 ? (
									recentOrders?.map((o, i) => (
										<RecentOrdersRow
											i={i}
											key={o.id}
											data={o}
											refetch={refetch}
										/>
									))
								) : (
									<NoDataFound />
								)}
							</tbody>
						)}
					</table>
				</div>
			</div>
		</div>
	);
}

export default RecentOrders;
