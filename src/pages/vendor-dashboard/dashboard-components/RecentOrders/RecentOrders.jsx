import React from 'react';
import VendorProductSlider from '../../../../components/slider/VendorProductSlider';

function RecentOrders({ product, isLoading }) {
	return (
		<div
			className="card card-table-border-none card-default recent-orders"
			id="recent-orders"
		>
			<div className="card-header justify-content-between">
				<h2>Top Ten Selling Products</h2>
			</div>
			<div className="card-body p-5">
				{isLoading ? (
					'loading'
				) : product?.length > 0 ? (
					<VendorProductSlider product={product} />
				) : (
					<div
						style={{
							display: 'block',
							textAlign: 'center',
							// position: 'absolute',
							width: '100%',
							marginTop: '20px',
						}}
						className="alert alert-light  "
						role="alert"
					>
						No Data Found
					</div>
				)}
			</div>
		</div>
	);
}

export default RecentOrders;
