import { useEffect } from 'react';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Aos from 'aos';
import TableBodyLoading from '../../../components/loader/TableBodyLoading';
import AddPaymentMethods from './own-components/withdraw/AddPaymentMethods';
import TableHead from './own-components/request/TableHead';
import TableRow from './own-components/request/TableRow';
import {
	AffiliatorGetAdminBank,
	GetAllWithdraw,
} from '../../../api/affiliate/apiAffiliate';
import { NoDataFound } from '../../../components/table/TableComponents';

function AffiliateWithdrawIncome() {
	const [page, setPage] = useState(null);
	const [url, setUrl] = useState(`/affiliator/all-withdraw`);
	// get brands
	const { banks, isFetching, isLoading } = AffiliatorGetAdminBank();

	const { allRequest, refetch } = GetAllWithdraw(page, url);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Withdraw Balance-SOS</title>
			</Helmet>
			<div className="content">
				{/* <Breadcrumb text="Deposit" /> */}

				<div data-aos="fade" className="product-brand card card-default p-24px">
					<div className="row mb-m-24px">
						<AddPaymentMethods bank={banks} refetch={refetch} />
						<div className="row">
							<div>
								<button
									onClick={() => {
										setUrl(`/affiliator/all-withdraw`);
									}}
									className="btn btn-primary btn-sm mr-3"
								>
									All Request
								</button>
								<button
									onClick={() => {
										setUrl(`/affiliator/all-withdraw/pending`);
									}}
									className="btn btn-warning btn-sm mr-3"
								>
									Pending Request
								</button>
								<button
									onClick={() => {
										setUrl(`/affiliator/all-withdraw/success`);
									}}
									className="btn btn-success btn-sm "
								>
									Complete Request
								</button>
							</div>
							<div className="table-responsive mb-2">
								<table
									id="responsive-data-table"
									className="table"
									style={{ width: '100%' }}
								>
									<TableHead />

									{isLoading || isFetching ? (
										<TableBodyLoading />
									) : allRequest?.data?.length > 0 ? (
										allRequest?.data?.map((e, i) => (
											<tbody style={{ verticalAlign: 'middle' }}>
												<TableRow data={e} key={i} i={i} page={page} />
											</tbody>
										))
									) : (
										<NoDataFound />
									)}
								</table>
								<Pagination
									page={page}
									setPage={setPage}
									isLoading={isLoading}
									getPaginationData={allRequest}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AffiliateWithdrawIncome;
