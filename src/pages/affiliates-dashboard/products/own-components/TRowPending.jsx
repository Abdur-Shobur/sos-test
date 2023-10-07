import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../../components/action/DeletePopUP';

function TRowPending({ data, refetch }) {
	const navigate = useNavigate();
	// delete product
	const delete_handler = (e) => {
		// const del = () =>
		// 	http.delete(`/vendor-delete-product/${e}`).then(() => {
		// 		refetch();
		// 	});
		// return DeletePopUP(del);
	};
	return (
		<tr>
			<td>
				<img
					className="tbl-thumb"
					src={`${process.env.REACT_APP_IMG_URL}/${data?.product?.image}`}
					alt="Product Images"
				/>
			</td>
			<td>{data?.product?.name}</td>
			<td>$20</td>
			<td>{data?.brand_id}</td>
			<td>61</td>
			<td>5421</td>
			<td>{data?.status}</td>
			<td>2021-10-30</td>
			<td>
				<div className="btn-group mb-1">
					<Link
						style={{ padding: '3px 10px' }}
						to={`/affiliates-dashboard/pending-product-details/${data?.product_id}`}
						className="btn btn-outline-success"
					>
						view
					</Link>
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
						<Link
							to={`/vendors-dashboard/product-edit/${data?.id}`}
							className="dropdown-item"
						>
							Edit
						</Link>
						<Link
							onClick={() => delete_handler(data?.id)}
							className="dropdown-item"
						>
							Delete
						</Link>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default TRowPending;
