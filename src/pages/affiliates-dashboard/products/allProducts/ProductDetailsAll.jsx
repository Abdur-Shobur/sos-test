import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { http } from '../../../../components/action/axiosInstance';
import swal from 'sweetalert';
import tost from '../../../../components/action/tost';
import ProductView from '../../../../components/product-view/ProductView';
import { VendorProductViewByAffiliate } from '../../../../api/affiliate/apiAffiliate';

function ProductDetailsAll() {
	const [load, setBtnLoad] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	const { isLoading, product } = VendorProductViewByAffiliate(id);

	const request_product_handler = (id) => {
		setBtnLoad(true);
		const productData = {
			product_id: product?.id,
			vendor_id: product?.vendor?.id,
		};

		http.post(`/request/product/${id}`, productData).then((res) => {
			if (res.data.status === 200) {
				setBtnLoad(false);
				tost(res.data.message);
				navigate('/affiliates-dashboard/pending-product');
			} else {
				setBtnLoad(false);
				swal('Error!', res.data.message, 'error');
			}
		});
	};

	return (
		<div className="content">
			<ProductView
				from="affiliate-view-vendor-product"
				isLoading={isLoading}
				product={product}
				request_product_handler={request_product_handler}
				load={load}
				affiliateStatus="none"
			/>
		</div>
	);
}

export default ProductDetailsAll;
