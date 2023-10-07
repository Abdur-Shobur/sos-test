/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { http } from '../../../../components/action/axiosInstance';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../components/action/tost';
import InputEdit from '../../../../components/formComponent/InputEdit';
import EditLoader from '../../../../components/loader/EditLoader';
import { GetAdminCouponUser } from '../../../../api/admin/apiAdmin';
import DatePicker from 'react-date-picker';

const CouponModal = ({ clickId, couponFetch, state, dispatch }) => {
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const { couponUserData } = GetAdminCouponUser();

	useEffect(() => {
		const getDataEditData = async () => {
			setLoadingData(true);
			const res = await http.get(`/admin/coupons/${clickId}`);
			dispatch({ type: 'API_DATA', payload: res?.data?.message });

			setLoadingData(false);
		};
		if (clickId) {
			getDataEditData();
		}
	}, [clickId]);

	const handleSubmitData = async (e) => {
		// dispatch({
		// 	type: 'RESET',
		// });
		e.preventDefault();
		setLoading(true);
		let getData = {
			name: state.data.name,
			amount: state.data.amount,
			commission: state.data.commission,
			limitation: state.data.limitation,
			user_id: state.data.user_id,
			expire_date: state.data.expire_date,
			status: state.data.status,
		};

		try {
			const data = await http.post(`/admin/coupons/${clickId}`, {
				...getData,
				_method: 'PUT',
			});
			if (data.data.data !== 'success') {
				tost(data?.data?.message);
			} else if (data.data.data === 'success') {
				couponFetch();
				tost(data?.data.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				{loadingData ? (
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Update Coupon
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<EditLoader />
						</div>
					</div>
				) : (
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Update Coupon
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmitData}>
								<div className="modal-body px-4">
									<div className="row mb-2">
										<div className="col-lg-12">
											<div className="form-group mb-4 position-relative">
												<InputEdit
													defaultValue={state?.data.name}
													type="text"
													name={'name'}
													label={'Name'}
													require={true}
													dispatch={dispatch}
													dispatchType={'INPUT'}
													id={'name-modal'}
												/>
											</div>
										</div>

										<div className="col-lg-6">
											<div className="form-group mb-4 position-relative">
												<InputEdit
													type="text"
													defaultValue={state?.data.amount}
													name={'amount'}
													label={'Amount'}
													require={true}
													dispatch={dispatch}
													dispatchType={'INPUT_NUMBER'}
													id={'amount-modal'}
													error={state.apiRes.amount}
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-4 position-relative">
												<InputEdit
													type="text"
													defaultValue={state?.data.commission}
													name={'commission'}
													require={true}
													label={'Commission'}
													dispatch={dispatch}
													dispatchType={'INPUT_NUMBER'}
													id={'commission-modal'}
													error={state.apiRes.commission}
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group mb-4 position-relative">
												<InputEdit
													type="text"
													defaultValue={state?.data.limitation}
													name={'limitation'}
													require={true}
													label={'Limitation'}
													dispatch={dispatch}
													dispatchType={'INPUT_NUMBER'}
													id={'limitation-modal'}
													error={state.apiRes.limitation}
												/>
											</div>
										</div>
										<div className="col-6 position-relative">
											<label for="parent-category">
												<span>User</span>
												<span className="position-absolute error start-0 mt-3"></span>
											</label>
											<div>
												<select
													style={{
														width: '100%',
														height: '45px',
														margin: '0',
														padding: '0 15px',
														border: '1px solid #eeeeee',
														backgroundColor: 'transparent',
														color: '#777',
														boxShadow: 'none',
														outline: 'none',
														borderRadius: '15px',
													}}
													id="parent-category"
													name="user_id"
													className="custom-select"
													onChange={(e) => {
														dispatch({
															type: 'INPUT',
															payload: {
																name: e.target.name,
																value: e.target.value,
															},
														});
													}}
												>
													{couponUserData?.map((data) => (
														<option
															selected={state.data.user_id == data.id}
															key={data?.id}
															value={data?.id}
														>
															{data?.email}
														</option>
													))}
												</select>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group d-flex flex-column date_pick_to_form">
												<label className="w-100" htmlFor="start_date">
													Expire Date{' '}
													{state.apiRes.expire_date && (
														<span
															style={{ fontSize: '10px', color: '#ff4e4e' }}
														>
															({state.apiRes.expire_date})
														</span>
													)}
												</label>
												<DatePicker
													value={state.data.expire_date_view}
													className="form-control"
													id="expire_date"
													dateFormate="Pp"
													onChange={(e) => {
														dispatch({
															type: 'DATE_FORMATE',
															payload: {
																name: 'expire_date',
																value: e,
																viewDate: 'expire_date_view',
															},
														});
													}}
												/>
											</div>
										</div>

										<div className="col-6 position-relative">
											<label for="parent-category">
												<span>Status</span>
												<span className="position-absolute error start-0 mt-3"></span>
											</label>
											<div>
												<select
													style={{
														width: '100%',
														height: '45px',
														margin: '0',
														padding: '0 15px',
														border: '1px solid #eeeeee',
														backgroundColor: 'transparent',
														color: '#777',
														boxShadow: 'none',
														outline: 'none',
														borderRadius: '15px',
													}}
													id="parent-category"
													name="status"
													className="custom-select"
													onChange={(e) => {
														dispatch({
															type: 'INPUT',
															payload: {
																name: e.target.name,
																value: e.target.value,
															},
														});
													}}
												>
													<option selected={state.data?.status === 'active'}>
														active
													</option>
													<option
														selected={state.data?.status === 'deactivate'}
													>
														deactivate
													</option>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer px-4">
									<Link
										to={'/admin/missions'}
										className="btn btn-secondary btn-pill"
										data-bs-dismiss="modal"
									>
										Cancel
									</Link>
									<button
										disabled={Object.values(state.apiRes).some((e) => e)}
										type="submit"
										data-bs-dismiss="modal"
										className="btn btn-primary btn-pill d-flex align-items-center"
									>
										<span style={{ marginRight: '2px' }}>Update</span>{' '}
										{loading && <ClockLoader color="#fff" size={15} />}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CouponModal;
