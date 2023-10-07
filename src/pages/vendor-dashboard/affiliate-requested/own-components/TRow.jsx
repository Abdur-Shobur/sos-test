import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TableImage } from '../../../../components/table/TableComponents';
import { VENDOR_PRODUCT_VIEW } from '../../../../components/action/path';
import {
	active_status_handler,
	rejected_status_handler,
} from '../action/action';

function TRow({ i, data, page, refetch }) {
	const [loading, setLoading] = useState(false);

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
					path={VENDOR_PRODUCT_VIEW}
					src={data?.product?.image}
				/>
			</td>
			<td>{data?.product?.name}</td>
			<td>{data?.affiliator?.name}</td>
			<td>{data?.vendor?.name}</td>
			<td>{data?.product?.selling_price} tk</td>
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
						to={`/vendors-dashboard/affiliate-requested-view-product/${data?.id}`}
						style={{ padding: '3px 10px' }}
						type="button"
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
								onClick={() =>
									active_status_handler(data?.id, '1', setLoading, refetch)
								}
								className="dropdown-item"
							>
								Active
							</button>
						)}
						{data?.status !== '2' && (
							<button
								disabled={loading}
								onClick={() =>
									active_status_handler(data?.id, '2', setLoading, refetch)
								}
								className="dropdown-item"
							>
								Pending
							</button>
						)}
						{data?.status !== '3' && (
							<button
								disabled={loading}
								onClick={() => rejected_status_handler(data?.id, refetch)}
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
