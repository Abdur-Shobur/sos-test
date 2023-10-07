import React, { useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import BrandFile from '../../../components/formComponent/BrandFile';
import InputMain from '../../../components/formComponent/InputMain';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';

import { reducer } from './action/add/addReducer';
import { useNavigate } from 'react-router-dom';
import { initialState } from './action/add/initialState';

function VendorBrandAdd() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const brand_add = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const data = await http.post(
				`/vendor-brand-create`,
				state,
				multipartConfig
			);

			if (data.data.status === 400) {
				toast(data?.data?.errors.name[0], {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else if (data.data.status === 200) {
				navigate('/vendors-dashboard/brand');
				toast(data?.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};
	return (
		<div>
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
								<label className="form-label">Status</label>
								<select
									className="form-control here set-slug"
									aria-label=".form-select-sm example"
								>
									<option disabled value="pending">
										Pending
									</option>
									<option selected value="active">
										Active
									</option>
								</select>
							</div>
							<div className="w-100 mt-3">
								<BrandFile dispatch={dispatch} />
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
									onClick={() => navigate('/vendors-dashboard/brand')}
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

export default VendorBrandAdd;
