import React from 'react';
import {
	TableImageNoUrl,
	TableStatus,
} from '../../../../components/table/TableComponents';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

function Row({ i, data, refetch }) {
	return (
		<tr>
			<td>{i + 1}</td>
			<td>
				<TableImageNoUrl src={data?.image} />
			</td>
			<td>{data?.name}</td>
			<td>
				<span className="badge badge-dark">{data?.product_qty || '00'}</span>
			</td>
			<td>
				<span className="badge badge-dark">
					{data?.total_qty_last_month || '00'}
				</span>
			</td>
			<td>
				<span className="badge badge-dark">
					{data?.total_qty_current_month || '00'}
				</span>
			</td>
			<td>
				<span className="badge badge-dark">{data?.sold_qty || '00'}</span>
			</td>

			<td>
				<TableStatus status={data?.status} text={data?.status} />
			</td>
			<td>
				<span className="badge badge-dark">
					{data?.sale_percentage.toFixed(2) + '%' || '0.00%'}
				</span>
				<span
					className={`badge ${data?.is_up ? 'badge-success' : 'badge-danger'}`}
				>
					{data?.is_up ? (
						<BsArrowUp style={{ fontWeight: 'bold' }} />
					) : (
						<BsArrowDown style={{ fontWeight: 'bold' }} />
					)}
				</span>
			</td>
		</tr>
	);
}

export default Row;
