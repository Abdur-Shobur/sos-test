import React from 'react';
import SoldByItemsTableRow from './SoldByItemsTableRow';

function SoldByItems() {
	return (
		<div className="card card-default Sold-card-table">
			<div className="card-header justify-content-between">
				<h2>Sold by Items</h2>
				<div className="tools">
					<button className="text-black-50 mr-2 font-size-20">
						<i className="mdi mdi-cached"></i>
					</button>
					<div className="dropdown show d-inline-block widget-dropdown">
						<button
							className="dropdown-toggle icon-burger-mini"
							id="dropdown-units"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							data-display="static"
						></button>
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
			<div
				className="card-body py-0 compact-units"
				data-simplebar
				style={{ height: '534px' }}
			>
				<table className="table ">
					<tbody>
						<SoldByItemsTableRow title="Backpack" count={9} percent={33} />
						<SoldByItemsTableRow title="Jeans Pant" count={8} percent={34} />
						<SoldByItemsTableRow title="Necklace" count={2} percent={66} />
						<SoldByItemsTableRow title="Coat" count={9} percent={74} />
						<SoldByItemsTableRow title="Coat" count={6} percent={150} />
					</tbody>
				</table>
			</div>
			<div className="card-footer d-flex flex-wrap bg-white">
				<a href="#" className="text-uppercase py-3">
					View Report
				</a>
			</div>
		</div>
	);
}

export default SoldByItems;
