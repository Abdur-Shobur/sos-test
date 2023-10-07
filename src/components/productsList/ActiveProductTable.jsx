import React from 'react';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import { http } from '../action/axiosInstance';
import ActiveProductTableRow from './ActiveProductTableRow';

function ActiveProductTable() {
	const { data, isLoading } = useQuery(
		'fetch_admin_active_product_data',
		() => {
			return http.get(`/admin/request/product/active`);
		}
	);
	const products = data?.data?.product;

	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: '100%' }}
		>
			<thead>
				<tr>
					<th>Product</th>
					<th>Name</th>
					<th>Category Name</th>
					<th>Status</th>
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
					{products?.map((e) => (
						<ActiveProductTableRow data={e} key={e.id} />
					))}
				</tbody>
			)}
		</table>
	);
}

export default ActiveProductTable;
