import React, { useState } from 'react';
import FormInput from './FormInput';
import { useReducer } from 'react';
import { initialState, reducer } from './actions';
import {
	http,
	multipartConfig,
} from '../../../../../components/action/axiosInstance';
import { useEffect } from 'react';
import tost from '../../../../../components/action/tost';
import { useNavigate } from 'react-router-dom';
// add payments reducer form
function Form({ bank }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch({
			type: 'API',
			payload: bank?.[0]?.id,
		});
	}, [bank]);
	const submitDepositHandler = (e) => {
		setLoad(true);
		e.preventDefault();
		http
			.post(`/vendor/payment/submit`, state, multipartConfig)
			.then((res) => {
				if (res.data.status === 200) {
					setLoad(false);
					tost(res.data.message);
					navigate('/vendors-dashboard/all-deposit');
				} else {
					setLoad(false);
					tost(res.data.message);
				}
			})
			.catch((er) => {
				setLoad(false);
				tost(er.data.message);
			});
		e.target.reset();
	};
	return (
		<div className="pb-3 mb-3 p-3">
			<h5 className="text-info mb-2">Add Deposit Balance</h5>
			<form onSubmit={submitDepositHandler}>
				<div className="row">
					<div className="col-lg-6">
						<label htmlFor="selectBank">Select Admin Bank</label>
						<select
							name="admin_bank_id"
							className="form-select form-control"
							aria-label="Default select example"
							onChange={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										name: e.target.name,
										value: parseInt(e.target.value),
									},
								})
							}
						>
							{bank?.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</select>
						<div className="form-text">
							Select Admin Bank where you want to Deposit
						</div>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Your Ac / Number"
							name="vendor_bank_number"
							placeholder="123****"
							info="Add Your Mobile Banking number or Bank Account Number"
							dispatch={dispatch}
							require={true}
						/>
					</div>
					<div className="col-lg-6">
						<div className="mb-3">
							<label htmlFor="Balance" className="form-label">
								Balance
							</label>
							<input
								onChange={(e) =>
									dispatch({
										type: 'TEXT',
										payload: {
											name: e.target.name,
											value: parseInt(e.target.value),
										},
									})
								}
								type="number"
								className="form-control"
								id="Balance"
								name="balance"
								placeholder="0.00"
								required
							/>
							<div className="form-text">
								Add balance that you want to deposit
							</div>
						</div>
						{/* <FormInput
							label="Balance"
							name="balance"
							placeholder="0.00"
							info="Add balance that you want to deposit"
							dispatch={dispatch}
							require={true}
						/> */}
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Transition Id"
							name="transition_id"
							placeholder="2jk0em393j"
							info="Transition ID please add here"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<div className="mb-3">
							<label for="formFile" className="form-label">
								Screenshot (optional)
							</label>
							<input
								onChange={(e) =>
									dispatch({
										type: 'TEXT',
										payload: {
											name: e.target.name,
											value: e.target.files[0],
										},
									})
								}
								name="screenshot"
								className="form-control"
								type="file"
								id="formFile"
							/>
							<div className="form-text">
								Add a Screenshot your with your Transition{' '}
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Reference (optional)"
							name="reference_field"
							placeholder="Reference"
							info="You want to say anything?"
							dispatch={dispatch}
						/>
					</div>
				</div>

				<button disabled={load} type="submit" className="btn btn-primary">
					Deposit
				</button>
			</form>
		</div>
	);
}

export default Form;
