import React from 'react';
import { useQuery } from 'react-query';
import { http } from '../../../components/action/axiosInstance';
import { useEffect } from 'react';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import { Helmet } from 'react-helmet';
import Breadcrumb from './own-components/Breadcrumb';
import Aos from 'aos';
import TableBodyLoading from '../../../components/loader/TableBodyLoading';
import TableHead from '../../../components/vendor-payment/TableHead';
import TableRow from '../../../components/vendor-payment/TableRow';
import { GetAllDeposit } from '../../../api/vendor/apiVendor';
import { NoDataFound } from '../../../components/table/TableComponents';

function AllDeposit() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	const { history, isLoading, refetch } = GetAllDeposit(page, search);

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
									<table
										id="responsive-data-table"
										className="table"
										style={{ width: '100%' }}
									>
										<TableHead />
										{isLoading ? (
											<TableBodyLoading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{history?.data?.length > 0 ? (
													history?.data?.map((h, i) => (
														<TableRow
															i={i}
															data={h}
															key={i}
															page={page}
															refetch={refetch}
														/>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={history}
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

export default AllDeposit;
