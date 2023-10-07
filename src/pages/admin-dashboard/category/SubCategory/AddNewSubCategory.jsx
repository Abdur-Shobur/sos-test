import React, { useEffect, useReducer, useState } from 'react';
import { ClockLoader } from 'react-spinners';
import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import { initialState } from './action/add/initialState';
import { reducer } from './action/add/subCategoryReducer';
import { Helmet } from 'react-helmet';
import { GetCategoryData } from '../../../../api/admin/categoryAPI';
import tost from '../../../../components/action/tost';

function AddNewSubCategory({ refetch, isLoading }) {
	const [error, setError] = useState({ name: '', category_id: '' });
	const [loading, setLoading] = useState(false);
	// get all category list
	const { category } = GetCategoryData();
	const [state, dispatch] = useReducer(reducer, initialState);

	const activeCategory = category?.filter((e) => e.status === 'active');

	useEffect(() => {
		dispatch({
			type: 'CATEGORY_ID',
			payload: activeCategory?.map((e) => e.id)[0],
		});
	}, [category]);

	const handel_category_create = async (e) => {
		e.preventDefault();
		setLoading(true);
		http.post(`/store-subcategory`, state, multipartConfig).then((response) => {
			if (response.data.status === 200) {
				refetch();
				setError({});
				tost(response.data.message);
			} else if (response.data.status === 400) {
				setError(response.data.errors);
			}

			setLoading(false);
		});
		e.target.reset();
		dispatch({
			type: 'CLEAR',
			payload: activeCategory?.map((e) => e.id)[0],
		});
	};

	return (
		<div className="col-xl-4 col-lg-12">
			<Helmet>
				<title>SOS-Sub Category</title>
			</Helmet>
			<div className="ec-cat-list card card-default mb-24px">
				<div className="card-body">
					<div className="ec-cat-form">
						<h4>Add Sub Category</h4>

						<form onSubmit={handel_category_create}>
							<div className="form-group row">
								<label
									htmlFor="name"
									className="col-12 col-form-label position-relative"
								>
									<span>Name</span>
									<span className="position-absolute error start-0 mt-3">
										{error.name}
									</span>
								</label>
								<div className="col-12">
									<input
										onChange={(e) =>
											dispatch({
												type: 'INPUT',
												payload: {
													name: e.target.name,
													value: e.target.value,
												},
											})
										}
										id="text"
										name="name"
										className="form-control here slug-title"
										type="text"
										placeholder="Sub Category Name"
									/>
								</div>
							</div>

							<div className="form-group row">
								<label
									htmlFor="parent-category"
									className="col-12 col-form-label position-relative"
								>
									<span>Parent Category</span>
									<span className="position-absolute error start-0 mt-3">
										{error.category_id}
									</span>
								</label>
								<div className="col-12">
									<select
										id="parent-category"
										name="category_id"
										className="custom-select"
										defaultValue={state.category_id}
										onChange={(e) =>
											dispatch({
												type: 'CATEGORY_ID',
												payload: parseInt(e.target.value),
											})
										}
									>
										{activeCategory?.map((e, i) => (
											<option key={i} value={e?.id}>
												{e?.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="status" className="col-12 col-form-label">
									Status
								</label>
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
										<span style={{ marginRight: '2px' }}>Create</span>{' '}
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

export default AddNewSubCategory;
