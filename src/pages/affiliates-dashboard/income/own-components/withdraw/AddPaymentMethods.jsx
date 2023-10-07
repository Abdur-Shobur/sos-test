import React from 'react';
import Form from './Form';
import { useState } from 'react';

function AddPaymentMethods({ bank, refetch }) {
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
						<h2>Withdraw Balance</h2>

						<button
							onClick={() => setPaymentForm((e) => !e)}
							className={`btn  btn-sm ${
								openPaymentForm ? 'btn-danger' : 'btn-primary'
							}`}
						>
							{!openPaymentForm ? (
								<span>Add Withdraw Request</span>
							) : (
								<span>Cancel Withdraw</span>
							)}
						</button>
					</div>

					<div>{openPaymentForm && <Form bank={bank} refetch={refetch} />}</div>
				</div>
			</div>
		</div>
	);
}

export default AddPaymentMethods;
