import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { http } from '../../../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../../../components/action/DeletePopUP';
import { countWord, time } from '../../../../../components/action/actions';
import { TableImage } from '../../../../../components/table/TableComponents';
import { VENDOR_PRODUCT_VIEW } from '../../../../../components/action/path';

function TRow({ i, data, page, refetch }) {
	const location = useLocation();

	// delete product
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/vendor-delete-product/${e}`).then(() => {
				refetch();
			});
		return DeletePopUP(del);
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
					id={data?.id}
					path={VENDOR_PRODUCT_VIEW}
					src={data?.image}
				/>
			</td>
			<td>
				<Link to={`/vendors-dashboard/product-list/${data?.id}`}>
					{countWord(data?.name, 15)}
				</Link>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'active' && 'badge-success') ||
						(data?.status === 'rejected' && 'badge-danger')
					}`}
				>
					{data?.selling_price} tk
				</span>
			</td>
			<td>
				{data?.discount_rate}
				{data?.discount_type === 'percent' ? '% ' : 'tk '}
				<span className="badge badge-info">{data?.discount_type}</span>
			</td>

			<td>
				<span className="badge badge-dark">{data?.qty}</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'active' && 'badge-success') ||
						(data?.status === 'rejected' && 'badge-danger')
					}`}
				>
					{data?.status}
				</span>
			</td>
			<td>
				<span className={'time'}>
					<span>{time(data?.created_at).date}</span>
					<span className={'showTime'}>{time(data?.created_at).time}</span>
				</span>
			</td>
			<td>
				<div className="btn-group mb-1">
					<Link
						style={{ padding: '3px 10px' }}
						to={`/vendors-dashboard/product-list/${data?.id}`}
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
							state={{ from: location }}
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

export default TRow;
