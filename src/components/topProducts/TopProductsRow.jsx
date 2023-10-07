import React from 'react';
import p1 from '../../assets/img/products/p1.jpg';

function TopProductsRow() {
	return (
		<div className="row media d-flex pt-15px pb-15px">
			<div className="col-lg-3 col-md-3 col-2 media-image align-self-center rounded">
				<a href="#">
					<img src={p1} alt="customer image" />
				</a>
			</div>
			<div className="col-lg-9 col-md-9 col-10 media-body align-self-center ec-pos">
				<a href="#">
					<h6 className="mb-10px text-dark font-weight-medium">
						Baby cotton shoes
					</h6>
				</a>
				<p className="float-md-right sale">
					<span className="mr-2">58</span>Sales
				</p>
				<p className="d-none d-md-block">
					Statement belting with double-turnlock hardware adds “swagger” to a
					simple.
				</p>
				<p className="mb-0 ec-price">
					<span className="text-dark">$520</span>
					<del>$580</del>
				</p>
			</div>
		</div>
	);
}

export default TopProductsRow;
