import { useEffect, useState } from 'react';
import Aos from 'aos';
import { useDebounce } from '../../../components/action/useDebounce';
import Pagination from '../../../components/breadcrumbs/Pagination';
import THead from './own-components/THead';
import Breadcrumb from './own-components/Breadcrumb';
import { Helmet } from 'react-helmet';
import Loading from './own-components/Loading';
import TRowAll from './own-components/TRowAll';
import { GetAllProduct } from '../../../api/affiliate/apiAffiliate';
import { NoDataFound } from '../../../components/table/TableComponents';

function AllProductAffiliate() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);
	const { isLoading, products, refetch } = GetAllProduct(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>All Product-SOS</title>
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
										<THead />
										{isLoading ? (
											<Loading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{products?.data?.length > 0 ? (
													products?.data?.map((e, i) => (
														<TRowAll
															i={i}
															data={e}
															key={e.id}
															page={page}
															from="product"
															refetch={refetch}
															path="/affiliates-dashboard/all-product-details/"
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

export default AllProductAffiliate;
