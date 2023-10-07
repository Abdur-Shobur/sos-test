import FormInput from './FormInput';
import { useReducer } from 'react';
import { initialState, reducer } from './actions';
import swal from 'sweetalert';
import { http } from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';
// add payments reducer form
function Form({ refetch, setPaymentForm }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const accountCreateHandler = (e) => {
		e.preventDefault();
		if (state.name === null || state.number === null) {
			return swal('Error!', 'Please Add Bank Name and Number', 'error');
		}

		const bankCreate = async () => {
			return http
				.post(`/admin/bank/store`, state)
				.then((res) => {
					if (res.data.validation_errors) {
						return swal('Error!', 'Please Add Bank Name and Number', 'error');
					}

					if (res.data.status === 200) {
						refetch();
						setPaymentForm(false);
						tost(res.data.message);
					}
				})
				.catch((er) => {
					tost(er.message);
				});
		};
		e.target.reset();
		bankCreate();
	};
	return (
		<div className="pb-3 mb-3 border-bottom">
			<h5 className="text-info mb-2">Add New Payment Methods</h5>
			<form onSubmit={accountCreateHandler}>
				<div className="row">
					<div className="col-lg-6">
						<FormInput
							label="Bank Name"
							name="name"
							placeholder="Bkash ( personal / Agent )"
							info="Bank Name or Mobile Bank Name add like Bkash (personal )"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Ac / Number"
							name="number"
							placeholder="123****"
							info="Add Your Mobile Banking number or Bank Account Number"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Account Holder Name"
							name="account_holder_name"
							placeholder="Mr. Y"
							info="Account Owner Full Name"
							dispatch={dispatch}
						/>
					</div>
					<div className="col-lg-6">
						<FormInput
							label="Branch Name"
							name="branch_name"
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
