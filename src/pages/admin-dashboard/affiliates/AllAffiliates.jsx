import React, { useState } from 'react';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useDebounce } from '../../../components/action/useDebounce';
import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from './own-components/Breadcrumb';
import THead from './own-components/THead';
import Loading from './own-components/Loading';
import TRow from './own-components/TRow';
import { AffiliatesAll } from '../../../api/admin/affiliatesAPI';
import { NoDataFound } from '../../../components/table/TableComponents';

function Affiliates() {
	const [page, setPage] = useState(null);

	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get affiliates
	const { affiliates, isLoading, refetch } = AffiliatesAll(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>All Affiliates-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="All" />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="ec-vendor-list card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table id="responsive-data-table" className="table">
										<THead />

										{isLoading ? (
											<Loading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{affiliates?.data?.length > 0 ? (
													affiliates?.data?.map((e, i) => (
														<TRow
															i={i}
															key={e.id}
															page={page}
															affiliate={e}
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
										getPaginationData={affiliates}
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

export default Affiliates;
