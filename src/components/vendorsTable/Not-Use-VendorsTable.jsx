import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import VendorListRow from './VendorListRow';

function VendorsTable({ get_vendors, refetch, isLoading }) {
	return (
		<table id="responsive-data-table" className="table">
			<thead>
				<tr>
					<th>Profile</th>
					<th>Name</th>
					<th>Email</th>
					<th>Product</th>
					<th>Total Sell</th>
					<th>Status</th>
					<th>Number</th>
					<th>Action</th>
				</tr>
			</thead>

			{isLoading ? (
				<tbody>
					<tr className="position-relative">
						<td style={{ borderBottom: '0' }}>
							<div
								style={{
									position: 'absolute',
									transform: 'translate(-50%,-50%)',
									left: '50%',
									top: '10px',
								}}
							>
								<SyncLoader color="#36d7b7" />
							</div>
						</td>
					</tr>
				</tbody>
			) : (
				<tbody style={{ verticalAlign: 'middle' }}>
					{get_vendors?.map((e, i) => (
						<VendorListRow key={i} data={e} refetch={refetch} />
					))}
				</tbody>
			)}
		</table>
	);
}

export default VendorsTable;
