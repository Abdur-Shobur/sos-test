import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../../../components/formComponent/Search';

function Breadcrumb({ searchHandler, text }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
			<div>
				<h1>{text} Request Product</h1>
				<p className="breadcrumbs">
					<span>
						<Link to="/">Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					{text} Request Product
				</p>
			</div>
			<div className="d-flex" style={{ gap: '5px' }}>
				<Search searchHandler={searchHandler} />
			</div>
			<div></div>
		</div>
	);
}

export default Breadcrumb;
