import React from 'react';
import Form from './Form';
import { useState } from 'react';

function AddPaymentMethods({ bank }) {
	const [openPaymentForm, setPaymentForm] = useState(true);
	return (
		<div className="row">
			<div className="col-12">
				<div
					className="card card-default card-table-border-none ec-tbl"
					id="recent-orders"
				>
					<div></div>
					<div className="card-header justify-content-between">
						<h2>Deposit Balance</h2>

						<button
							onClick={() => setPaymentForm((e) => !e)}
							className={`btn  btn-sm ${
								openPaymentForm ? 'btn-danger' : 'btn-primary'
							}`}
						>
							{!openPaymentForm ? (
								<span>Add New Deposit</span>
							) : (
								<span>Cancel Deposit</span>
							)}
						</button>
					</div>

					<div>{openPaymentForm && <Form bank={bank} />}</div>
				</div>
			</div>
		</div>
	);
}

export default AddPaymentMethods;
