import React from 'react';
import style from '../../../../assets/css/style.module.css';
import { statusChangeAmount } from './statusChageAmount';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	alert,
	countWord,
	photoView,
	time,
} from '../../../../components/action/actions';

function TableRow({ i, data, page, refetch }) {
	const [load, setLoad] = useState(false);

	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>
				<Link to={`/admin/vendor-profile-view/${data?.vendor?.id}`}>
					{countWord(data?.vendor?.name)}
				</Link>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data.balance || 0.0} tk
				</span>
			</td>
			<td>{data?.vendor_bank_number}</td>
			<td>{countWord(data?.transition_id)}</td>
			<td>
				<span
					className="badge badge-dark"
					style={{ cursor: 'pointer', textDecoration: 'underline' }}
					onClick={() => alert('Reference', data?.reference_field)}
				>
					{countWord(data?.reference_field ? data?.reference_field : '', 12) ||
						'N/A'}
				</span>
			</td>
			<td>{data.bank_name}</td>
			<td>{data.bank_number}</td>
			<td>
				<span className={'time'}>
					<span>{time(data.created_at).date}</span>
					<span className={'showTime'}>{time(data.created_at).time}</span>
				</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data?.status}
				</span>
			</td>
			<td>
				<div className="btn-group mb-1">
					<button
						onClick={() => photoView(data.screenshot)}
						style={{ padding: '3px 10px' }}
						type="button"
						className="btn btn-outline-success"
					>
						screenshot
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
					{data?.status === 'pending' && (
						<div className="dropdown-menu">
							<button
								disabled={load}
								onClick={() =>
									statusChangeAmount(data.id, 'success', setLoad, refetch)
								}
								className="dropdown-item"
								href="#"
							>
								Success
							</button>
							<button
								disabled={load}
								onClick={() =>
									statusChangeAmount(data.id, 'cancel', setLoad, refetch)
								}
								className="dropdown-item"
								href="#"
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
}

export default TableRow;
