import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import { http } from '../../../../components/action/axiosInstance';
import LoaderInput from '../../../../components/formComponent/LoaderInput';
import { initialState, editReducer } from './action/edit/editReducer';
import Aos from 'aos';
import EditLoader from '../../../../components/loader/EditLoader';
import {
	GetCategoryData,
	SubCategoryById,
} from '../../../../api/admin/categoryAPI';
import tost from '../../../../components/action/tost';

function SubCategoryEdit() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	// get all category
	const { category } = GetCategoryData();
	// get sub category edit data
	const { subcategory, isLoading } = SubCategoryById(id);

	const [state, dispatch] = useReducer(editReducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'GET_API',
			payload: subcategory,
		});
	}, [subcategory]);

	const handel_category_create = async (e) => {
		setLoading(true);
		e.preventDefault();
		http.post(`/update-subcategory/${id}`, state).then((res) => {
			if (res.data.status === 200) {
				navigate('/admin/sub-category');
				tost(res.data.message);
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
		<form
			data-aos="fade"
			style={{ maxWidth: '600px', width: '100%', margin: '20px auto' }}
			className="ec-cat-form shadow-lg p-4 rounded"
		>
			<h4>Edit Sub Category</h4>
			<div>
				<div style={{ marginBottom: '0' }} className="form-group row">
					{isLoading ? (
						<LoaderInput label={'Name'} />
					) : (
						<>
							<label htmlFor="name" className="col-12 col-form-label">
								Name
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
									defaultValue={subcategory?.name}
									name="name"
									className="form-control here slug-title"
									type="text"
									placeholder="Name"
								/>
							</div>
						</>
					)}
				</div>

				<div style={{ marginBottom: '0' }} className="form-group row">
					{isLoading ? (
						<LoaderInput label={'Parent Category'} />
					) : (
						<>
							<label
								htmlFor="parent-category"
								className="col-12 col-form-label"
							>
								Parent Category
							</label>
							<div className="col-12">
								<select
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: e.target.name,
												value: parseInt(e.target.value),
											},
										})
									}
									id="status_check"
									name="category_id"
									className="custom-select"
								>
									{category
										?.filter((s) => s.status === 'active')
										?.map((e, i) => (
											<option
												selected={state.category_id == e.id}
												key={i}
												value={e?.id}
											>
												{e?.name}
											</option>
										))}
								</select>
							</div>
						</>
					)}
				</div>
				<div style={{ marginBottom: '0' }} className="form-group row">
					{isLoading ? (
						<LoaderInput label={'Status'} />
					) : (
						<>
							<label htmlFor="status_check" className="col-12 col-form-label">
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
								defaultValue={subcategory?.status}
								name="status"
								className="form-control here set-slug"
								aria-label=".form-select-sm example"
							>
								<option selected={state.status === 'pending'} value="pending">
									Pending
								</option>
								<option selected={state.status === 'active'} value="active">
									Active
								</option>
							</select>
						</>
					)}
				</div>
			</div>
			<div className="modal-footer">
				<Link to={`/admin/sub-category`} className="btn btn-secondary">
					Cancel
				</Link>

				<button
					disabled={loading}
					type="button"
					onClick={handel_category_create}
					className="btn btn-primary btn-pill d-flex align-items-center"
				>
					<span style={{ marginRight: '2px' }}>Update</span>{' '}
					{loading && <ClockLoader color="#fff" size={15} />}
				</button>
			</div>
		</form>
	);
}

export default SubCategoryEdit;
