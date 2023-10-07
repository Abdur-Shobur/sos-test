import Aos from 'aos';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductView from '../../../components/product-view/ProductView';
import { GetOrderHistoryViewByID } from '../../../api/vendor/apiVendor';

function VendorOrderHistoryView() {
	const { id } = useParams();
	const { isLoading, product } = GetOrderHistoryViewByID(id);
	useEffect(() => {
		Aos?.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="content">
			<ProductView
				mainData={product}
				from={'order-view'}
				isLoading={isLoading}
				product={product?.product}
				forVendor={true}
			/>
		</div>
	);
}

export default VendorOrderHistoryView;
