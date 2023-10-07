import React from 'react';

function TableHead({ from }) {
	return (
		<thead>
			<tr>
				<th>Sr.</th>
				<th>Order id</th>
				<th>Product</th>
				{from !== 'affiliate' && <th>Affiliator</th>}
				{from !== 'vendor' && <th>Vendor</th>}
				<th>Items</th>
				<th>Price</th>
				<th>Commission</th>
				<th>Date</th>
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
	);
}

export default TableHead;
