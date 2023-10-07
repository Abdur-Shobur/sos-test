import React, { useEffect } from 'react';
// import { IconPicker } from 'react-fa-icon-picker';
import { Link, useNavigate } from 'react-router-dom';
import InputMain from '../../../../../components/formComponent/InputMain';
import { useReducer } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';
import { http } from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
import CommonBreadCrumbs from '../../../../../components/breadcrumbs/CommonBreadCrumbs';
import Aos from 'aos';

const CreateFooter = () => {
	const navigate = useNavigate();

	const initialState = {
		data: {
			icon_class: 'FaAdobe',
			media_link: null,
		},
		required: {
			icon_class: true,
			media_link: true,
		},
		apiRes: {
			media_link: null,
		},
	};
	const reducer = (state = initialState, action) => {
		switch (action.type) {
			case 'INPUT':
				const link = action.payload.value;
				const urlPattern =
					/^(https?:\/\/)?([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}([\/\?\#].*)?$/i;
				const isValidUrl = !urlPattern.test(link);

				return {
					...state,
					data: {
						...state.data,
						[action.payload.name]: action.payload.value,
					},
					required: {
						...state.required,
						[action.payload.name]: action.payload.value.trim() ? false : true,
					},
					apiRes: {
						...state.apiRes,
						[action.payload.name]: isValidUrl ? 'Must be a valid url' : null,
					},
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);
		const getData = { ...state.data };
		try {
			const data = await http.post(`/admin/footer-media`, getData);
			if (data.data.status === 400) {
				tost(data?.data?.errors.media_link[0]);
			} else if (data.data.status === 200) {
				navigate('/admin/footer');
				tost(data?.data.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div>
			<Helmet>
				<title>Add New Social Media-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Add Social Media"
					link={{ name: 'All Social Media', path: '/admin/footer' }}
				/>
				<form
					data-aos="fade"
					onSubmit={handleSubmitData}
					style={{ maxWidth: '600px', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Add New Footer
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							<div className="col-lg-12">
								<div className="form-group mb-4 position-relative">
									<InputMain
										type="text"
										name={'media_link'}
										label={'Media Link'}
										require={true}
										dispatch={dispatch}
										placeholder={'Media Link'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
										error={
											state?.apiRes?.media_link
												? state?.apiRes?.media_link
												: null
										}
									/>
								</div>
							</div>

							<div className="col-lg-12 mb-3">
								<label htmlFor="">Icon</label>
								<IconPicker
									value={state.data.icon_class}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'icon_class',
												value: e,
											},
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="modal-footer px-4">
						<Link to={'/admin/footer'} className="btn btn-secondary btn-pill">
							Cancel
						</Link>
						<button
							disabled={
								loading || Object.values(state.required).every((error) => error)
							}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Create Social Media</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateFooter;
