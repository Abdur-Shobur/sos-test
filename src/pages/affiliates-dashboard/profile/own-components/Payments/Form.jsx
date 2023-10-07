import React from 'react';
import FormInput from './FormInput';
import { useReducer } from 'react';
import { initialState, reducer } from './actions';
// add payments reducer form
function Form() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div className="pb-3 mb-3 border-bottom">
			<h5 className="text-info mb-2">Add New Payment Methods</h5>
			<form>
				<div className="row">
					<div className="col-lg-6">
						<FormInput
							label="Bank Name"
							name="bankName"
							placeholder="Bkash ( personal / Agent )"
							info="Bank Name or Mobile Bank Name add like Bkash (personal )"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Ac / Number"
							name="bankNumber"
							placeholder="123****"
							info="Add Your Mobile Banking number or Bank Account Number"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Account Holder Name"
							name="accountHolderName"
							placeholder="Mr. Y"
							info="Account Owner Full Name"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Branch Name"
							name="branchName"
							placeholder="Mr. Y"
							info="Account Owner Full Name"
							dispatch={dispatch}
						/>
					</div>
				</div>

				<button type="submit" className="btn btn-primary">
					Create
				</button>
			</form>
		</div>
	);
}

export default Form;
