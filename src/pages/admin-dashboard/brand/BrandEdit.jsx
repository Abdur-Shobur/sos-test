import React, { useEffect, useReducer, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import { reducer } from '../../../components/action/reducerAction';
import BrandFile from '../../../components/formComponent/BrandFile';
import Input from '../../../components/formComponent/InputEdit';
import Select from '../../../components/formComponent/SelectEdit';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';
import EditLoader from '../../../components/loader/EditLoader';
import { Helmet } from 'react-helmet';
import { GetBrandsById } from '../../../api/admin/brandAPI';
import tost from '../../../components/action/tost';

function BrandEdit() {
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	// get edit brand
	const { editableData, isLoading } = GetBrandsById(id);
	const initialState = {};
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: editableData,
		});
	}, [editableData]);

	const brand_update = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const data_fetch = await http.post(
				`/update-brand/${id}`,
				state,
				multipartConfig
			);

			if (data_fetch.data.status === 200) {
				navigate('/admin/brand-list');
				tost(data_fetch.data.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};
	return isLoading ? (
		<div className="d-flex justify-content-center align-items-center h-100">
			<EditLoader />
		</div>
	) : (
		<div>
			<Helmet>
				<title>Brands Edit-SOS</title>
			</Helmet>
			<div
				className="modal-dialog modal-dialog-centered modal-sm justify-content-center "
				role="document"
			>
				<div className=" ">
					<div className="modal-dialog">
						<div className="modal-content shadow">
							<div className="modal-header">
								<h5 className="modal-title" id="staticBackdropLabel">
									Edit Brand
								</h5>
								<Link to={'/admin/brand-list'} className="btn-close"></Link>
							</div>
							{isLoading ? (
								<div className="modal-header border-bottom-0 flex-column text-start">
									<div className="w-100">
										<label htmlFor="Loading">Brand Name</label>
										<input
											name="Loading"
											type="text"
											className="form-control"
											placeholder="Loading..."
											readOnly
										/>
									</div>
									<div className="w-100 mt-3">
										<label htmlFor="Loading">Status</label>
										<input
											name="Loading"
											type="text"
											className="form-control"
											placeholder="Loading..."
											readOnly
										/>
									</div>

									<div className="w-100 mt-3">
										<BrandFile />
									</div>
									<div className="w-100 mt-3 mb-1 text-center">
										<img
											style={{
												maxWidth: '100px',
												maxHeight: '100px',
												objectFit: 'contain',
											}}
											src={preview}
											alt=""
										/>
									</div>
									<div className="modal-footer px-4">
										<Link
											to={'/brand-list'}
											className="btn btn-secondary btn-pill"
										>
											Cancel
										</Link>
										{/* <button type="submit" className="btn btn-primary btn-pill">
									Update
								</button> */}

										<button
											disabled={loading}
											type="button"
											className="btn btn-primary btn-pill d-flex align-items-center"
										>
											Loading...
										</button>
									</div>
								</div>
							) : (
								<form
									onSubmit={brand_update}
									className="modal-header border-bottom-0 flex-column text-start"
								>
									<div className="w-100">
										<Input
											label={'Brand Name'}
											name={'name'}
											placeholder={'Brand Name'}
											defaultValue={editableData?.name}
											dispatch={dispatch}
											required={false}
											type={'text'}
										/>
									</div>

									<div className="row w-100 mt-3">
										<Select defaultValue={state?.status} dispatch={dispatch} />
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
											src={
												state.url ||
												`${process.env.REACT_APP_IMG_URL}/${state.image}`
											}
											alt=""
										/>
									</div>
									<div className="modal-footer px-4">
										<Link
											to={'/admin/brand-list'}
											className="btn btn-secondary btn-pill"
										>
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default BrandEdit;
