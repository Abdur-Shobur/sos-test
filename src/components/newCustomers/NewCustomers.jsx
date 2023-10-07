import React from 'react';
import NewCustomersRow from './NewCustomersRow';

function NewCustomers() {
	return (
		<div className="card ec-cust-card card-table-border-none card-default">
			<div className="card-header justify-content-between ">
				<h2>New Customers</h2>
				<div>
					<button className="text-black-50 mr-2 font-size-20">
						<i className="mdi mdi-cached"></i>
					</button>
					<div className="dropdown show d-inline-block widget-dropdown">
						<a
							className="dropdown-toggle icon-burger-mini"
							href="#"
							role="button"
							id="dropdown-customar"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							data-display="static"
						></a>
						<ul className="dropdown-menu dropdown-menu-right">
							<li className="dropdown-item">
								<a href="#">Action</a>
							</li>
							<li className="dropdown-item">
								<a href="#">Another action</a>
							</li>
							<li className="dropdown-item">
								<a href="#">Something else here</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="card-body pt-0 pb-15px">
				<table className="table ">
					<tbody>
						<NewCustomersRow />
						<NewCustomersRow />
						<NewCustomersRow />
						<NewCustomersRow />
						<NewCustomersRow />
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default NewCustomers;
