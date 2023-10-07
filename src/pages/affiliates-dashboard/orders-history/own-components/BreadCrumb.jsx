import React from 'react';
import Search from '../../../../components/formComponent/Search';
import { Link } from 'react-router-dom';

function BreadCrumb({ searchHandler, title }) {
	return (
		<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
			<h1>{title}</h1>
			<div className="d-flex" style={{ gap: '5px' }}>
				<Search searchHandler={searchHandler} />
			</div>
			<p className="breadcrumbs">
				<span>
					<Link to="/affiliates-dashboard">Home</Link>
				</span>
				<span>
					<i className="mdi mdi-chevron-right"></i>
				</span>
				{title}
			</p>
		</div>
	);
}

export default BreadCrumb;
