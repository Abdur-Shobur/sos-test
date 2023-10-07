import React from 'react';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import BreadCrumb from './own-components/BreadCrumb';
import Table from '../../../components/manage-order/Table';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import Aos from 'aos';
import { GetOrderHistoryPending } from '../../../api/affiliate/apiAffiliate';

function OrderHistoryPending() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get affiliates
	const { getData, isLoading } = GetOrderHistoryPending(page, search);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Order Pending</title>
			</Helmet>
			<div className="content">
				<BreadCrumb searchHandler={searchHandler} title="Orders Pending" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<Table
										from={'affiliate'}
										getData={getData?.data}
										isLoading={isLoading}
										page={page}
									/>
									<Pagination
										getPaginationData={getData}
										isLoading={isLoading}
										page={page}
										setPage={setPage}
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

export default OrderHistoryPending;
