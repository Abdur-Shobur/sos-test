import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import tost from '../../../components/action/tost';
import { reducer } from './action/add/AddVendorReducer';
import React, { useEffect, useReducer, useState } from 'react';
import { initialState } from './action/add/AddVendorInitialState';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputMain from '../../../components/formComponent/InputMain';
import SelectMain from '../../../components/formComponent/SelectMain';
import VendorAddImagePreview from './own-components/VendorAddImagePreview';

function AdminAddNewVendor() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const nextUrl =
		location?.state?.from.pathname || '/admin/vendors/all-vendors';

	const addVendorHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const res = await http.post(`/vendor/store`, state, multipartConfig);

			if (res.data.status === 200) {
				dispatch({
					type: 'RESET',
				});
				tost(res.data.message);
				setError({});
				navigate(nextUrl);
				e.target.reset();
			} else if (res.data.status === 400) {
				setError(res.data.errors);
			}
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
		e.target.reset();
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<form
			data-aos="fade"
			style={{ maxWidth: '600px', margin: '20px auto' }}
			onSubmit={addVendorHandler}
			className="ec-cat-form shadow p-4"
		>
			<Helmet>
				<title>Add New Vendor-SOS</title>
			</Helmet>
			<div className="modal-header px-4">
				<h5 className="modal-title" id="exampleModalCenterTitle">
					Add New Vendor
				</h5>
			</div>

			<div className="modal-body px-4">
				<div className="form-group row mb-6">
					<VendorAddImagePreview dispatch={dispatch} data={state.url} />
				</div>

				<div className="row mb-2">
					<div className="col-lg-6">
						<div className="form-group mb-4 position-relative">
							<span className="position-absolute mt-3 error">
								{error?.name}
							</span>
							<InputMain
								type="text"
								name={'name'}
								label={'Name'}
								require={true}
								dispatch={dispatch}
								placeholder={'Name'}
								dispatch_type={'INPUT'}
								id={'admin-add-vendor-name'}
							/>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="form-group mb-4 position-relative">
							<span className="position-absolute mt-3 error">
								{error?.email}
							</span>
							<InputMain
								type="email"
								name={'email'}
								require={true}
								label={'Email'}
								dispatch={dispatch}
								placeholder={'Email'}
								dispatch_type={'INPUT'}
								id={'admin-add-vendor-email'}
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
								label={'Number'}
								dispatch={dispatch}
								placeholder={'Number'}
								dispatch_type={'INPUT'}
								id={'admin-add-vendor-number'}
							/>
						</div>
					</div>

					<div className="col-lg-6">
						<div className="form-group mb-4 position-relative">
							<span className="position-absolute mt-3 error">
								{error?.password}
							</span>
							<InputMain
								require={true}
								type="password"
								name={'password'}
								label={'Password'}
								dispatch={dispatch}
								autoComplete={true}
								dispatch_type={'INPUT'}
								placeholder={'Password'}
								id={'admin-add-vendor-password'}
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
								require={false}
								name={'balance'}
								label={'Balance'}
								dispatch={dispatch}
								placeholder={'Balance'}
								dispatch_type={'INPUT'}
								id={'admin-add-vendor-amount'}
							/>
						</div>
					</div>

					<div className="col-md-6">
						<div className="form-group row">
							<SelectMain dispatch={dispatch} />
						</div>
					</div>
				</div>
			</div>

			<div className="modal-footer px-4">
				<Link
					to={'/admin/vendors/all-vendors'}
					className="btn btn-secondary btn-pill"
				>
					Cancel
				</Link>
				<button
					type="submit"
					disabled={loading}
					className="btn btn-primary btn-pill d-flex align-items-center"
				>
					<span style={{ marginRight: '2px' }}>Save Vendor</span>{' '}
					{loading && <ClockLoader color="#fff" size={15} />}
				</button>
			</div>
		</form>
	);
}

export default AdminAddNewVendor;
