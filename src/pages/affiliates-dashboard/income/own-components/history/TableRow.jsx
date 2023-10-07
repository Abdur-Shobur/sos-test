import React from 'react';

function TableRow({ i, page, data }) {
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>{data?.product?.name}</td>
			<td>{data?.product_id}</td>
			<td>{data.order_id}</td>
			<td>{data.qty}</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'progress' && 'badge-info') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'hold' && 'badge-secondary') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data.amount} tk
				</span>
				{/* <span
					className={`mb-2 mr-2 badge badge-secondary`}
				>
					{data.amount} tk 
				</span> */}
			</td>
			<td>
				<span className={'time'}>
					<span>{data?.created_at.split('T')[0]}</span>
					<span className={'showTime'}>
						{data?.created_at.split('T')[1].split('.')[0]}
					</span>
				</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'progress' && 'badge-info') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'hold' && 'badge-secondary') ||
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
