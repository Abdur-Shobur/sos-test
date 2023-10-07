import React from 'react';
import { useEffect } from 'react';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { useDebounce } from '../../../components/action/useDebounce';
import { Helmet } from 'react-helmet';
import Breadcrumb from './own-components/Breadcrumb';
import Aos from 'aos';
import TableBodyLoading from '../../../components/loader/TableBodyLoading';
import TableRow from './own-components/TableRow';
import TableHead from './own-components/TableHead';
import Modal from './own-components/modal/Modal';
import { AdminBankList } from '../../../api/admin/payment';
import { GetAllWithDrawSuccess } from '../../../api/admin/apiAdmin';
import { NoDataFound } from '../../../components/table/TableComponents';

function PaymentAffiliateClear() {
	const [isOpen, setIsOpen] = useState({ open: false, id: null });
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const [loading, setLoading] = useState(false);

	const { searchHandler } = useDebounce(setSearch, setPage);

	// get withdraw
	const { allReq, isLoading, refetch } = GetAllWithDrawSuccess(page, search);

	const { banks } = AdminBankList();

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Affiliate Payment Clear-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb searchHandler={searchHandler} text="Clear" />
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
												{allReq?.data?.length > 0 ? (
													allReq?.data?.map((e, i) => (
														<TableRow
															i={i}
															key={i}
															data={e}
															page={page}
															isOpen={isOpen}
															refetch={refetch}
															setIsOpen={setIsOpen}
															setLoading={setLoading}
														/>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
									{isOpen.open && (
										<Modal
											banks={banks}
											isOpen={isOpen}
											refetch={refetch}
											setIsOpen={setIsOpen}
											setLoading={setLoading}
										/>
									)}

									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={allReq}
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

export default PaymentAffiliateClear;
