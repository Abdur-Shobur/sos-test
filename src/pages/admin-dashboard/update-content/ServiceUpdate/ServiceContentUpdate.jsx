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
import { Helmet } from 'react-helmet';
import { GetAdminHomeSettingData } from '../../../../api/admin/apiAdmin';
import InputEdit from '../../../../components/formComponent/InputEdit';
import EditLoader from '../../../../components/loader/EditLoader';
import { initialState, reducer } from './actions';
import { removeNullAndDelete_urlObj } from '../../../../components/action/actions';

const ServiceContentUpdate = () => {
	const [loading, setLoading] = useState(false);
	const { homeData, refetch, isLoading } = GetAdminHomeSettingData();
	const [state, dispatch] = useReducer(reducer, initialState);
	const values = removeNullAndDelete_urlObj(state);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.post(
				`/admin/settings-update/1`,
				{ ...values, _method: 'POST' },
				multipartConfig
			);

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
						Update Service Content
					</h5>
					<EditLoader />
				</div>
			) : (
				<form
					onSubmit={handleSubmitData}
					style={{ maxWidth: '90%', margin: '20px auto' }}
					className="ec-cat-form shadow p-4"
				>
					<Helmet>
						<title>Update Service Content-SOS</title>
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
							Update Service Content
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							{/* home banner start */}
							<div className="col-lg-12">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'service_banner_heading'}
										label={'Banner Header'}
										require={true}
										dispatch={dispatch}
										defaultValue={homeData?.service_banner_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-12">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Banner Description'}
										name={'service_banner_description'}
										require={true}
										dispatch={dispatch}
										defaultValue={homeData?.service_banner_description}
										placeholder={'Email'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* home banner end */}
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

export default ServiceContentUpdate;
