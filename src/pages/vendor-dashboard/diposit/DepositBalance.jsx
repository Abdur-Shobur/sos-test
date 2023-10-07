import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from './own-components/Breadcrumb';
import Aos from 'aos';

import AddPaymentMethods from './own-components/Payments/AddPaymentMethods';
import Card from '../../admin-dashboard/profile/own-components/Payments/Card';
import { GetVendorBank } from '../../../api/vendor/apiVendor';

function DepositBalance() {
	// get brands
	const { banks } = GetVendorBank();

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Vendor Deposit Payment-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb text="Deposit" />

				<div data-aos="fade" className="product-brand card card-default p-24px">
					<div className="row mb-m-24px">
						<AddPaymentMethods bank={banks} />
						<div className="row">
							{banks?.map((e) => (
								<Card key={e.id} bank={e} to="vendor" />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DepositBalance;
