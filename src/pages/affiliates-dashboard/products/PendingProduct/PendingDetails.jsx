import React from 'react';
import { useParams } from 'react-router';
import ProductView from '../../../../components/product-view/ProductView';
import { VendorProductViewByAffiliate } from '../../../../api/affiliate/apiAffiliate';
function PendingDetails() {
	const { id } = useParams();

	const { isLoading, product } = VendorProductViewByAffiliate(id);

	return (
		<div className="content">
			<ProductView
				from="affiliate-view-pending-request-product"
				isLoading={isLoading}
				product={product}
				affiliateStatus="pending"
			/>
		</div>
	);
}

export default PendingDetails;
