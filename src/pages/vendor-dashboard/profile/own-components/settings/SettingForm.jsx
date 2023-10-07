import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import { useReducer } from 'react';
import { initialState, reducer } from './action';
import ImageField from './ImageField';
import {
	http,
	multipartConfig,
} from '../../../../../components/action/axiosInstance';
import swal from 'sweetalert';
import tost from '../../../../../components/action/tost';

function SettingForm({ data, refetch }) {
	const [loading, setLoading] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: {
				...data,
			},
		});
	}, [data]);

	const updateHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await http.post(
				`/vendor/update/profile`,
				state,
				multipartConfig
			);

			if (res.data.status === 200) {
				tost(res.data.message);

				refetch();
				e.target.reset();
			} else if (res.data.status === 400) {
				let [, value] = Object.entries(res.data.message)[0];
				swal('Error!', value[0], 'error');
			}
		} catch (err) {
			tost(err.message);
		}
		setLoading(false);
	};

	return (
		<form onSubmit={updateHandler}>
			<div className="form-group row mb-6">
				<ImageField
					dispatch={dispatch}
					data={state.url ? state.url : data.image}
				/>
			</div>

			<div className="row mb-2">
				<div className="col-lg-6">
					<InputField
						label="Name"
						name="name"
						defaultValue={state.name}
						placeholder="Enter Your Name"
						dispatch={dispatch}
					/>
				</div>

				<div className="col-lg-6">
					<InputField
						label="Email"
						name="email"
						defaultValue={state.email}
						placeholder="Enter Your Email"
						type="email"
						readOnly={true}
					/>
				</div>
				<div className="col-lg-6">
					<InputField
						label="Phone Number"
						name="number"
						defaultValue={state.number}
						placeholder="Enter Your Phone Number"
						dispatch={dispatch}
						type="number"
					/>
				</div>
				<div className="col-lg-6">
					<InputField
						label="Phone Number 2 (Optional)"
						name="number2"
						defaultValue={state.number2}
						placeholder="Enter Your Phone Number"
						dispatch={dispatch}
						type="number"
					/>
				</div>
				<div className="col-lg-6">
					<InputField
						label="Old Password"
						name="old_password"
						defaultValue={null}
						placeholder="Enter Your Old Password"
						dispatch={dispatch}
						type="password"
					/>
				</div>
				<div className="col-lg-6">
					<InputField
						label="New Password"
						name="new_password"
						defaultValue={null}
						placeholder="Enter Your newPassword"
						dispatch={dispatch}
						type="password"
					/>
				</div>
				<div className="col-lg-6">
					<InputField
						label={`Confirm Password ${
							state.new_password && state.confirm_password
								? state.new_password === state.confirm_password
									? 'Matched'
									: 'Not Matched'
								: ''
						}`}
						name="confirm_password"
						defaultValue={null}
						placeholder="Enter Your Confirm Password"
						dispatch={dispatch}
						type="password"
					/>
				</div>
			</div>

			<div className="d-flex justify-content-end mt-5">
				<button
					disabled={!(state.new_password === state.confirm_password) || loading}
					type="submit"
					className="btn btn-primary mb-2 btn-pill"
				>
					Update Profile
				</button>
			</div>
		</form>
	);
}

export default SettingForm;
