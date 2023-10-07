import React from 'react';
import { http } from '../../../../components/action/axiosInstance';
import { useState } from 'react';
import { RejectedReasons } from './RejectedReasons';
import { Link } from 'react-router-dom';
import tost from '../../../../components/action/tost';
import { countWord } from '../../../../components/action/actions';
import { TableImage } from '../../../../components/table/TableComponents';
import { ADMIN_VENDOR_PRODUCT_VIEW } from '../../../../components/action/path';

function TRow({ i, page, data, refetch }) {
	const [loading, setLoading] = useState(false);

	const active_status_handler = (id, status) => {
		setLoading(true);
		http
			.post(`/admin/request/product-update/${id}`, {
				status: status,
				reason: null,
			})
			.then((e) => {
				if (e.data.status === 200) {
					refetch();
					tost(e.data.message);
					setLoading(false);
				} else if (e.data.status === 400) {
					tost(e.data.message);

					setLoading(false);
				}
				setLoading(false);
			})
			.catch((er) => {
				tost(er.data.message);

				setLoading(false);
			});
	};
	const rejected_status_handler = (id) => {
		RejectedReasons(id, refetch);
	};
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>
				<TableImage
					id={data?.product?.id}
					path={ADMIN_VENDOR_PRODUCT_VIEW}
					src={data?.product?.image}
				/>
			</td>
			<td>
				<Link to={`/admin/vendor-product-preview/${data?.product?.id}`}>
					{countWord(data?.product?.name)}
				</Link>
			</td>
			<td>
				<Link to={`/admin/affiliates-profile-view/${data?.affiliator?.id}`}>
					{countWord(data?.affiliator?.name)}
				</Link>
			</td>
			<td>
				<Link to={`/admin/vendor-profile-view/${data?.vendor?.id}`}>
					{countWord(data?.vendor?.name)}
				</Link>
			</td>
			<td>
				<span className="badge badge-info">
					{data?.product?.selling_price} tk
				</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === '1' && 'badge-success') ||
						(data?.status === '2' && 'badge-warning') ||
						(data?.status === '3' && 'badge-danger')
					}`}
				>
					{(data?.status === '1' && 'Active') ||
						(data?.status === '2' && 'Pending') ||
						(data?.status === '3' && 'Rejected')}
				</span>
			</td>

			<td>
				<div className="btn-group mb-1">
					<Link
						to={`/admin/affiliate-view-request-product/${data?.id}`}
						style={{ padding: '3px 10px' }}
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
						{data?.status !== '1' && (
							<button
								disabled={loading}
								onClick={() => active_status_handler(data?.id, '1')}
								className="dropdown-item"
							>
								Active
							</button>
						)}
						{data?.status !== '2' && (
							<button
								disabled={loading}
								onClick={() => active_status_handler(data?.id, '2')}
								className="dropdown-item"
							>
								Pending
							</button>
						)}
						{data?.status !== '3' && (
							<button
								disabled={loading}
								onClick={() => rejected_status_handler(data?.id)}
								className="dropdown-item"
							>
								Rejected
							</button>
						)}
					</div>
				</div>
			</td>
		</tr>
	);
}

export default TRow;
