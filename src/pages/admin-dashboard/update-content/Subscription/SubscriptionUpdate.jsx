import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { IconPicker } from 'react-fa-icon-picker';
import ProductSpecificationAdd from '../../../vendor-dashboard/products/ProductSpecificationAdd';
import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';
import { ClockLoader } from 'react-spinners';
import EditLoader from '../../../../components/loader/EditLoader';
import InputEdit from '../../../../components/formComponent/InputEdit';
import { Helmet } from 'react-helmet';
import CommonBreadCrumbs from '../../../../components/breadcrumbs/CommonBreadCrumbs';
import Aos from 'aos';
import {
	initialState,
	reducer,
	updateFacility,
	updateFacilityReducer,
} from './action';
import InputField from './own-components/InputField';

const SubscriptionUpdate = () => {
	const [modalData, setModalData] = useState({});
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const { id } = useParams();
	const ID = id.split('-')[0];
	const from = id.split('-')[1];
	const [state, dispatch] = useReducer(reducer, initialState);
	const [stateF, dispatchF] = useReducer(updateFacilityReducer, updateFacility);
	console.log(stateF);
	const navigate = useNavigate();
	useEffect(() => {
		const getDataEditData = async () => {
			setLoadingData(true);
			const res = await http.get(`/admin/subscription/${ID}`);
			setModalData(res?.data?.data);
			dispatch({ type: 'API_DATA', payload: res?.data?.data });
			dispatchF({ type: 'API_DATA', payload: res?.data?.data });
			setLoadingData(false);
		};
		getDataEditData();
	}, [ID]);
	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.put(`/admin/subscription/${ID}`, {
				...state.data,
				card_facilities_title: state.data.card_facilities_title.filter(
					(e) => e.value.trim() !== '' || e.value === null
				),
			});
			if (data.data.message === 'Validation errors') {
				dispatch({
					type: 'VALIDATION_ERROR',
					payload: data.data.data,
				});
			}
			if (data.data.data === 'success') {
				tost(data?.data.message);
				navigate('/admin/subscription');
			} else {
				tost(data?.data.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	// facility update
	const handleSubmitFacilityData = async (e) => {
		e.preventDefault();
		setLoading(true);

		const stateDataVendor = {
			subscription_id: ID,
			affiliate_request: stateF.data.affiliate_request,
			product_qty: stateF.data.product_qty,
			service_qty: stateF.data.service_qty,
		};
		const stateDataAffiliate = {
			subscription_id: ID,
			service_create: stateF.data.service_create,
			product_approve: stateF.data.product_approve,
			product_request: stateF.data.product_request,
		};

		const formDATA =
			state.data.subscription_user_type === 'vendor'
				? stateDataVendor
				: stateDataAffiliate;

		try {
			const data = await http.post(`/admin/subscription/requirement/${ID}`, {
				...formDATA,
			});
			if (data.data.message === 'Validation errors') {
				dispatch({
					type: 'VALIDATION_ERROR',
					payload: data.data.data,
				});
			}
			if (data.data.data === 'success') {
				tost(data?.data.message);
				navigate('/admin/subscription');
			} else {
				tost(data?.data.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div>
			<Helmet>
				<title>Update Subscription-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Update Subscription"
					link={{ name: 'Subscription', path: '/admin/subscription' }}
				/>
				{loadingData ? (
					<div className="w-100">
						<EditLoader />
					</div>
				) : from === 'facility' ? (
					<form
						data-aos="fade"
						onSubmit={handleSubmitFacilityData}
						style={{ maxWidth: '800px', margin: '20px auto' }}
						className="ec-cat-form shadow p-4"
					>
						<div className="modal-header px-4">
							<h5 className="modal-title" id="exampleModalCenterTitle">
								Update Subscription Facility{' '}
								<span className="badge badge-info">
									{' '}
									{state.data.subscription_user_type}
								</span>
								{'--'}
								<span className="badge badge-success">
									{state.data.subscription_package_type}
								</span>
								{'--'}
								<span className="badge badge-dark">
									{state.data.card_heading}
								</span>
							</h5>
						</div>
						<div className="modal-body px-lg-4 px-0">
							{state.data.subscription_user_type === 'vendor' ? (
								<div className="row mb-2">
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'affiliate_request'}
												label={'Affiliate Request'}
												defaultValue={stateF?.data?.affiliate_request}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.affiliate_request
														? state.apiRes.affiliate_request[0]
														: null
												}
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'product_qty'}
												label={'Product Quantity'}
												defaultValue={stateF?.data?.product_qty}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.product_qty
														? state.apiRes.product_qty[0]
														: null
												}
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'service_qty'}
												label={'Service Quantity'}
												defaultValue={stateF?.data?.service_qty}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.service_qty
														? state.apiRes.service_qty[0]
														: null
												}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className="row mb-2">
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'service_create'}
												label={'Service Create'}
												defaultValue={stateF?.data?.service_create}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.service_create
														? state.apiRes.service_create[0]
														: null
												}
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'product_approve'}
												label={'Product Approve'}
												defaultValue={stateF?.data?.product_approve}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.product_approve
														? state.apiRes.product_approve[0]
														: null
												}
											/>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												type="text"
												name={'product_request'}
												label={'Product Request'}
												defaultValue={stateF?.data?.product_request}
												require={true}
												dispatch={dispatchF}
												placeholder={'type...'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													stateF.apiRes.product_request
														? state.apiRes.product_request[0]
														: null
												}
											/>
										</div>
									</div>
								</div>
							)}
						</div>

						<div className="modal-footer px-4">
							<Link
								to={'/admin/subscription'}
								className="btn btn-secondary btn-pill"
							>
								Cancel
							</Link>
							<button
								disabled={loading}
								type="submit"
								className="btn btn-primary btn-pill d-flex align-items-center"
							>
								<span style={{ marginRight: '2px' }}>Update Service</span>{' '}
								{loading && <ClockLoader color="#fff" size={15} />}
							</button>
						</div>
					</form>
				) : (
					<form
						data-aos="fade"
						onSubmit={handleSubmitData}
						style={{ maxWidth: '800px', margin: '20px auto' }}
						className="ec-cat-form shadow p-4"
					>
						<div className="modal-header px-4">
							<h5 className="modal-title" id="exampleModalCenterTitle">
								Update Subscription{' '}
								<span className="badge badge-info">
									{' '}
									{state.data.subscription_user_type}
								</span>
								{'--'}
								<span className="badge badge-success">
									{state.data.subscription_package_type}
								</span>
								{'--'}
								<span className="badge badge-dark">
									{state.data.card_heading}
								</span>
							</h5>
						</div>
						<div className="modal-body px-lg-4 px-0">
							<div className="row mb-2">
								<div className="col-12 position-relative mb-3">
									<label for="parent-category">
										<span>Subscription For</span>
										<span className="position-absolute error start-0 mt-3"></span>
									</label>
									<div>
										<select
											id="subscription_user_type"
											name="subscription_user_type"
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
											<option
												value={'vendor'}
												selected={
													state?.data.subscription_user_type === 'vendor'
												}
											>
												Vendor
											</option>
											<option
												value={'affiliate'}
												selected={
													state?.data.subscription_user_type === 'affiliate'
												}
											>
												Affiliate
											</option>
										</select>
									</div>
								</div>
								<div className="col-12 position-relative mb-3">
									<label for="parent-category">
										<span>Subscription Time</span>
										<span className="position-absolute error start-0 mt-3"></span>
									</label>
									<div>
										<select
											id="subscription_user_type"
											name="subscription_package_type"
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
											<option
												value={'monthly'}
												selected={
													state?.data.subscription_package_type === 'monthly'
												}
											>
												Monthly
											</option>
											<option
												value={'half_yearly'}
												selected={
													state?.data.subscription_package_type ===
													'half_yearly'
												}
											>
												Half Yearly
											</option>
											<option
												value={'yearly'}
												selected={
													state?.data.subscription_package_type === 'yearly'
												}
											>
												Yearly
											</option>
										</select>
									</div>
								</div>
								<div className="col-12 position-relative mb-3">
									<label for="parent-category">
										<span>Subscription Package</span>
										<span className="position-absolute error start-0 mt-3"></span>
									</label>
									<div>
										<select
											id="subscription_user_type"
											name="card_heading"
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
											<option
												value={'free'}
												selected={state?.data.card_heading === 'free'}
											>
												Free
											</option>
											<option
												value={'basic'}
												selected={state?.data.card_heading === 'basic'}
											>
												Basic
											</option>
											<option
												value={'premium'}
												selected={state?.data.card_heading === 'premium'}
											>
												Premium
											</option>
											<option
												value={'vip'}
												selected={state?.data.card_heading === 'vip'}
											>
												Vip
											</option>
										</select>
									</div>
								</div>
								<div className="col-12 position-relative mb-3">
									<label for="parent-category">
										<span>Is Suggestible</span>
										<span className="position-absolute error start-0 mt-3"></span>
									</label>
									<div>
										<select
											id="subscription_user_type"
											name="suggest"
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
											<option
												value={'0'}
												selected={state?.data.suggest === '0'}
											>
												No
											</option>
											<option
												value={'1'}
												selected={state?.data.suggest === '1'}
											>
												Yes
											</option>
										</select>
									</div>
								</div>

								<div className="col-lg-12">
									<div className="form-group mb-4 position-relative">
										<InputEdit
											type="text"
											name={'subscription_amount'}
											label={'Subscription Amount $'}
											defaultValue={state?.data?.subscription_amount}
											require={true}
											dispatch={dispatch}
											placeholder={'type...'}
											dispatch_type={'INPUT'}
											id={'admin-add-affiliates-name'}
											error={
												state.apiRes.subscription_amount
													? state.apiRes.subscription_amount[0]
													: null
											}
										/>
									</div>
								</div>

								<div className="col-md-12">
									<label htmlFor="">Features Lists</label>
									{state?.data?.card_facilities_title.map((e, i) => (
										<InputField
											dispatch={dispatch}
											state={state}
											key={e.id}
											data={e}
											i={i + 1}
										/>
									))}

									<div className="text-end">
										<button
											onClick={() =>
												dispatch({
													type: 'CREATE',
												})
											}
											type="button"
											className="btn btn-primary btn-sm mt-3  "
										>
											+
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="modal-footer px-4">
							<Link
								to={'/admin/subscription'}
								className="btn btn-secondary btn-pill"
							>
								Cancel
							</Link>
							<button
								disabled={loading}
								type="submit"
								className="btn btn-primary btn-pill d-flex align-items-center"
							>
								<span style={{ marginRight: '2px' }}>Update Service</span>{' '}
								{loading && <ClockLoader color="#fff" size={15} />}
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default SubscriptionUpdate;

// const data = {
// 	subscription_amount: '50', // a
// 	card_symbol_icon: 'fa fa-doller', // $
// 	card_time: 'monthy', // $ pase
// 	card_facilities_title: [],

// 	subscription_user_type: 'vendor', // v or a
// 	subscription_package_type: 'monthly', m/y/h-f

// 	card_heading: 'card_heading',/ free/basic/vip/premium

// };
