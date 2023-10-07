import React from 'react';
import TopProductsRow from './TopProductsRow';

function TopProducts() {
	return (
		<div className="card card-default ec-card-top-prod">
			<div className="card-header justify-content-between">
				<h2>Top Products</h2>
				<div>
					<button className="text-black-50 mr-2 font-size-20">
						<i className="mdi mdi-cached"></i>
					</button>
					<div className="dropdown show d-inline-block widget-dropdown">
						<a
							className="dropdown-toggle icon-burger-mini"
							href="#"
							role="button"
							id="dropdown-product"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							data-display="static"
						></a>
						<ul className="dropdown-menu dropdown-menu-right">
							<li className="dropdown-item">
								<a href="#">Update Data</a>
							</li>
							<li className="dropdown-item">
								<a href="#">Detailed Log</a>
							</li>
							<li className="dropdown-item">
								<a href="#">Statistics</a>
							</li>
							<li className="dropdown-item">
								<a href="#">Clear Data</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="card-body mt-10px mb-10px py-0">
				<TopProductsRow />
				<TopProductsRow />
				<TopProductsRow />
			</div>
		</div>
	);
}

export default TopProducts;
