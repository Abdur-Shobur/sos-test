import React from 'react';
import p1 from '../../assets/img/products/p1.jpg';
import u1 from '../../assets/img/user/u1.jpg';
function ReviewTableRow() {
	return (
		<tr>
			<td>
				<img className="tbl-thumb" src={p1} alt="product-images" />
			</td>
			<td>Baby shoes</td>
			<td>
				<img className="tbl-thumb" src={u1} alt="product-images" />
			</td>
			<td>Johnas Pintu</td>
			<td>
				<div className="ec-t-rate">
					<i className="mdi mdi-star is-rated"></i>
					<i className="mdi mdi-star is-rated"></i>
					<i className="mdi mdi-star is-rated"></i>
					<i className="mdi mdi-star is-rated"></i>
					<i className="mdi mdi-star"></i>
				</div>
			</td>
			<td>2021-12-03</td>
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
							Edit
						</a>
						<a className="dropdown-item" href="#">
							Delete
						</a>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default ReviewTableRow;
