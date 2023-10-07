import React from 'react';
import { Link } from 'react-router-dom';
import { http } from '../../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../../components/action/DeletePopUP';
import { RejectedReasons } from '../../../../components/action/RejectedReasons';
import tost from '../../../../components/action/tost';
import {
	TableDiscount,
	TableImage,
	TableName,
	TableQty,
	TableSr,
	TableStatus,
	TableTime,
} from '../../../../components/table/TableComponents';
import {
	ADMIN_VENDOR_PRODUCT_VIEW,
	ADMIN_VENDOR_PROFILE_VIEW,
} from '../../../../components/action/path';

function TRow({ i, data, page, refetch }) {
	const active_status_handler = (id) => {
		http
			.post(`/admin-product-status-update/${id}`, { status: 'active' })
			.then((res) => {
				if (res.data.status === 200) {
					tost(res.data.messaage);
					refetch();
				}
			});
	};
	// delete product
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/delete-product/${e}`).then((res) => {
				tost(res.data.message);
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
				<TableSr i={i} page={page} />
			</td>
			<td>
				<TableImage
					id={data?.id}
					path={ADMIN_VENDOR_PRODUCT_VIEW}
					src={data?.image}
				/>
			</td>
			<td>
				<TableName
					id={data?.id}
					path={ADMIN_VENDOR_PRODUCT_VIEW}
					text={data?.name}
				/>
			</td>
			<td>
				<TableName
					id={data?.user_id}
					path={ADMIN_VENDOR_PROFILE_VIEW}
					text={data?.vendor?.name}
				/>
			</td>
			<td>
				<TableStatus
					status={data?.status}
					text={data?.selling_price}
					suffix={!data.selling_price ? '00 tk' : ' tk'}
				/>
			</td>
			<td>
				<TableDiscount
					discount_rate={data?.discount_rate}
					discount_type={data?.discount_type}
				/>
			</td>
			<td>
				<TableQty qty={data?.qty} />
			</td>

			<td>
				<TableTime date={data?.created_at} />
			</td>
			<td>
				<TableStatus status={data?.status} text={data?.status} />
			</td>
			<td>
				<div className="btn-group mb-1">
					<Link
						style={{ padding: '3px 10px' }}
						to={ADMIN_VENDOR_PRODUCT_VIEW + data?.id}
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

export default TRow;
