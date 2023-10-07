import React from 'react';
import CartTable from './CartTable';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';

function AddToCart() {
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Cart Page -SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1>Cart Page</h1>
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
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<CartTable />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddToCart;
