import React from 'react';
import ReviewTableRow from './ReviewTableRow';

function ReviewTable() {
	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: 'width:100%' }}
		>
			<thead>
				<tr>
					<th>Product</th>
					<th>Name</th>
					<th>Profile</th>
					<th>Vendor</th>
					<th>Ratings</th>
					<th>Date</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody style={{ verticalAlign: 'middle' }}>
				<ReviewTableRow />
				<ReviewTableRow />
				<ReviewTableRow />
				<ReviewTableRow />
				<ReviewTableRow />
				<ReviewTableRow />
				<ReviewTableRow />
			</tbody>
		</table>
	);
}

export default ReviewTable;
