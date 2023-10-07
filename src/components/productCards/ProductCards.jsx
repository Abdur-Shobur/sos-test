import React from 'react';
import { Link } from 'react-router-dom';

function ProductCards({ product, isRequested }) {
	return (
		<div className="col hp mb-3">
			<div className="card h-100 shadow-sm">
				<Link to={`/affiliates-dashboard/product-details/${product?.id}`}>
					<img
						src={`${process.env.REACT_APP_IMG_URL}/${product?.image}`}
						className="card-img-top"
						alt="product.title"
					/>
				</Link>

				<div className="label-top shadow-sm">
					<a className="text-danger" href="#">
						asus
					</a>
				</div>
				<div className="card-body">
					<div className="clearfix mb-3">
						<span className="float-start badge rounded-pill bg-success">
							1.245$
						</span>

						<span className="float-end">
							<a href="#" className="small text-muted text-uppercase aff-link">
								reviews
							</a>
						</span>
					</div>
					<h5 className="card-title">
						<Link
							to={`/affiliates-dashboard/product-details/${product?.id}`}
							target="_blank"
							href="#"
						>
							{product?.name}
						</Link>
					</h5>

					<div className="d-grid gap-2 my-4">
						<Link
							to={`/affiliates-dashboard/product-details/${product?.id}`}
							className="btn btn-warning bold-btn"
						>
							Details
						</Link>
					</div>
					<div className="clearfix mb-1">
						<span className="float-start">
							<a href="#">
								<i className="fas fa-question-circle"></i>
							</a>
						</span>

						<span className="float-end">
							<i className="far fa-heart" style={{ cursor: 'pointer' }}></i>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCards;
