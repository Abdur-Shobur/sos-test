import React from 'react';
import {
	TableImage,
	TableName,
	TableStatus,
	TableTime,
} from '../../../../components/table/TableComponents';
import AdminDropDownMenu from '../../../../components/manage-order/AdminDropDownMenu';
import { status_handler } from '../../orders-history/own-components/statusHandler';
import { useState } from 'react';

function RecentOrdersRow({ i, data, refetch }) {
	const [load, setLoad] = useState(false);
	const admin = {
		oderView: '/admin/orders-history-view/',
		vendorView: '/admin/vendor-profile-view/',
		affiliateView: '/admin/affiliates-profile-view/',
	};
	return (
		<tr>
			<td>{i + 1}</td>
			<td>
				<TableImage
					id={data?.product_id}
					path={admin.oderView}
					src={data?.product?.image}
				/>
			</td>
			<td>
				<TableName
					text={data?.product?.name}
					id={data?.product_id}
					path={admin.oderView}
				/>
			</td>
			<td>
				<TableName
					text={data?.vendor?.name}
					id={data?.vendor?.id}
					path={admin.vendorView}
				/>
			</td>
			<td>
				<TableName
					text={data?.affiliator?.name}
					id={data?.affiliator?.id}
					path={admin.affiliateView}
				/>
			</td>
			<td>
				<TableStatus
					status={data?.status}
					text={data?.product_amount}
					suffix=" tk"
				/>
			</td>
			<td>
				<span className="badge badge-secondary">
					{data?.afi_amount || '00'} tk
				</span>
			</td>
			<td>
				<TableTime date={data?.created_at} />
			</td>
			<td>
				<TableStatus status={data?.status} text={data?.status} />
			</td>
			<td>
				<AdminDropDownMenu
					data={data}
					load={load}
					refetch={refetch}
					setLoad={setLoad}
					viewLink={admin.oderView}
					status_handler={status_handler}
				/>
			</td>
		</tr>
	);
}

export default RecentOrdersRow;
