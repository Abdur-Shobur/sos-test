import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import BreadCrumb from './own-components/BreadCrumb';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { status_handler } from './own-components/statusHandler';
import Table from '../../../components/manage-order/Table';
import { GetOrderHistoryDelivered } from '../../../api/vendor/apiVendor';

function VendorOrderHistoryAll() {
	const [load, setLoad] = useState(false);
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	const { getData, isLoading, refetch } = GetOrderHistoryDelivered(
		page,
		search
	);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Orders Delivered-SOS</title>
			</Helmet>
			<div className="content">
				<BreadCrumb searchHandler={searchHandler} title="Orders Delivered" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<Table
										load={load}
										page={page}
										from={'vendor'}
										setLoad={setLoad}
										refetch={refetch}
										isLoading={isLoading}
										getData={getData?.data}
										status_handler={status_handler}
									/>
									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={getData}
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

export default VendorOrderHistoryAll;
