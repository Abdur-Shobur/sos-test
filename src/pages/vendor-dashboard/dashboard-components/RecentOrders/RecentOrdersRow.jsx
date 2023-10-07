import React from 'react';

function RecentOrdersRow() {
	// let check_icon = () => {
	// 	return;
	// };
	return (
		<tr>
			<td>24541</td>
			<td>
				<a className="text-dark" href="">
					Coach Swagger
				</a>
			</td>
			<td>1 Unit</td>
			<td>Oct 20, 2018</td>
			<td>$230</td>
			<td>
				<span className="badge badge-success">Completed</span>
			</td>
			<td className="text-right">
				<div className="dropdown show d-inline-block widget-dropdown">
					<button
						className="dropdown-toggle icon-burger-mini"
						id="dropdown-recent-order1"
						data-bs-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
						data-display="static"
					></button>
					<ul className="dropdown-menu dropdown-menu-right">
						<li className="dropdown-item">
							<a href="#">View</a>
						</li>
						<li className="dropdown-item">
							<a href="#">Remove</a>
						</li>
					</ul>
				</div>
			</td>
		</tr>
	);
}

export default RecentOrdersRow;
