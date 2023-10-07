import React from 'react';
import Search from '../../../../components/formComponent/Search';
import { Link } from 'react-router-dom';

function Breadcrumb({ searchHandler, text }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
			<div>
				<h1>{text} Product</h1>
				<p className="breadcrumbs">
					<span>
						<Link to={'/'}>Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					{text} Product
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
