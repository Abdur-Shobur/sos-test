import React from 'react';
import { Link } from 'react-router-dom';
import { http } from '../action/axiosInstance';
import { DeletePopUP } from '../action/DeletePopUP';
import { RejectedReasons } from '../action/RejectedReasons';
import { toast } from 'react-toastify';
function ProductListRow({ data, refetch }) {
	const active_status_handler = (id) => {
		http
			.post(`/admin-product-status-update/${id}`, { status: 'active' })
			.then((e) => {
				if (e.data.status === 200) {
					toast(e.data.messaage, {
						position: 'top-right',
						autoClose: 300,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
					refetch();
				}
			});
	};
	// delete product
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/delete-product/${e}`).then((res) => {
				toast(res.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				refetch();
			});
		return DeletePopUP(del);
	};
	const rejected_status_handler = (id) => {
		RejectedReasons(id, refetch);
	};
	return (
		<tr>
			<td>
				<img
					className="tbl-thumb"
					src={`${process.env.REACT_APP_IMG_URL}/${data?.image}`}
					alt="Product Images"
				/>
			</td>
			<td>{data?.name}</td>
			<td>$20</td>
			<td>25% OFF</td>
			<td>61</td>
			<td>5421</td>
			<td>{data?.status}</td>
			<td>2021-10-30</td>
			<td>
				<div className="btn-group mb-1">
					<Link
						style={{ padding: '3px 10px' }}
						to={`/admin/vendor-product-preview/${data?.id}`}
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
						<button
							hidden={data?.status === 'active' || data?.status === 'rejected'}
							onClick={() => active_status_handler(data?.id)}
							className="dropdown-item"
						>
							Active
						</button>
						<button
							hidden={data?.status === 'active' || data?.status === 'rejected'}
							onClick={() => rejected_status_handler(data?.id)}
							className="dropdown-item"
						>
							Rejected
						</button>

						<Link
							// to="/vendors-dashboard/product-list"
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

export default ProductListRow;
