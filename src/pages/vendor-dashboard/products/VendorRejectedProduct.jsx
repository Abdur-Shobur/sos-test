import { useQuery } from 'react-query';
import { http } from '../../../components/action/axiosInstance';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import Breadcrumb from './components/common/Breadcrumb';
import THead from './components/common/THead';
import Loading from './components/common/Loading';
import TRow from './components/common/TRow';
import { NoDataFound } from '../../../components/table/TableComponents';

function VendorRejectedProduct() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');

	const { searchHandler } = useDebounce(setSearch, setPage);

	const { data, refetch, isLoading } = useQuery(
		['fetch_vendor_rejected_product_data', page, search],
		() => {
			return http.get(`/vendor/product/rejected?page=${page}&search=${search}`);
		}
	);

	const products = data?.data?.product?.data;
	const getPaginationData = data?.data?.product;

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Rejected Products-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="Rejected" />
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
														<TRow
															i={i}
															data={e}
															key={e.id}
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
										getPaginationData={getPaginationData}
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

export default VendorRejectedProduct;
