import React from 'react';

function ProfileStatics() {
	return (
		<div className="row">
			<div className="col-xl-4">
				<div className="media widget-media p-3 bg-white border">
					<div className="icon rounded-circle mr-3 bg-primary">
						<i className="mdi mdi-account-outline text-white "></i>
					</div>

					<div className="media-body align-self-center">
						<h4 className="text-primary mb-2">5300</h4>
						<p>New Users</p>
					</div>
				</div>
			</div>

			<div className="col-xl-4">
				<div className="media widget-media p-3 bg-white border">
					<div className="icon rounded-circle bg-warning mr-3">
						<i className="mdi mdi-cart-outline text-white "></i>
					</div>

					<div className="media-body align-self-center">
						<h4 className="text-primary mb-2">1953</h4>
						<p>Order Placed</p>
					</div>
				</div>
			</div>

			<div className="col-xl-4">
				<div className="media widget-media p-3 bg-white border">
					<div className="icon rounded-circle mr-3 bg-success">
						<i className="mdi mdi-diamond-stone text-white "></i>
					</div>

					<div className="media-body align-self-center">
						<h4 className="text-primary mb-2">1450</h4>
						<p>Total Sales</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileStatics;
