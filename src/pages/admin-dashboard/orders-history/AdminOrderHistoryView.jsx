import React from 'react';
import { useParams } from 'react-router-dom';
import { ViewOrderProduct } from '../../../api/admin/orderAPI';
import OrderView from './order-view/OrderView';

function AdminOrderHistoryView() {
	const { id } = useParams();
	const { isLoading, product, refetch } = ViewOrderProduct(id);

	return (
		<div className="content">
			{/* <ProductView
				from={'order-view'}
				isLoading={isLoading}
				product={product?.product}
				mainData={product}
			/> */}
			<OrderView
				product={product?.product}
				mainData={product}
				isLoading={isLoading}
				refetch={refetch}
			/>
		</div>
	);
}

export default AdminOrderHistoryView;
