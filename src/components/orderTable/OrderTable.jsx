import React from 'react';
import OrderTableRow from './OrderTableRow';

function OrderTable() {
	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: '100%' }}
		>
			<thead>
				<tr>
					<th>ID</th>
					<th>Customer</th>
					<th>Email</th>
					<th>Items</th>
					<th>Price</th>
					<th>Payment</th>
					<th>Status</th>
					<th>Date</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody style={{ verticalAlign: 'middle' }}>
				<OrderTableRow />
				<OrderTableRow />
				<OrderTableRow />
				<OrderTableRow />
				<OrderTableRow />
				<OrderTableRow />
				<OrderTableRow />
			</tbody>
		</table>
	);
}

export default OrderTable;
