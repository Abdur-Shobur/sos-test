import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ id }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
			<div>
				<h1>Product Detail</h1>
				<p className="breadcrumbs">
					<span>
						<a href="index.html">Home</a>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					Product
				</p>
			</div>
			<div>
				<Link
					to={`/vendors-dashboard/product-edit/${id}`}
					className="btn btn-primary"
				>
					Edit
				</Link>
			</div>
		</div>
	);
}

export default Breadcrumbs;
