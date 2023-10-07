import React from 'react';
import Form from './Form';
import { useState } from 'react';

function AddPaymentMethods({ statePaymentFields, dispatch }) {
	const [openPaymentForm, setPaymentForm] = useState(false);
	return (
		<div className="row">
			<div className="col-12">
				<div
					className="card card-default card-table-border-none ec-tbl"
					id="recent-orders"
				>
					<div></div>
					<div className="card-header justify-content-between">
						<h2>Payment Methods</h2>

						<button
							onClick={() => setPaymentForm((e) => !e)}
							className={`btn  btn-sm ${
								openPaymentForm ? 'btn-danger' : 'btn-primary'
							}`}
						>
							{!openPaymentForm ? (
								<span>Add Payment Methods</span>
							) : (
								<span>Cancel Add Payment</span>
							)}
						</button>
					</div>

					<div className="p-3">
						{openPaymentForm && (
							<Form
								statePaymentFields={statePaymentFields}
								dispatch={dispatch}
							/>
						)}
						<div className="card" style={{ maxWidth: '400px' }}>
							<div
								style={{ padding: '20px' }}
								className="card-header d-flex justify-content-between"
							>
								<h5 className="">Bkash</h5>
								<div>
									{/* <button className="btn btn-sm btn-primary mr-2">Edit</button> */}
									<button className="btn btn-sm btn-danger">Delete</button>
								</div>
							</div>
							<div className="card-body">
								<h5 className="card-title">Number</h5>
								<p className="card-text">1238193990</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddPaymentMethods;
