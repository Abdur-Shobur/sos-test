import React from 'react';

function OrderTableRow() {
	return (
		<tr>
			<td>1050</td>
			<td>Johny Markue</td>
			<td>johny@example.com</td>
			<td>3</td>
			<td>$80</td>
			<td>PAID</td>
			<td>
				<span className="mb-2 mr-2 badge badge-secondary">Cancel</span>
			</td>
			<td>2021-10-30</td>
			<td>
				<div className="btn-group mb-1">
					<button
						style={{ padding: '3px 10px' }}
						type="button"
						className="btn btn-outline-success"
					>
						Info
					</button>
					<button
						type="button"
						className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
						data-bs-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
						data-display="static"
					>
						<span className="sr-only">Info</span>
					</button>

					<div className="dropdown-menu">
						<a className="dropdown-item" href="#">
							Detail
						</a>
						<a className="dropdown-item" href="#">
							Track
						</a>
						<a className="dropdown-item" href="#">
							Cancel
						</a>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default OrderTableRow;
