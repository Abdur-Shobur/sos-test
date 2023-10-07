import Aos from 'aos';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import BreadCrumb from './own-components/BreadCrumb';
import { status_handler } from './own-components/statusHandler';
import Table from '../../../components/manage-order/Table';
import { GetOrderHistoryPending } from '../../../api/vendor/apiVendor';

function VendorOrderHistoryPending() {
	const [page, setPage] = useState(null);
	const [load, setLoad] = useState(false);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	const { getData, isLoading, refetch } = GetOrderHistoryPending(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Orders Pending-SOS</title>
			</Helmet>
			<div className="content">
				<BreadCrumb searchHandler={searchHandler} title="Orders Pending" />
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
										getData={getData?.data}
										refetch={refetch}
										isLoading={isLoading}
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

export default VendorOrderHistoryPending;
