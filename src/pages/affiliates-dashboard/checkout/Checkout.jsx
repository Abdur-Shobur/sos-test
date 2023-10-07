import React from 'react';
import { http } from '../../../components/action/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import InputFields from './components/InputFields';
import { useReducer } from 'react';
import { initialState, reducer } from './components/action';
import { useEffect } from 'react';
import ProductLoading from '../../../components/loader/ProductLoading';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { GetCartItemByID } from '../../../api/affiliate/apiAffiliate';
import tost from '../../../components/action/tost';

function Checkout() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	const { id } = useParams();
	const { cartData, isLoading } = GetCartItemByID(id);

	const totalCalculation = (data) => {
		const x = state.selected.map((e) => e.variants);
		const totalPrice =
			[]
				.concat(...x)
				.map((e) => parseInt(e.qty))
				.reduce((pre, cur) => pre + cur, 0) * parseFloat(data).toFixed(2);
		return totalPrice;
	};
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: {
				api: cartData,
				product_id: cartData?.product_id,
				vendor_id: cartData?.vendor_id,
				cart_id: cartData?.id,
				amount: cartData?.amount,
			},
		});
	}, [cartData]);
	console.log(state);

	const continueToCheckoutHandler = () => {
		http
			.post(`/order-create`, { datas: state.selected })
			.then((res) => {
				if (res.data.status === 200) {
					navigate(`/affiliates-dashboard/orders-history-all`);
					tost(res.data.message);
					return dispatch({
						type: 'ClEAR',
					});
				}

				let err_message =
					Object.keys(res.data.errors)[0] +
					' : ' +
					Object.values(res.data.errors)[0][0];

				tost(err_message, false);
			})
			.catch((err) => {
				tost(err.message, false);
			});
	};
	if (isLoading) {
		return <ProductLoading />;
	}

	return (
		<div className="container">
			<Helmet>
				<title>Checkout Page-SOS</title>
			</Helmet>
			<div className="py-5 text-center">
				<h2>Checkout form</h2>
				<p className="lead">checkout</p>
			</div>

			<div data-aos="fade" className="row">
				<div className="col-md-4 order-md-2 mb-4">
					<h4 className="d-flex justify-content-between align-items-center mb-3">
						<span className="text-muted">Product Details</span>
						<span className="badge badge-secondary badge-pill">
							{state?.selected?.length}
						</span>
					</h4>
					<ul className="list-group mb-3">
						<li className="list-group-item ">
							<h6 className="my-0">{cartData?.product?.name}</h6>
							<div className="d-flex justify-content-between lh-condensed">
								<small className="text-muted">Price:</small>
								<span className="text-muted">{cartData?.product_price} tk</span>
							</div>
							<div className="d-flex justify-content-between lh-condensed">
								<small className="text-muted">Per Commission:</small>
								<span className="text-muted">{cartData?.amount} tk</span>
							</div>
						</li>
						{state?.selected?.map((v, i) => (
							<li
								key={i}
								className="list-group-item d-flex justify-content-between lh-condensed"
							>
								<div>
									<h6 className="my-0">Variant {i + 1}</h6>
									{/* <small className="text-muted">Name: {v.name}</small> */}

									<small className="text-muted d-block">
										Qty:{' '}
										{v?.variants
											?.map((q) => parseInt(q.qty))
											.reduce((pre, cur) => pre + cur, 0)}
									</small>
								</div>
								<span className="text-muted">
									{v.variants
										.map(
											(x) =>
												parseFloat(x.qty).toFixed(2) *
												parseFloat(cartData?.product_price).toFixed(2)
										)
										.reduce((pre, cur) => pre + cur, 0)
										.toFixed(2) || '00'}
									tk
								</span>
							</li>
						))}

						<li className="list-group-item d-flex justify-content-between">
							<span>Total Commission </span>
							<strong>
								{totalCalculation(cartData?.amount).toFixed(2) || '00'} tk
							</strong>
						</li>
						<li className="list-group-item d-flex justify-content-between">
							<span>Total Price (TK)</span>
							<strong>
								{totalCalculation(cartData?.product_price).toFixed(2) || '00'}{' '}
								tk
							</strong>
						</li>
					</ul>
				</div>
				<div className="col-md-8 order-md-1">
					<h4 className="mb-3">Shipping address</h4>
					<InputFields state={state} dispatch={dispatch} />
					<hr className="mb-4" />
					<button
						disabled={state.selected.length <= 0}
						onClick={continueToCheckoutHandler}
						className="btn btn-primary btn-lg btn-block"
						type="button"
					>
						Continue to checkout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
