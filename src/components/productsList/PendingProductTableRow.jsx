import React from 'react';
import { toast } from 'react-toastify';

import { http } from '../action/axiosInstance';

function PendingProductTableRow({ refetch, data }) {
	const active_status_handler = (id) => {
		http.get(`/product-approval/${id}`).then((e) => {
			if (e.data.status === 200) {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else if (e.data.status === 400) {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
			refetch();
		});
	};
	const cancel_status_handler = (id) => {
		http.get(`/product-reject/${id}`).then((e) => {
			if (e.data.status === 200) {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			} else if (e.data.status === 400) {
				toast(e.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
			refetch();
		});
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
			<td>{data?.product?.category?.name}</td>
			<td>{data?.product?.status}</td>

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
						<button
							onClick={() => active_status_handler(data?.id)}
							className="dropdown-item"
						>
							Active
						</button>
						<button
							onClick={() => cancel_status_handler(data?.id)}
							className="dropdown-item"
						>
							Cancel
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default PendingProductTableRow;
