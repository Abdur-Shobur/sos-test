import React, { useReducer, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import BrandFile from '../../../components/formComponent/BrandFile';
import InputMain from '../../../components/formComponent/InputMain';
import SelectMain from '../../../components/formComponent/SelectMain';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';

import { reducer } from './action/add/addReducer';
import { useNavigate } from 'react-router-dom';
import { initialState } from './action/add/initialState';
import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import tost from '../../../components/action/tost';

function BrandAdd() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	 
	const brand_add = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const data = await http.post(`/store-brand`, state, multipartConfig);

			if (data.data.status === 400) {
				tost(data?.data?.errors.name[0]);
			} else if (data.data.status === 200) {
				navigate('/admin/brand-list');
				tost(data?.data.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div data-aos="fade">
			<Helmet>
				<title>Brands Add-SOS</title>
			</Helmet>
			<div
				className="modal-dialog modal-dialog-centered modal-sm shadow"
				role="document"
			>
				<div className="modal-content">
					<div
						className="modal-body p-0"
						data-simplebar
						style={{ minHeight: '320px' }}
					>
						<h5 className="mt-5 ml-3">Add new Brand</h5>

						<form
							onSubmit={brand_add}
							className="modal-header border-bottom-0 flex-column"
						>
							<div className="w-100 mt-3">
								<InputMain
									dispatch={dispatch}
									dispatch_type={'INPUT'}
									label={'Brand Name'}
									name={'name'}
									placeholder={'Brand Name'}
									type={'text'}
								/>
							</div>

							<div className="row w-100 mt-3">
								<SelectMain dispatch={dispatch} />
							</div>
							<div className="w-100 mt-3">
								<BrandFile dispatch={dispatch} preview={preview} />
							</div>
							<div className="w-100 mt-3 mb-1 text-center">
								<img
									style={{
										maxWidth: '100px',
										maxHeight: '100px',
										objectFit: 'contain',
									}}
									src={state.url || preview}
									alt=""
								/>
							</div>
							<div className="modal-footer px-4">
								<button
									onClick={() => navigate('/admin/brand-list')}
									type="button"
									className="btn btn-secondary btn-pill"
								>
									Cancel
								</button>

								<button
									disabled={loading}
									type="submit"
									className="btn btn-primary btn-pill d-flex align-items-center"
								>
									<span style={{ marginRight: '2px' }}>Create</span>{' '}
									{loading && <ClockLoader color="#fff" size={15} />}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BrandAdd;
