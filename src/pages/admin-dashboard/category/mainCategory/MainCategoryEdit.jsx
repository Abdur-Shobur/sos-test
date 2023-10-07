import React, { useEffect, useReducer, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';

import { initialState, reducer } from './action/edit/editReducer';
import preview from '../../../../assets/icons/category.webp';
import LoaderInput from '../../../../components/formComponent/LoaderInput';
import Aos from 'aos';
import EditLoader from '../../../../components/loader/EditLoader';
import { GetCategoryById } from '../../../../api/admin/categoryAPI';
import tost from '../../../../components/action/tost';

function MainCategoryEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	// get editable data
	const { editableData, isLoading } = GetCategoryById(id);

	// image preview state
	const [file, setFile] = useState(null);

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: editableData,
		});
	}, [editableData]);

	// image preview
	function handleChange(e) {
		dispatch({
			type: 'FILE',
			payload: e.target.files[0],
		});
		setFile(URL.createObjectURL(e.target.files[0]));
	}

	const handel_category_create = async (e) => {
		setLoading(true);
		e.preventDefault();
		const data = {
			...state,
		};

		http.post(`/update-category/${id}`, data, multipartConfig).then((e) => {
			if (e.data.status === 200) {
				navigate('/admin/main-category');
				tost(e.data.message);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return loading ? (
		<div className="d-flex justify-content-center align-items-center h-100">
			<EditLoader />
		</div>
	) : (
		<div
			data-aos="fade"
			style={{ maxWidth: '600px', width: '100%', margin: '20px auto' }}
			className="card-body shadow p-4"
		>
			<div className="ec-cat-form">
				<h4>Edit Category</h4>

				<form onSubmit={handel_category_create}>
					<div className="form-group row">
						<div className="d-flex align-items-center gap-3">
							<div>
								<img
									style={{
										width: '75px',
										height: '75px',
										borderRadius: '50%',
										objectFit: 'cover',
									}}
									// src={
									// 	file
									// 		? file
									// 		: `${process.env.REACT_APP_IMG_URL}/${editableData?.image}`
									// }
									src={
										file
											? file
											: editableData?.image === null
											? preview
											: `${process.env.REACT_APP_IMG_URL}/${editableData?.image}`
									}
									alt=""
								/>
							</div>
							<div className="custom-file ml-3">
								<input
									type="file"
									onChange={handleChange}
									name="image"
									className="custom-file-input"
									id="coverImage"
								/>
								<label className="custom-file-label" htmlFor="coverImage">
									Choose file...
								</label>
								<div className="invalid-feedback">
									Example invalid custom file feedback
								</div>
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="text" className="col-12 col-form-label">
							Name
						</label>
						<div className="col-12">
							<input
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: { name: e.target.name, value: e.target.value },
									})
								}
								id="text"
								name="name"
								defaultValue={editableData?.name}
								className="form-control here slug-title"
								type="text"
							/>
						</div>
					</div>

					<div className="form-group row">
						{isLoading ? (
							<LoaderInput label="Status" />
						) : (
							<select
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: { name: e.target.name, value: e.target.value },
									})
								}
								defaultValue={editableData?.status}
								name="status"
								className="form-control here set-slug"
								aria-label=".form-select-sm example"
							>
								<option
									selected={editableData?.status === 'pending'}
									value="pending"
								>
									Pending
								</option>
								<option
									selected={editableData?.status === 'active'}
									value="active"
								>
									Active
								</option>
							</select>
						)}
					</div>

					<div className="modal-footer px-4">
						<Link
							to={'/admin/main-category'}
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
			</div>
		</div>
	);
}

export default MainCategoryEdit;
