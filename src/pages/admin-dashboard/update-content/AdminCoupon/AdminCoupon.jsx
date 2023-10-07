import React from 'react';
import { useEffect } from 'react';
import Pagination from '../../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Aos from 'aos';
import { GetAdminCoupon } from '../../../../api/admin/apiAdmin';
import { Link } from 'react-router-dom';
import TableBodyLoading from '../../../../components/loader/TableBodyLoading';
import { http } from '../../../../components/action/axiosInstance';
import { toast } from 'react-toastify';
import { DeletePopUP } from '../../../../components/action/DeletePopUP';
import CouponModal from './CouponModal';
import {
	NoDataFound,
	TableStatus,
} from '../../../../components/table/TableComponents';
import { useReducer } from 'react';
import { initialState, reducer } from './update-coupon';

function AdminCoupon() {
	const [page, setPage] = useState(null);
	const [clickId, setClickId] = useState(null);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	const {
		couponData,
		isLoading: couponLoading,
		refetch: couponFetch,
	} = GetAdminCoupon(page);

	const deleteData = (id) => {
		const del = () =>
			http.delete(`admin/coupons/${id}`).then((res) => {
				toast(res.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				couponFetch();
			});
		return DeletePopUP(del);
	};

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Admin All Coupon-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-contacts">
					<div>
						<h1>All Coupon</h1>
						<p className="breadcrumbs">
							<span>
								<Link to={'/'}>Home</Link>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>
							Coupon
						</p>
					</div>
					<div>
						<Link className="btn btn-primary" to="/admin/create-coupon">
							Create Coupon
						</Link>
					</div>
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
										<thead>
											<tr>
												<th>SL</th>
												<th>Name</th>
												<th>Amount</th>
												<th>Commission</th>
												<th>Limitation</th>
												<th>Expire Date</th>
												<th>Status</th>
												<th>User</th>
												<th>Email</th>
												<th>Action</th>
											</tr>
										</thead>{' '}
										{couponLoading ? (
											<TableBodyLoading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{couponData?.data?.length > 0 ? (
													couponData?.data?.map((data, i) => (
														<tr key={data?.id}>
															<td>{i + 1}</td>
															<td>{data?.name}</td>
															<td>{data?.amount}</td>
															<td>{data?.commission}</td>
															<td>{data?.limitation}</td>
															<td>{data?.expire_date}</td>
															<td>
																<TableStatus
																	status={data?.status}
																	text={data?.status}
																/>
															</td>
															<td>{data?.user?.name}</td>
															<td>{data?.user?.email}</td>
															<td style={{ width: '200px' }}>
																<div className="btn-group">
																	<Link
																		style={{ padding: '3px 10px' }}
																		className="btn btn-outline-success"
																	>
																		View
																	</Link>
																	<button
																		type="button"
																		className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
																		data-bs-toggle="dropdown"
																		aria-haspopup="true"
																		aria-expanded="false"
																		data-display="static"
																	>
																		<span className="sr-only">Info</span>
																	</button>

																	<div className="dropdown-menu">
																		<button
																			className="dropdown-item"
																			data-bs-toggle="modal"
																			data-bs-target="#exampleModal"
																			onClick={() => setClickId(data?.id)}
																		>
																			Update
																		</button>

																		<button
																			onClick={() => deleteData(data?.id)}
																			className="dropdown-item"
																			href="#"
																		>
																			Delete
																		</button>
																	</div>
																</div>

																<CouponModal
																	couponFetch={couponFetch}
																	clickId={clickId}
																	dispatch={dispatch}
																	state={state}
																/>
															</td>
														</tr>
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
										isLoading={couponLoading}
										getPaginationData={couponData}
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

export default AdminCoupon;
