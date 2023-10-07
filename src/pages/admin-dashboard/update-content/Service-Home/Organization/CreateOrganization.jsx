import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ClockLoader } from 'react-spinners';
import TextArea from '../../../../../components/formComponent/TextArea';
import { http } from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
import CommonBreadCrumbs from '../../../../../components/breadcrumbs/CommonBreadCrumbs';
import Aos from 'aos';

const CreateOrganization = () => {
	const navigate = useNavigate();

	const initialState = {
		data: {
			description: '',
		},
		required: {
			description: true,
		},
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
	const [loading, setLoading] = useState(false);

	const handleSubmitService = async (e) => {
		e.preventDefault();
		setLoading(true);
		const getData = { ...state.data };
		try {
			const data = await http.post(`/admin/organization`, getData);
			if (data.data.status === 400) {
				tost(data?.data?.errors.description[0]);
			} else if (data.data.status === 200) {
				navigate('/admin/organization');
				tost(data?.data.message);
			}

			e.target.reset();
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
				<title>Add New Organization-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Add Organization"
					link={{ name: 'All Organization', path: '/admin/organization' }}
				/>
				<form
					data-aos="fade"
					onSubmit={handleSubmitService}
					style={{ maxWidth: '600px', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Add New Organization
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
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
						<Link
							to={'/admin/organization'}
							className="btn btn-secondary btn-pill"
						>
							Cancel
						</Link>
						<button
							disabled={
								loading || Object.values(state.required).every((error) => error)
							}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Create Organization</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateOrganization;
