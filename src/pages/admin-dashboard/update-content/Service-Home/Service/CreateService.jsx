import React, { useEffect } from 'react';
// import { IconPicker } from 'react-fa-icon-picker';
import { Link, useNavigate } from 'react-router-dom';
import InputMain from '../../../../../components/formComponent/InputMain';
import { useReducer } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';
import TextArea from '../../../../../components/formComponent/TextArea';
import { http } from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
import CommonBreadCrumbs from '../../../../../components/breadcrumbs/CommonBreadCrumbs';
import Aos from 'aos';

const CreateService = () => {
	const navigate = useNavigate();

	const initialState = {
		data: {
			icon: 'FaAdobe',
			title: '',
			description: '',
		},
		required: { title: true, description: true },
	};
	const reducer = (state = initialState, action) => {
		switch (action.type) {
			case 'INPUT':
				return {
					...state,
					data: {
						...state.data,
						[action.payload.name]: action.payload.value,
					},
					required: {
						...state.required,
						[action.payload.name]: action?.payload?.value?.trim()
							? false
							: true,
					},
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);

	const handleSubmitService = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(state);
		const getData = { ...state.data };
		try {
			const data = await http.post(`/admin/service`, getData);
			console.log('service', data);
			if (data.data.status === 400) {
				if (data.data.errors.title) {
					tost(data?.data?.errors.title[0]);
				} else {
					tost(data?.data?.errors.description[0]);
				}
			} else if (data.data.status === 200) {
				navigate('/admin/service');
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
				<title>Add New Service-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Add Service"
					link={{ name: 'All Service', path: '/admin/service' }}
				/>
				<form
					data-aos="fade"
					onSubmit={handleSubmitService}
					style={{ maxWidth: '600px', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Add New Service
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							<div className="col-lg-12">
								<div className="form-group mb-4 position-relative">
									<InputMain
										type="text"
										name={'title'}
										label={'Title'}
										require={true}
										dispatch={dispatch}
										placeholder={'Title'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-12 mb-3">
								<label htmlFor="">Icon</label>
								{/* {/* <IconPicker
									value={state.data.icon}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'icon',
												value: e,
											},
										})
									}
								/> */}{' '}
								*/}
							</div>

							<div className="col-lg-12">
								<div className="form-group mb-4 position-relative">
									<TextArea
										label={'Description'}
										name={'description'}
										require={true}
										dispatch={dispatch}
										placeholder={'Description'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer px-4">
						<Link to={'/admin/service'} className="btn btn-secondary btn-pill">
							Cancel
						</Link>
						<button
							disabled={
								loading || Object.values(state.required).some((error) => error)
							}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Create Service</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateService;
