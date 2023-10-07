import React, { useState } from 'react';
import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../components/action/tost';
import { useReducer } from 'react';
import TextAreaEdit from '../../../../components/formComponent/TextAreaEdit';
import VendorAddImagePreview from '../../vendor/own-components/VendorAddImagePreview';
import { Helmet } from 'react-helmet';
import { GetAdminHomeSettingData } from '../../../../api/admin/apiAdmin';
import InputEdit from '../../../../components/formComponent/InputEdit';
import EditLoader from '../../../../components/loader/EditLoader';
import { initialState, reducer } from './actions';
import { removeNullAndDelete_urlObj } from '../../../../components/action/actions';

const GeneralContentUpdate = () => {
	const [loading, setLoading] = useState(false);
	const { homeData, refetch, isLoading } = GetAdminHomeSettingData();
	const [state, dispatch] = useReducer(reducer, initialState);
	const values = removeNullAndDelete_urlObj(state);
	console.log(values);
	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.post(
				`/admin/settings-update/1`,
				{ ...values, _method: 'POST' },
				multipartConfig
			);
			console.log(data);

			if (data.status === 400) {
				tost(data?.data?.errors.name[0]);
			} else if (data.status === 200) {
				tost(data?.data.message);
				refetch();
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);

			tost('try later, something is wrong');

			console.error(error);
		}
	};

	return (
		<div>
			{isLoading ? (
				<div style={{ display: 'block' }} className="modal-header px-4">
					<h5
						style={{
							fontSize: '28px',
							fontWeight: 'bold',
						}}
						className="modal-title"
						id="exampleModalCenterTitle"
					>
						Update General Content
					</h5>
					<EditLoader />
					<EditLoader />
					<EditLoader />
				</div>
			) : (
				<form
					onSubmit={handleSubmitData}
					style={{ maxWidth: '90%', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<Helmet>
						<title>Update General Content-SOS</title>
					</Helmet>
					<div className="modal-header px-4">
						<h5
							style={{
								fontSize: '28px',
								fontWeight: 'bold',
							}}
							className="modal-title"
							id="exampleModalCenterTitle"
						>
							Update General Content
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							{/* logo start */}
							<div className="col-lg-12">
								<div className="form-group row mb-2">
									<label htmlFor="">Navbar Logo</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.logo_url
												? state?.logo_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.logo}`
										}
										multi={true}
										url_name={'logo_url'}
										name="logo"
									/>
								</div>
							</div>
							{/* logo end */}

							{/* footer start */}
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'newsletter_title'}
										label={'Newsletter Title'}
										dispatch={dispatch}
										defaultValue={homeData?.newsletter_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										type="text"
										name={'newsletter_description'}
										label={'Newsletter Description'}
										dispatch={dispatch}
										defaultValue={homeData?.newsletter_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										type="text"
										name={'footer_description'}
										label={'Footer Description'}
										dispatch={dispatch}
										defaultValue={homeData?.footer_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'footer_contact_address'}
										label={'Address'}
										dispatch={dispatch}
										defaultValue={homeData?.footer_contact_address}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'footer_contact_number'}
										label={'Contact Number'}
										dispatch={dispatch}
										defaultValue={homeData?.footer_contact_number}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group row mb-2">
									<label htmlFor="">Footer Image</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.footer_image_url
												? state?.footer_image_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.footer_image}`
										}
										multi={true}
										url_name={'footer_image_url'}
										name="footer_image"
									/>
								</div>
							</div>

							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'copywright_text'}
										label={'Copywright Text'}
										dispatch={dispatch}
										defaultValue={homeData?.copywright_text}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'credit_name'}
										label={'Credit Name'}
										dispatch={dispatch}
										defaultValue={homeData?.credit_name}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'credit_link'}
										label={'Credit Link'}
										dispatch={dispatch}
										defaultValue={homeData?.credit_link}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* footer end */}
						</div>
					</div>

					<div className="modal-footer px-4">
						<Link to={'/'} className="btn btn-secondary btn-pill">
							Cancel
						</Link>
						<button
							disabled={loading}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Update</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default GeneralContentUpdate;
