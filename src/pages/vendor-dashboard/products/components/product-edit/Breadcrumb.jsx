import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ Text }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
			<div>
				<h1>{Text} Product</h1>
				<p className="breadcrumbs">
					<span>
						<Link to={'/'}>Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					Product
				</p>
			</div>
			<div>
				<Link
					to={`/vendors-dashboard/product-list/all`}
					className="btn btn-primary"
				>
					View All
				</Link>
			</div>
		</div>
	);
}

export default Breadcrumb;
