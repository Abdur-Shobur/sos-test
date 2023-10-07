import React from 'react';
import { useParams } from 'react-router-dom';
import ProductView from '../../../components/product-view/ProductView';
import { OrderViewAffiliateProduct } from '../../../api/affiliate/apiAffiliate';

function AffiliateOrderHistoryView() {
	const { id } = useParams();

	const { isLoading, product } = OrderViewAffiliateProduct(id);

	return (
		<div className="content">
			<ProductView
				from={'order-view'}
				isLoading={isLoading}
				product={product?.product}
				mainData={product}
			/>
		</div>
	);
}

export default AffiliateOrderHistoryView;
