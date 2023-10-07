import React, { useReducer, useState } from 'react';

import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import { categoryReducer } from './action/add/CategoryReducer';
import { initialState } from './action/add/initialState';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../components/action/tost';

function AddNewCategory({ refetch, isLoading }) {
	const [value, setValue] = useState([]);
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const [state, dispatch] = useReducer(categoryReducer, initialState);

	// image preview
	function handleChange(e) {
		dispatch({
			type: 'FILE',
			payload: e.target.files[0],
		});
	}
	const handel_category_create = async (e) => {
		setLoading(true);
		e.preventDefault();

		const data = {
			...state,
			tags: value.map((e) => e.value).toString(),
		};

		http.post(`/store-category`, data, multipartConfig).then((res) => {
			if (res.data.status === 400) {
				setError(res.data.errors);
				tost(res.data.errors.name[0]);
			} else if (res.data.status === 200) {
				refetch();
				setError({});
				tost(res.data.message);
			}
			setLoading(false);
		});
		e.target.reset();
	};

	return (
		<div className="col-xl-4 col-lg-12">
			<div className="ec-cat-list card card-default mb-24px">
				<div className="card-body">
					<div className="ec-cat-form">
						<h4>Add New Category</h4>

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
											src={state.url}
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
								<span className="error">{error.name}</span>
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
										className="form-control here slug-title"
										type="text"
										required
										placeholder="Name"
									/>
								</div>
							</div>

							<div className="form-group row">
								<label className="col-12 col-form-label">Status</label>
								<select
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: e.target.name,
												value: e.target.value,
											},
										})
									}
									defaultValue="pending"
									name="status"
									className="form-control here set-slug"
									aria-label=".form-select-sm example"
								>
									<option value="pending">Pending</option>
									<option value="active">Active</option>
								</select>
							</div>

							<div className="row">
								<div className="col-12">
									<button
										disabled={loading}
										type="submit"
										className="btn btn-primary btn-pill d-flex align-items-center"
									>
										<span style={{ marginRight: '2px' }}>Create</span>
										{loading && <ClockLoader color="#fff" size={15} />}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddNewCategory;
