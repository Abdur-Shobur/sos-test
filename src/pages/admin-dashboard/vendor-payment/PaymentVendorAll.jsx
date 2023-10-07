import React from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import Table from './own-components/Table';
import { useEffect, useState } from 'react';
import Breadcrumb from './own-components/Breadcrumb';
import { GetAllVendorPaymentsAll } from '../../../api/admin/apiAdmin';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useDebounce } from '../../../components/action/useDebounce';

function PaymentVendorAll() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get brands
	const { deposit, isLoading, refetch } = GetAllVendorPaymentsAll(page, search);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Vendor Payment All-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="All" />

				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<Table
										deposit={deposit}
										isLoading={isLoading}
										page={page}
										refetch={refetch}
									/>
									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={deposit}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaymentVendorAll;
