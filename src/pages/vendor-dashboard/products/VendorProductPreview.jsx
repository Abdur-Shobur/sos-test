import React from 'react';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import ProductView from '../../../components/product-view/ProductView';
import { EditProductById } from '../../../components/action/getDataApi';

function VendorProductPreview() {
	const { id = 5 } = useParams();

	const { editProduct: product, isLoading } = EditProductById(id);
	return (
		<div className="content">
			<Breadcrumbs id={id} />
			<ProductView isLoading={isLoading} product={product} from="vendor-view" />
		</div>
	);
}

export default VendorProductPreview;
