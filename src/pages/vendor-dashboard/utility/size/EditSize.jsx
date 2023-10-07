import React, { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { http } from '../../../../components/action/axiosInstance';
import { reducer } from '../../../../components/action/reducerAction';
import InputEdit from '../../../../components/formComponent/InputEdit';
import SelectEdit from '../../../../components/formComponent/SelectEdit';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

function EditSize() {
	const [load, setLoad] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();
	// get editable data
	const { data } = useQuery(['get_edit_size_item', id], () => {
		return http.get(`/edit-size/${id}`);
	});
	const size = data?.data?.size;

	const initialState = {};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: size,
		});
	}, [size]);

	const handel_category_create = async (e) => {
		e.preventDefault();
		setLoad(true);
		http.put(`/update-size/${id}`, state).then((e) => {
			setLoad(false);
			if (e.data.status === 200) {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});

				navigate('/vendors-dashboard/size');
				setLoad(false);
			} else {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				setLoad(false);
			}
		});
	};

	return (
		<div
			style={{ maxWidth: '600px', width: '100%', margin: '20px auto' }}
			className="card-body shadow p-4"
		>
			<div className="ec-cat-form">
				<h4>Edit Size</h4>

				<form onSubmit={handel_category_create}>
					<div className="form-group row">
						<InputEdit
							label={'Name'}
							name={'name'}
							placeholder={'Size Name'}
							require={false}
							dispatch={dispatch}
							defaultValue={state?.name}
							type="input"
						/>
					</div>

					<div className="form-group row">
						<SelectEdit dispatch={dispatch} defaultValue={state?.status} />
					</div>

					<div className="modal-footer px-4">
						<Link
							to={'/vendors-dashboard/size'}
							className="btn btn-secondary btn-pill"
						>
							Cancel
						</Link>
						<button
							disabled={load}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Save Size</span>{' '}
							{load && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditSize;
