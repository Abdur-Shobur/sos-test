import React from 'react';
import Form from './Form';
import { useState } from 'react';
import Card from './Card';
import { AdminBankList } from '../../../../../api/admin/payment';

function AddPaymentMethods() {
	const [openPaymentForm, setPaymentForm] = useState(false);
	const { banks, isLoading, refetch } = AdminBankList();

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
							<Form refetch={refetch} setPaymentForm={setPaymentForm} />
						)}
						<div className="row">
							{banks?.map((e) => (
								<Card key={e.id} bank={e} refetch={refetch} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddPaymentMethods;
