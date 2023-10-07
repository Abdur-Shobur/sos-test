import React, { useEffect, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { http } from '../../../../components/action/axiosInstance';
import { reducer } from '../../../../components/action/reducerAction';
import ColorPicker from '../../../../components/color/ColorPicker';
import InputEdit from '../../../../components/formComponent/InputEdit';
import SelectEdit from '../../../../components/formComponent/SelectEdit';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

function EditColor() {
	const [load, setLoad] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	// get editable data
	const { data } = useQuery(['get_edit_color_item', id], () => {
		return http.get(`/edit-color/${id}`);
	});
	const editColor = data?.data?.color;
	const [color, setColor] = useState({
		hex: editColor?.code,
	});
	const initialState = {};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'COLOR',
			payload: color.hex,
		});
	}, [color]);

	useEffect(() => {
		setColor({ hex: editColor?.code });

		dispatch({
			type: 'API_DATA',
			payload: editColor,
		});
	}, [editColor]);

	const handel_category_create = async (e) => {
		e.preventDefault();
		setLoad(true);
		http.post(`/update-color/${id}`, state).then((e) => {
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
				navigate('/vendors-dashboard/color');
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
				<h4>Edit Color</h4>

				<form onSubmit={handel_category_create}>
					<div className="form-group row">
						<InputEdit
							label={'Name'}
							name={'name'}
							placeholder={'Color Name'}
							require={false}
							dispatch={dispatch}
							defaultValue={state?.name}
							type="input"
						/>
					</div>
					<div className="form-group row">
						<ColorPicker color={color} setColor={setColor} />
					</div>
					<div className="form-group row">
						<SelectEdit dispatch={dispatch} defaultValue={state?.status} />
					</div>

					<div className="modal-footer px-4">
						<Link
							to={'/vendors-dashboard/color'}
							className="btn btn-secondary btn-pill"
						>
							Cancel
						</Link>
						<button
							disabled={load}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Save Color</span>{' '}
							{load && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditColor;
