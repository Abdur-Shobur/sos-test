import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';

import {
	http,
	multipartConfig,
} from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
import InputMain from '../../../../../components/formComponent/InputMain';
import CommonBreadCrumbs from '../../../../../components/breadcrumbs/CommonBreadCrumbs';
import { initialState, reducer } from './aciton';
import { useEffect } from 'react';
import Aos from 'aos';
// import MyCalendar from '../../../../../components/calender/Calender';
import DatePicker from 'react-date-picker';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

const AdvertiserStore = () => {
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmitMember = async (e) => {
		e.preventDefault();
		setLoading(true);
		let fromData = state;
		delete fromData.url;
		delete fromData.advertise_audience_files_url;
		delete fromData.location_files_url;
		try {
			const data = await http.post(
				`/admin/advertise`,
				fromData,
				multipartConfig
			);

			if (data.data.success === false) {
				tost(data?.data?.[0]);
				tost(data?.data.message);
				setError(data?.data?.data?.data);
			} else if (data.data.success === 'success') {
				navigate('/admin/advertise-content');
				tost(data?.data.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
 		}
	};
 
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Get Advertisers-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Add Advertiser"
					link={{ name: 'All Advertiser', path: '/admin/advertise-content' }}
				/>

				<form
					data-aos="fade"
					onSubmit={handleSubmitMember}
					style={{
						maxWidth: '1400px',
						margin: '20px auto',
					}}
					className="ec-cat-form shadow p-4"
				>
					<Helmet>
						<title>Add Advertiser-SOS</title>
					</Helmet>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Add Advertiser
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.campaign_objective}
									</span>
									<InputMain
										type="text"
										name={'campaign_objective'}
										label={'campaign objective'}
										require={true}
										dispatch={dispatch}
										placeholder={'Add campaign objective'}
										dispatch_type={'INPUT'}
										id={'campaign_objective'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.campaign_name}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'campaign_name'}
										label={'campaign name'}
										dispatch={dispatch}
										placeholder={'Add campaign name'}
										dispatch_type={'INPUT'}
										id={'campaign_name'}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.conversion_location}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'conversion_location'}
										label={'conversion location'}
										dispatch={dispatch}
										placeholder={'Add conversion location'}
										dispatch_type={'INPUT'}
										id={'conversion_location'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.performance_goal}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'performance_goal'}
										label={'performance goal'}
										dispatch={dispatch}
										placeholder={'Add performance goal'}
										dispatch_type={'INPUT'}
										id={'performance_goal'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.platforms}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'platforms'}
										label={'platforms'}
										dispatch={dispatch}
										placeholder={'Add platforms'}
										dispatch_type={'INPUT'}
										id={'platforms'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.platform}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'platform'}
										label={'platform'}
										dispatch={dispatch}
										placeholder={'Add platform'}
										dispatch_type={'INPUT'}
										id={'platform'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.budget_amount}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'budget_amount'}
										label={'budget amount'}
										dispatch={dispatch}
										placeholder={'Add budget amount'}
										dispatch_type={'INPUT'}
										id={'budget_amount'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative date_pick_to_form">
									<span className="position-absolute mt-3 error">
										{error?.start_date}
									</span>
									<label htmlFor="start_date">Start Date</label>
									<DatePicker
										value={state.start_date_view}
										className="form-control"
										id="start_date"
										dateFormate="Pp"
										onChange={(e) => {
											dispatch({
												type: 'DATE_FORMATE',
												payload: {
													name: 'start_date',
													value: e,
													viewDate: 'start_date_view',
												},
											});
										}}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative date_pick_to_form">
									<span className="position-absolute mt-3 error">
										{error?.end_date}
									</span>
									<label htmlFor="end_date">End Date</label>
									<DatePicker
										value={state.end_date_view}
										className="form-control"
										id="end_date"
										dateFormate="Pp"
										onChange={(e) => {
											dispatch({
												type: 'DATE_FORMATE',
												payload: {
													name: 'end_date',
													value: e,
													viewDate: 'end_date_view',
												},
											});
										}}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.age}
									</span>
									<InputMain
										type="number"
										require={true}
										name={'age'}
										label={'age'}
										dispatch={dispatch}
										placeholder={'Add age'}
										dispatch_type={'INPUT'}
										id={'age'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.gender}
									</span>
									<label className="form-label">Gender</label>
									<select
										onChange={(e) =>
											dispatch({
												type: 'INPUT',
												payload: {
													name: e.target.name,
													value: e.target.value,
												},
											})
										}
										defaultValue="male"
										name="gender"
										className="form-control here set-slug"
										aria-label=".form-select-sm example"
									>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="others">Others</option>
									</select>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.detail_targeting}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'detail_targeting'}
										label={'detail targeting'}
										dispatch={dispatch}
										placeholder={'Add detail targeting'}
										dispatch_type={'INPUT'}
										id={'detail_targeting'}
									/>
								</div>
							</div>
							{/* <CountryCitySelect /> */}
							<div className="col-lg-6 county-select-custom-design">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.country}
									</span>

									<h6>Country</h6>
									<CountrySelect
										onChange={(e) => {
											dispatch({
												type: 'COUNTRY_SELECT',
												payload: {
													name: 'country',
													value: e.name,
													place_id: e.id,
												},
											});
										}}
										placeHolder="Select Country"
										showFlag={false}
									/>
								</div>
							</div>
							<div className="col-lg-6 county-select-custom-design">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.country}
									</span>

									<h6>City</h6>
									<StateSelect
										countryid={state?.place_id}
										onChange={(e) => {
											dispatch({
												type: 'INPUT',
												payload: {
													name: 'city',
													value: e.name,
												},
											});
										}}
										placeHolder="Select State"
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.device}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'device'}
										label={'device'}
										dispatch={dispatch}
										placeholder={'Add device'}
										dispatch_type={'INPUT'}
										id={'device'}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.inventory}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'inventory'}
										label={'inventory'}
										dispatch={dispatch}
										placeholder={'Add inventory'}
										dispatch_type={'INPUT'}
										id={'inventory'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.format}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'format'}
										label={'format'}
										dispatch={dispatch}
										placeholder={'Add format'}
										dispatch_type={'INPUT'}
										id={'format'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.primary_text}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'primary_text'}
										label={'primary text'}
										dispatch={dispatch}
										placeholder={'Add primary_text'}
										dispatch_type={'INPUT'}
										id={'primary_text'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.media}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'media'}
										label={'media'}
										dispatch={dispatch}
										placeholder={'https://www.google.com/'}
										dispatch_type={'INPUT'}
										id={'media'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.url_perimeter}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'url_perimeter'}
										label={'url perimeter'}
										dispatch={dispatch}
										placeholder={'https://www.google.com/'}
										dispatch_type={'INPUT'}
										id={'url_perimeter'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.heading}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'heading'}
										label={'heading'}
										dispatch={dispatch}
										placeholder={'Add heading'}
										dispatch_type={'INPUT'}
										id={'heading'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.description}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'description'}
										label={'description'}
										dispatch={dispatch}
										placeholder={'Add description'}
										dispatch_type={'INPUT'}
										id={'description'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.call_to_action}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'call_to_action'}
										label={'call to action'}
										dispatch={dispatch}
										placeholder={'Add call to action'}
										dispatch_type={'INPUT'}
										id={'call_to_action'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.destination}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'destination'}
										label={'destination'}
										dispatch={dispatch}
										placeholder={'Add destination'}
										dispatch_type={'INPUT'}
										id={'destination'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.tracking}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'tracking'}
										label={'tracking'}
										dispatch={dispatch}
										placeholder={'Add tracking'}
										dispatch_type={'INPUT'}
										id={'tracking'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.number}
									</span>
									<InputMain
										type="number"
										require={true}
										name={'number'}
										label={'number'}
										dispatch={dispatch}
										placeholder={'Add number'}
										dispatch_type={'INPUT'}
										id={'number'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.last_description}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'last_description'}
										label={'last description'}
										dispatch={dispatch}
										placeholder={'Add last description'}
										dispatch_type={'INPUT'}
										id={'last_description'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.status}
									</span>
									<label className="form-label">Status</label>
									<select
										onChange={(e) =>
											dispatch({
												type: 'INPUT',
												payload: {
													name: e.target.name,
													value: e.target.value,
												},
											})
										}
										defaultValue="pending"
										name="status"
										className="form-control here set-slug"
										aria-label=".form-select-sm example"
									>
										<option value="pending">Pending</option>
										<option value="progress">progress</option>
										<option value="complited">complited</option>
										<option value="cancel">cancel</option>
									</select>
								</div>
							</div>
							{/* <div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<span className="position-absolute mt-3 error">
										{error?.advertise_audience_file}
									</span>
									<InputMain
										type="text"
										require={true}
										name={'advertise_audience_file'}
										label={'advertise audience file'}
										dispatch={dispatch}
										placeholder={'Add advertise audience file'}
										dispatch_type={'INPUT'}
										id={'advertise_audience_file'}
									/>
								</div>
							</div> */}
							<div className="col-12">
								<p className="mb-3">Location Files</p>
								<div className="form-group mb-6 advertiser_store_image_preview">
									<div className="custom-file">
										<input
											type="file"
											multiple
											onChange={(e) =>
												dispatch({
													type: 'MULTI_FILE',
													payload: {
														name: e.target.name,
														value: e.target.files,
														url: 'location_files_url',
													},
												})
											}
											name="location_files"
											className="custom-file-input"
											id="coverImage"
											accept="image/*"
										/>
										<label className="custom-file-label" htmlFor="coverImage">
											Choose file...
										</label>
									</div>
									<div className="pre_imag-view">
										{state?.location_files_url?.map((e) => (
											<img src={e} alt="asdad" />
										))}
									</div>
								</div>
							</div>
							<div className="col-12">
								<p className="mb-3">Advertise Audience Files</p>
								<div className="form-group mb-6 advertiser_store_image_preview">
									<div className="custom-file">
										<input
											type="file"
											multiple
											onChange={(e) =>
												dispatch({
													type: 'MULTI_FILE',
													payload: {
														name: e.target.name,
														value: e.target.files,
														url: 'advertise_audience_files_url',
													},
												})
											}
											name="advertise_audience_files"
											className="custom-file-input"
											id="advertise_audience_files"
											accept="image/*"
										/>
										<label
											className="custom-file-label"
											htmlFor="advertise_audience_files"
										>
											Choose file...
										</label>
									</div>
									<div className="pre_imag-view">
										{state?.advertise_audience_files_url?.map((e) => (
											<img src={e} alt="asdad" />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer px-4">
						<Link
							to={'/admin/advertise-content'}
							className="btn btn-secondary btn-pill"
						>
							Cancel
						</Link>
						<button
							disabled={loading}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Save Companions</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AdvertiserStore;
