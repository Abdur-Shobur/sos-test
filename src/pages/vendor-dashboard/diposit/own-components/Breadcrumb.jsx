import React from 'react';
import Search from '../../../../components/formComponent/Search';
import { Link } from 'react-router-dom';

function Breadcrumb({ searchHandler, text }) {
	return (
		<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
			<div>
				<h1>Vendor Payment {text}</h1>
				<p className="breadcrumbs">
					<span>
						<Link to="/vendors-dashboard">Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>{' '}
					Vendor Payment {text}
				</p>
			</div>
			<div>
				<Search searchHandler={searchHandler} />
			</div>
			<div>
				<Link
					to={`/vendors-dashboard/balance-deposit`}
					className="btn btn-primary"
				>
					Deposit Payment
				</Link>
			</div>
		</div>
	);
}

export default Breadcrumb;
