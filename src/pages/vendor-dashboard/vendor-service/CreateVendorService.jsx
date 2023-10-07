import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { useState } from 'react';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import tost from '../../../components/action/tost';
import { useEffect } from 'react';
import { GetVendorCategoryAndSub } from '../../../api/admin/vendorApi';
import { initialState1, reducer1 } from './action/service1Action';
import { initialState2, reducer2 } from './action/service2Action';
import Service1 from './own-components/Service1';
import Service2 from './own-components/Service2';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
// import { IMG_PATH } from '../../../../../components/env';

const CreateVendorService = () => {
	const navigate = useNavigate();
	const [click, setClick] = useState(false);
	const [loading, setLoading] = useState(false);
	const { categoryAndSubData, isLoading } = GetVendorCategoryAndSub();
	const [state1, dispatch1] = useReducer(reducer1, initialState1);
	const [state2, dispatch2] = useReducer(reducer2, initialState2);

	useEffect(() => {
		if (categoryAndSubData) {
			dispatch1({
				type: 'API_DATA',
				payload: categoryAndSubData,
			});
		}
	}, [categoryAndSubData]);

	const handleSubmitCompanions = async (e) => {
		e.preventDefault();
		setLoading(true);
		const service2Data = {
			package_title: [
				state2.data.package_title__1,
				state2.data.package_title__2,
				state2.data.package_title__3,
			],
			time: [state2.data.times__1, state2.data.times__2, state2.data.times__3],
			revision_max_time: [
				state2.data.revision_max_time__1,
				state2.data.revision_max_time__2,
				state2.data.revision_max_time__3,
			],
			price: [state2.data.price__1, state2.data.price__2, state2.data.price__3],
			package_description: [
				state2.data.package_description__1,
				state2.data.package_description__2,
				state2.data.package_description__3,
			],
		};
		let getState1 = { ...state1.data };

		try {
			const data = await http.post(
				`/main-services`,
				{
					...getState1,
					...service2Data,
				},
				multipartConfig
			);
			if (data.data?.data !== 'success') {
				if (data.data.message === 'Validation errors') {
					const vError = data?.data?.data;
					let getErrors = {
						package_title: vError['package_title']
							? vError['package_title']
							: null,
						time: vError['time'] ? vError['time'] : null,
						price: vError['price'] ? vError['price'] : null,
						package_description: vError['package_description']
							? vError['package_description']
							: null,
						revision_max_time: vError['revision_max_time']
							? vError['revision_max_time']
							: null,
					};

					dispatch2({
						type: 'RES_VALIDATION',
						payload: getErrors,
					});
				}
				tost(data?.data?.message);
			} else if (data.data?.data === 'success') {
				navigate('/vendors-dashboard/all-services');
				tost(data?.data?.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	// loader
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div style={{ margin: '20px' }}>
			<Helmet>
				<title>Create Service-SOS</title>
			</Helmet>
			<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
				<div>
					<h1>Add Service</h1>
					<p className="breadcrumbs">
						<span>
							<a href="/">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Service
					</p>
				</div>
				<div>
					<Link
						className="btn btn-primary"
						to="/vendors-dashboard/all-services"
					>
						See All
					</Link>
				</div>
			</div>

			<form
				data-aos="fade"
				onSubmit={handleSubmitCompanions}
				className="ec-cat-form shadow"
			>
				{!click ? (
					<Service1
						state={state1}
						click={click}
						loading={loading}
						dispatch={dispatch1}
						setClick={setClick}
						isLoading={isLoading}
					/>
				) : (
					<Service2
						handleSubmitCompanions={handleSubmitCompanions}
						state={state2}
						click={click}
						loading={loading}
						setClick={setClick}
						dispatch={dispatch2}
					/>
				)}
			</form>
		</div>
	);
};

export default CreateVendorService;
