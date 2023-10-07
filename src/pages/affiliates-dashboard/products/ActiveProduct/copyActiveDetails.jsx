import React, { useReducer } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { http } from '../../../../components/action/axiosInstance';
import Breadcrumbs from '../../../../components/breadcrumbs/Breadcrumbs';
import Slider from '../Slider';
import FieldIncrement from './action/FieldIncrement';
// import { initialState, reducer } from './action/action';
import { useState } from 'react';
import tost from '../../../../components/action/tost';
import Field from './cart-action/Field';
import { initialState, reducer } from './cart-action/action';
import { useEffect } from 'react';
import ProductLoading from '../../../../components/loader/ProductLoading';
import CartFrom from './addto-cart-action/CartFrom';
import {
	initialStateAction,
	reducerAction,
} from './addto-cart-action/actionReducer';
function ActiveDetailsCopy() {
	const [load, setBtnLoad] = useState(false);
	const { id } = useParams();

	const { data, isLoading } = useQuery(
		['get__afi_details_active_product_data', id],
		() => {
			return http.get(`/single/product/${id}`);
		}
	);
	const product = data?.data?.product;

	const [state, dispatch] = useReducer(reducer, initialState);
	const [stateData, dispatchFun] = useReducer(
		reducerAction,
		initialStateAction
	);

	// total user cart qty
	// let totalCartQty = state.data
	// 	.filter((f) => f.qty !== null)
	// 	.map((e) => parseInt(e.qty))
	// 	.reduce((pre, cur) => pre.qty + cur.qty);
	// const totalQty = state?.data
	// 	?.filter((e) => e.qty !== null)
	// 	?.map((e) => parseInt(e.qty))
	// 	?.reduce((pre, cur) => pre + cur, 0);

	 
	useEffect(() => {
		dispatch({
			type: 'API',
			payload: product?.variants ? product?.variants : [],
		});
	}, [product]);
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
			})
			.then((res) => {
				if (res.data.status === 404 || 409) {
					setBtnLoad(false);
					tost(res.data.message);
				} else if (res.data.status === 201) {
					setBtnLoad(false);
					tost(res.data.message);
				} else {
					setBtnLoad(false);
				}
			});
	};

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center h-100 w-100">
				<ProductLoading />
			</div>
		);
	}

	return (
		<div className="content">
			<Breadcrumbs />
			<div className="row">
				<div className="col-12">
					<div className="card card-default">
						<div className="card-header card-header-border-bottom">
							<h2>Product Detail</h2>
						</div>

						<div className="card-body product-detail">
							<div className="row">
								<div className="col-xl-4 col-lg-6">
									<div className="row">
										<Slider product_image={product?.product_image} />
									</div>
								</div>

								<div className="col-xl-5 col-lg-6">
									<div className="row product-overview">
										<div className="col-12">
											<h5 className="product-title">{product?.name}</h5>
											<p className="product-rate">
												<i className="mdi mdi-star is-rated"></i>
												<i className="mdi mdi-star is-rated"></i>
												<i className="mdi mdi-star is-rated"></i>
												<i className="mdi mdi-star is-rated"></i>
												<i className="mdi mdi-star"></i>
											</p>
											<p className="product-desc">
												{product?.short_description}
											</p>

											<div className="ec-ofr">
												<h6>Available offers</h6>
												<ul>
													<li>
														<b>Special Price :</b> Get extra 16% off (price
														inclusive of discount) <a href="#">T&C</a>{' '}
													</li>
												</ul>
											</div>
											<p className="product-price">
												Original Price: ${' '}
												<span className="text-decoration-line-through">
													{product?.original_price}
												</span>
											</p>
											<p className="product-price">
												Selling Price: ${product?.selling_price}
											</p>
											<p className="product-price">
												Category Name: {product?.category?.name}
											</p>
											<p className="product-price">
												Brand Name: {product?.brand?.name}
											</p>
											<p className="product-price">Available: {product?.qty}</p>
											<div>
												{/* <CartFrom state={stateData} dispatch={dispatchFun} /> */}
											</div>
											{/* <p className="product-sku">SKU#: WH12</p> */}
											{product?.variants ? (
												<div>
													{/* <Field
														state={state}
														dispatch={dispatch}
														data={product}
													/> */}
													<CartFrom state={stateData} dispatch={dispatchFun} />
												</div>
											) : (
												<div>
													<div className="col-md-4 ">
														<label htmlFor="add-qty">
															Quantity{' '}
															<span className="badge badge-info">
																{data?.preQty}
															</span>
														</label>
														<input
															onChange={(e) =>
																dispatch({
																	type: 'CHANGE_ONLY_QTY',
																	payload:
																		e.target.value < 1 ? null : e.target.value,
																})
															}
															min="0"
															max={data?.qty}
															type="number"
															id="add-qty"
															name="qty"
															placeholder="Add Quantity"
															className={`form-control`}
															style={{
																borderColor:
																	parseInt(data.qty) > parseInt(data.preQty) &&
																	'red',
															}}
														/>
														{/* <input
					key={data.id}
					type="number"
					name="quantity"
					value={data.quantity || ''}
					min={1}
					data-id={data.id}
					onChange={handleQuantityChange}
				/> */}
													</div>
												</div>
											)}

											{/* <div>
												<FieldIncrement
													color={product?.colors}
													size={product?.sizes}
													dispatch={dispatch}
													state={state}
												/>
											</div> */}

											<div className="product-stock mt-3">
												<div className="stock">
													<p className="title">Total Cart</p>
													<p className="text">{state.totalQty || 0}</p>
												</div>
												<div>
													<p
														className={`${
															state.totalQty > parseInt(product?.qty)
																? 'd-block text-danger'
																: 'd-none'
														}`}
													>
														{' '}
														You can select Maximum {product?.qty} products
													</p>
													<button
														// hidden={product?.request !== '1'}
														disabled={
															load || state.totalQty > parseInt(product?.qty)
														}
														onClick={() =>
															add_to_cart_handler(data?.data?.productDetails)
														}
														className="btn btn-success"
													>
														Add to Cart
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-lg-12 u-card">
									<div className="card card-default seller-card">
										<div className="card-body text-center">
											<a
												href="javascript:0"
												className="text-secondary d-inline-block"
											>
												<div className="image mb-3">
													<img
														src={`${process.env.REACT_APP_IMG_URL}/${product?.vendor?.image}`}
														className="img-fluid rounded-circle"
														alt="Avatar "
														style={{
															height: '175px',
															objectFit: 'contain',
														}}
													/>
												</div>

												<h5 className="text-dark">{product?.vendor?.name}</h5>
												<p className="product-rate">
													<i className="mdi mdi-star is-rated"></i>
													<i className="mdi mdi-star is-rated"></i>
													<i className="mdi mdi-star is-rated"></i>
													<i className="mdi mdi-star is-rated"></i>
													<i className="mdi mdi-star"></i>
												</p>

												<ul className="list-unstyled">
													<li className="d-flex mb-1">
														<i className="mdi mdi-map mr-1"></i>
														<span>321/2, rio street, usa.</span>
													</li>
													<li className="d-flex mb-1">
														<i className="mdi mdi-email mr-1"></i>
														<span>{product?.vendor?.email}</span>
													</li>
													<li className="d-flex">
														<i className="mdi mdi-whatsapp mr-1"></i>
														<span>{product?.vendor?.number}</span>
													</li>
												</ul>
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="row review-rating mt-4">
								<div className="col-12">
									<ul className="nav nav-tabs" id="myRatingTab" role="tablist">
										<li className="nav-item">
											<a
												className="nav-link active"
												id="product-detail-tab"
												data-bs-toggle="tab"
												data-bs-target="#productdetail"
												href="#productdetail"
												role="tab"
												aria-selected="true"
											>
												<i className="mdi mdi-library-books mr-1"></i> Detail
											</a>
										</li>

										<li className="nav-item">
											<a
												className="nav-link"
												id="product-information-tab"
												data-bs-toggle="tab"
												data-bs-target="#productinformation"
												href="#productinformation"
												role="tab"
												aria-selected="false"
											>
												<i className="mdi mdi-information mr-1"></i>Info
											</a>
										</li>

										<li className="nav-item">
											<a
												className="nav-link"
												id="product-reviews-tab"
												data-bs-toggle="tab"
												data-bs-target="#productreviews"
												href="#productreviews"
												role="tab"
												aria-selected="false"
											>
												<i className="mdi mdi-star-half mr-1"></i> Reviews
											</a>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent2">
										<div
											className="tab-pane pt-3 fade show active"
											id="productdetail"
											role="tabpanel"
										>
											{product?.long_description}
											<ul className="features">
												<li>
													Any Product types that You want - Simple, Configurable
												</li>
												<li>Downloadable/Digital Products, Virtual Products</li>
												<li>Inventory Management with Backordered items</li>
												<li>Flatlock seams throughout.</li>
											</ul>
										</div>

										<div
											className="tab-pane pt-3 fade"
											id="productinformation"
											role="tabpanel"
										>
											<ul>
												<li>
													<span>Weight</span> 1000 g
												</li>
												<li>
													<span>Dimensions</span> 35 * 30 * 7 cm
												</li>
												<li>
													<span>Color</span> Black, Pink, Red, White
												</li>
											</ul>
										</div>

										<div
											className="tab-pane pt-3 fade"
											id="productreviews"
											role="tabpanel"
										>
											<div className="ec-t-review-wrapper">
												<div className="ec-t-review-item">
													<div className="ec-t-review-avtar">
														<img src="assets/img/review-image/1.jpg" alt="" />
													</div>
													<div className="ec-t-review-content">
														<div className="ec-t-review-top">
															<p className="ec-t-review-name">Jeny Doe</p>
															<div className="ec-t-rate">
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star"></i>
															</div>
														</div>
														<div className="ec-t-review-bottom">
															<p>
																Lorem Ipsum is simply dummy text of the printing
																and typesetting industry.
															</p>
														</div>
													</div>
												</div>
												<div className="ec-t-review-item">
													<div className="ec-t-review-avtar">
														<img src="assets/img/review-image/2.jpg" alt="" />
													</div>
													<div className="ec-t-review-content">
														<div className="ec-t-review-top">
															<p className="ec-t-review-name">Linda Morgus</p>
															<div className="ec-t-rate">
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star is-rated"></i>
																<i className="mdi mdi-star"></i>
															</div>
														</div>
														<div className="ec-t-review-bottom">
															<p>
																Lorem Ipsum is simply dummy text of the printing
																and typesetting industry.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ActiveDetailsCopy;
