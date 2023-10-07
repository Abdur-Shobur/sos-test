import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputMain from '../../../../components/formComponent/InputMain';
import { useReducer } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';
// import { IconPicker } from 'react-fa-icon-picker';
import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';
import CommonBreadCrumbs from '../../../../components/breadcrumbs/CommonBreadCrumbs';
import { useEffect } from 'react';
import Aos from 'aos';

const CreateMissions = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const initialState = {
		data: {
			icon_class: 'FaAdobe',
			title: '',
		},
		required: { icon_class: true },
	};

	const reducer = (state, action) => {
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
						[action.payload.name]: action.payload.value.trim() ? false : true,
					},
				};
			default:
				return { state };
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmitMission = async (e) => {
		e.preventDefault();
		setLoading(true);
		const getData = { ...state.data };
		try {
			const data = await http.post(`/admin/mission`, getData);

			if (data.data.status === 400) {
				tost(data?.data?.errors.name[0]);
			} else if (data.data.status === 200) {
				navigate('/admin/missions');
				tost(data?.data.message);
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
		setLoading(false);
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div>
			<Helmet>
				<title>Add New Mission-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Add New Mission"
					link={{ name: 'All Mission', path: '/admin/missions' }}
				/>
				<form
					data-aos="fade"
					onSubmit={handleSubmitMission}
					style={{ maxWidth: '600px', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Add New Mission
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
						<Link to={'/admin/missions'} className="btn btn-secondary btn-pill">
							Cancel
						</Link>
						<button
							disabled={
								loading || Object.values(state.required).every((error) => error)
							}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Create Mission</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateMissions;
