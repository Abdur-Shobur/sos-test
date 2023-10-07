import React, { useReducer } from 'react';
import { useParams, useNavigate } from 'react-router';
import { http } from '../../../../components/action/axiosInstance';
import { useState } from 'react';
import tost from '../../../../components/action/tost';
import { useEffect } from 'react';

import ProductView from '../../../../components/product-view/ProductView';
import {
	initialStateAction,
	reducerAction,
} from '../../../../components/product-view/own-components/add-to-cart-action/actionReducer';
import { VendorProductViewByAffiliate } from '../../../../api/affiliate/apiAffiliate';
function ActiveDetails() {
	const [error, setError] = useState({ status: false, message: null });
	const [load, setBtnLoad] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const { isLoading, product } = VendorProductViewByAffiliate(id);
	const [stateData, dispatchFun] = useReducer(
		reducerAction,
		initialStateAction
	);

	useEffect(() => {
		dispatchFun({
			type: 'API',
			payload: product?.variants ? product?.variants : [],
		});
	}, [product]);
	const add_to_cart_handler = () => {
		setBtnLoad(true);
		http
			.post(`/add-to-cart`, {
				product_id: product?.id,
				// amount: '',
				cartItems: stateData.selectedData
					.filter((qt) => qt.qty !== null)
					.map((e) => ({
						id: e.id,
						qty: e.qty,
						size: e.size,
						color: e.color,
					})),
				vendor_id: product?.productdetails?.[0]?.vendor_id,
				product_price: product?.selling_price,
				discount_type: product?.discount_type,
				discount_rate: product?.discount_rate,
				category_id: product?.category?.id,
			})
			.then((res) => {
				if (res.data.status === 404 || res.data.status === 409) {
					setBtnLoad(false);
					tost(res.data.message, false);
					setError({ message: res.data.message, status: true });
				} else if (res.data.status === 201) {
					setBtnLoad(false);
					tost(res.data.message);
					navigate(`/affiliates-dashboard/add-to-cart`);
				} else {
					setBtnLoad(false);
				}
			});
	};

	return (
		<div className="content">
			<ProductView
				from={'affiliate-active-product'}
				isLoading={isLoading}
				product={product}
				load={load}
				add_to_cart_handler={add_to_cart_handler}
				state={stateData}
				dispatch={dispatchFun}
				error={error}
			/>
		</div>
	);
}

export default ActiveDetails;
