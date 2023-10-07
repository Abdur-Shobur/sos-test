import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../../../../components/formComponent/Search';

function Breadcrumb({ searchHandler, text }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center flex-wrap justify-content-between">
			<div>
				<h1>{text} Products</h1>
				<p className="breadcrumbs">
					<span>
						<Link to="/vendors-dashboard">Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					{text} Products
				</p>
			</div>
			<div className="d-flex" style={{ gap: '5px' }}>
				<Search searchHandler={searchHandler} />
			</div>
			<div>
				<Link to="/vendors-dashboard/product-add" className="btn btn-primary">
					Add Product
				</Link>
			</div>
		</div>
	);
}

export default Breadcrumb;
