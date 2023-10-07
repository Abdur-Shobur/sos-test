import { useParams } from 'react-router-dom';
import { AffiliatesProductView } from '../../../api/admin/affiliateProduct';
import ProductView from '../../../components/product-view/ProductView';

function ViewRequestProduct() {
	const { id } = useParams();

	const { isLoading, product, isError } = AffiliatesProductView(id);
	console.log(isError);

	return (
		<div className="content">
			<ProductView
				product={product?.product}
				from={'request-view-'}
				isLoading={isLoading}
				affiliatesReqProduct={product}
			/>
		</div>
	);
}

export default ViewRequestProduct;
