import React from 'react';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';

import Pagination from '../../../components/breadcrumbs/Pagination';
import TableBodyLoading from '../../../components/loader/TableBodyLoading';
import Search from '../../../components/formComponent/Search';
import { Link } from 'react-router-dom';
import TableHead from './own-components/history/TableHead';
import TableRow from './own-components/history/TableRow';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { GetAvailableIncome } from '../../../api/affiliate/apiAffiliate';
import { NoDataFound } from '../../../components/table/TableComponents';

function AffiliateAvailableIncome() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get affiliates
	const { getData, isLoading } = GetAvailableIncome(page, search);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Available Income-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1> Available Income</h1>
					<div className="d-flex" style={{ gap: '5px' }}>
						<Search searchHandler={searchHandler} />
					</div>
					<p className="breadcrumbs">
						<span>
							<Link to="/">Home</Link>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Available Income
					</p>
				</div>
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
												{getData?.data?.length > 0 ? (
													getData?.data?.map((e, i) => (
														<TableRow i={i} key={i} data={e} page={page} />
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

export default AffiliateAvailableIncome;
