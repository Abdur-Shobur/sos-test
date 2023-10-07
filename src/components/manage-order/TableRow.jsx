import React from 'react';
 
import AdminDropDownMenu from './AdminDropDownMenu';
import VendorDropDownMenu from './VendorDropDownMenu';
import AffiliateMenu from './AffiliateMenu';
import { Link } from 'react-router-dom';
import { countWord, time } from '../action/actions';
// /admin/vendor-product-preview/145
// /admin/vendor-profile-view/65
// /admin/affiliates-profile-view/59
function TableRow({
	i,
	data,
	page,
	load,
	from,
	setLoad,
	refetch,
	status_handler,
	hold,
}) {
	const qtyTotal = data?.variants.map((e) => parseInt(e.qty));

	// order view
	const adminOrderView = '/admin/orders-history-view/';
	const vendorOrderView = '/vendors-dashboard/orders-history-view/';
	const afiOrderView = '/affiliates-dashboard/orders-history-view/';

	const AdminVen = '/admin/vendor-profile-view/';
	const AdminAfi = '/admin/affiliates-profile-view/';

	const VendorProfile = '/vendors-dashboard/profile';
	const VendorAfi = '/vendors-dashboard/profile';

	const AfiProfile = '/affiliates-dashboard/profile';
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>{data?.order_id ? data?.order_id : 'N/A'}</td>
			<td>
				{from === 'vendor' && data?.status === 'hold' ? (
					countWord(data?.product?.name)
				) : (
					<Link
						to={`${
							from === 'admin'
								? adminOrderView
								: from === 'vendor'
								? vendorOrderView
								: afiOrderView
						}${data?.id}`}
					>
						{countWord(data?.product?.name)}
					</Link>
				)}
			</td>
			{from !== 'affiliate' && (
				<td>
					<Link
						to={`${
							from === 'admin'
								? AdminAfi + data?.affiliator?.id
								: from === 'vendor'
								? VendorAfi
								: AfiProfile
						}`}
					>
						{countWord(data?.affiliator?.name)}
					</Link>
				</td>
			)}
			{from !== 'vendor' && (
				<td>
					<Link
						to={`${
							from === 'admin'
								? AdminVen + data?.vendor?.id
								: from === 'vendor'
								? VendorProfile
								: AfiProfile
						}`}
					>
						{countWord(data?.vendor?.name)}
					</Link>
				</td>
			)}
			<td>
				<span className="badge badge-dark">
					{qtyTotal.reduce((pre, cur) => pre + cur) || 0}
				</span>
			</td>
			<td>
				<span className="badge badge-primary">{data?.product_amount} tk</span>
			</td>
			<td>
				<span className="badge badge-info">{data?.afi_amount} tk</span>
			</td>

			<td>
				<span className={'time'}>
					<span>{time(data?.created_at).date}</span>
					<span className={'showTime'}>{time(data?.created_at).time}</span>
				</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'progress' && 'badge-info') ||
						(data?.status === 'delivered' && 'badge-success') ||
						(data?.status === 'hold' && 'badge-secondary') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data?.status}
				</span>
			</td>
			<td>
				{from === 'admin' && (
					<AdminDropDownMenu
						data={data}
						load={load}
						refetch={refetch}
						setLoad={setLoad}
						viewLink={adminOrderView}
						status_handler={status_handler}
					/>
				)}
				{from === 'vendor' && (
					<VendorDropDownMenu
						data={data}
						load={load}
						refetch={refetch}
						setLoad={setLoad}
						viewLink={vendorOrderView}
						status_handler={status_handler}
					/>
				)}
				{from === 'affiliate' && <AffiliateMenu data={data} />}
			</td>
		</tr>
	);
}

export default TableRow;
