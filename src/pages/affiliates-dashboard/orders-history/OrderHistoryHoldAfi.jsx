import React from 'react';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import BreadCrumb from './own-components/BreadCrumb';
import Table from '../../../components/manage-order/Table';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import Aos from 'aos';
import { GetOrderHistoryHold } from '../../../api/affiliate/apiAffiliate';

function OrderHistoryHoldAfi() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);
	const { getData, isLoading } = GetOrderHistoryHold(page, search);
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Order Hold</title>
			</Helmet>
			<div className="content">
				<BreadCrumb searchHandler={searchHandler} title="Orders Hold" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<Table
										page={page}
										from={'affiliate'}
										isLoading={isLoading}
										getData={getData?.data}
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

export default OrderHistoryHoldAfi;
