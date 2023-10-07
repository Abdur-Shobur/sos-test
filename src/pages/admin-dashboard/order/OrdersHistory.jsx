import React from 'react';
import OrderTable from '../../../components/orderTable/OrderTable';

function OrdersHistory() {
	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1>Orders History</h1>
					<p className="breadcrumbs">
						<span>
							<a href="index.html">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						History
					</p>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<OrderTable />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrdersHistory;
