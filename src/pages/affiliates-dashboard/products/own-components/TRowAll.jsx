import React from 'react';
import { Link } from 'react-router-dom';
import { countWord, time } from '../../../../components/action/actions';
import { TableImage } from '../../../../components/table/TableComponents';

function TRowAll({ data, refetch, path, from }) {
	return (
		<tr>
			<td>
				<TableImage id={data?.id} path={path} src={data?.image} />
			</td>
			<td>
				<Link to={path + data.id}>{countWord(data?.name, 12)}</Link>
			</td>
			<td>
				<span className="badge badge-secondary">
					{data?.original_price || '00'} tk{' '}
				</span>
			</td>
			<td>
				<span className="badge badge-info">
					{data?.selling_price || '00'} tk{' '}
				</span>
			</td>

			<td>
				<span className="badge badge-primary">
					{data?.discount_rate}
					{data?.discount_type === 'percent' ? '% ' : 'tk '}(
					{data?.discount_type})
				</span>
			</td>
			<td>
				<span className="badge badge-dark">{data?.qty}</span>
			</td>
			<td>
				{from === 'active' ? (
					<span className="badge badge-success">{from}</span>
				) : from === 'requested' ? (
					<span className="badge badge-warning">{from}</span>
				) : from === 'rejected' ? (
					<span className="badge badge-danger">{from}</span>
				) : (
					<span className="badge badge-info">{from}</span>
				)}
			</td>
			<td>
				<span className={'time'}>
					<span>{time(data?.updated_at).date}</span>
					<span className={'showTime'}>{time(data?.updated_at).time}</span>
				</span>
			</td>
			<td>
				<Link
					style={{ padding: '3px 10px' }}
					to={path + data.id}
					className="btn btn-success btn-sm"
				>
					view
				</Link>
			</td>
		</tr>
	);
}

export default TRowAll;
