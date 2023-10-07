import React from 'react';
import { photoView, time } from '../../../../../components/action/actions';

function TableRow({ data, i, page }) {
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>{data.ac_or_number || 'N/A'}</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data.amount} tk
				</span>
			</td>
			<td>{data.bank_name || 'N/A'}</td>
			<td>{data.branch_name || 'N/A'}</td>
			<td>{data.holder_name || 'N/A'}</td>
			<td>
				<span className="time">
					<span>{time(data?.created_at).date}</span>
					<span className="showTime">{time(data?.created_at).time}</span>
				</span>
			</td>
			<td>
				<button
					onClick={() => photoView(data.admin_screenshot)}
					className={`mb-2 mr-2 badge  badge-primary`}
				>
					Screenshot
				</button>
			</td>
			<td>{data.admin_transition_id || 'N/A'}</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data?.status}
				</span>
			</td>
		</tr>
	);
}

export default TableRow;
