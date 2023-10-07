import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import FormInput from './FormInput';
import { initialState, reducer } from './actions';
import {
	http,
	multipartConfig,
} from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
import swal from 'sweetalert';
import { useState } from 'react';
// add payments reducer form
function Form({ bank, refetch }) {
	const [load, setLoad] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		dispatch({
			type: 'API',
			payload: bank?.[0]?.name,
		});
	}, [bank]);

	const submitDepositHandler = (e) => {
		setLoad(true);
		e.preventDefault();
		http
			.post(`/affiliator/withdraw-post`, state, multipartConfig)
			.then((res) => {
				if (res.data.status === 200) {
					refetch();
					tost(res.data.message);
					setLoad(false);
				} else {
					swal({
						title: 'Wait!',
						text: res.data.message,
						icon: 'warning',
						buttons: true,
						dangerMode: true,
					});
					setLoad(false);
					// tost(e.data.message);
				}
			});
		e.target.reset();
	};
	return (
		<div className="pb-3 mb-3 p-3">
			<h5 className="text-info mb-2">Add Withdraw Balance</h5>
			<form onSubmit={submitDepositHandler}>
				<div className="row">
					<div className="col-lg-6">
						<label htmlFor="selectBank">Select Admin Bank *</label>
						<select
							name="bank_name"
							className="form-select form-control"
							aria-label="Default select example"
							onChange={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										name: e.target.name,
										value: e.target.value,
									},
								})
							}
						>
							{bank?.map((e) => (
								<option key={e.id} value={e.name}>
									{e.name}
								</option>
							))}
						</select>
						<div className="form-text">
							Select Admin Bank where you want to Withdraw
						</div>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Your Ac / Number *"
							name="ac_or_number"
							placeholder="123****"
							info="Add Your Mobile Banking number or Bank Account Number"
							dispatch={dispatch}
							require={true}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Amount *"
							name="amount"
							placeholder="0.00"
							type="number"
							info="Add amount that you want to withdraw"
							dispatch={dispatch}
							require={true}
						/>
					</div>

					<div className="col-lg-6">
						<FormInput
							label="Branch Name"
							name="branch_name"
							placeholder="Mirpur 1200"
							info="Add Branch Name if you want to in your Bank"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Account Holder Name"
							name="holder_name"
							placeholder="Add A/C Holder Name"
							info="Add Bank Account Holder Name"
							dispatch={dispatch}
						/>
					</div>
				</div>

				<button
					disabled={load && state.amount === null}
					type="submit"
					class={`btn ${
						!load && state.amount === null ? 'btn-secondary' : 'btn-success '
					}`}
				>
					Request
				</button>
			</form>
		</div>
	);
}

export default Form;
