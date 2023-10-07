import Aos from 'aos';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import BreadCrumb from './own-components/BreadCrumb';
import Table from '../../../components/manage-order/Table';
import { GetOrdersDelivered } from '../../../api/admin/apiAdmin';
import { status_handler } from './own-components/statusHandler';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useDebounce } from '../../../components/action/useDebounce';
function AdminOrderHistoryDelivered() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get affiliates
	const { getData, isLoading, refetch } = GetOrdersDelivered(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	const [load, setLoad] = useState(false);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Manage Orders Delivered-SOS</title>
			</Helmet>
			<div className="content">
				<BreadCrumb searchHandler={searchHandler} title="Orders Delivered" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<Table
										page={page}
										from={'admin'}
										load={load}
										refetch={refetch}
										setLoad={setLoad}
										getData={getData?.data}
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

export default AdminOrderHistoryDelivered;
