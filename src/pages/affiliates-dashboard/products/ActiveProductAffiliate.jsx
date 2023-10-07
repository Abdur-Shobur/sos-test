import Aos from 'aos';
import { Helmet } from 'react-helmet';
import THead from './own-components/THead';
import { useEffect, useState } from 'react';
import TRowAll from './own-components/TRowAll';
import Loading from './own-components/Loading';
import Breadcrumb from './own-components/Breadcrumb';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useDebounce } from '../../../components/action/useDebounce';
import { GetActiveProduct } from '../../../api/affiliate/apiAffiliate';
import { NoDataFound } from '../../../components/table/TableComponents';

function ActiveProductAffiliate() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');

	const { searchHandler } = useDebounce(setSearch, setPage);
	const { isLoading, products, refetch } = GetActiveProduct(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Active Product-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="Active" />
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
										<THead />
										{isLoading ? (
											<Loading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{products?.data?.length > 0 ? (
													products?.data?.map((e, i) => (
														<TRowAll
															i={i}
															key={e.id}
															page={page}
															data={e.product}
															from="active"
															refetch={refetch}
															path="/affiliates-dashboard/active-product-details/"
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
										getPaginationData={products}
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

export default ActiveProductAffiliate;
