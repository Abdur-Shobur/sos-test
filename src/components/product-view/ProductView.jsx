import React from 'react';
import Slider from '../slider/Slider';
import ProductLoading from '../loader/ProductLoading';
import UserProfile from './own-components/UserProfile';
import Details from './own-components/Details';
import ShippingAddress from './own-components/ShippingAddress';
import Specification from './own-components/Specification';
import CartFrom from './own-components/add-to-cart-action/CartFrom';
import CartHandler from './own-components/add-to-cart-action/CartHandler';
import { Helmet } from 'react-helmet';

function ProductView({
	isLoading,
	product,
	from = 'all',
	mainData,
	load,
	request_product_handler,
	add_to_cart_handler,
	state,
	dispatch,
	affiliatesReqProduct,
	error,
	active_status_handler,
	affiliateStatus,
	forVendor,
}) {
	let vendor = null;
	let affiliator = null;

	if (from === 'order-view') {
		vendor = mainData?.vendor;
		affiliator = mainData?.affiliator;
	}
	if (from === 'request-view-') {
		vendor = affiliatesReqProduct?.vendor;
		affiliator = affiliatesReqProduct?.affiliator;
	} else if (
		from === 'all' ||
		from === 'admin' ||
		from === 'affiliate-view-vendor-product' ||
		from === 'affiliate-view-pending-request-product'
	) {
		vendor = product?.vendor;
		affiliator = product?.affiliator;
	}

	return (
		<div className="row">
			<Helmet>
				<title>Product View-SOS</title>
			</Helmet>
			<div className="col-12">
				<div className="card card-default">
					<div className="card-header card-header-border-bottom d-flex justify-content-between">
						<h2>Product Detail</h2>
						{from === 'admin' && (
							<div className="form-floating">
								<select
									onChange={(e) =>
										active_status_handler(product?.id, e.target.value)
									}
									className="form-select"
									id="floatingSelect"
									aria-label="Floating label select example"
								>
									<option
										selected={product?.status === 'pending'}
										value="pending"
									>
										Pending
									</option>
									<option
										selected={product?.status === 'active'}
										value="active"
									>
										Active
									</option>
									<option
										selected={product?.status === 'rejected'}
										value="rejected"
									>
										Rejected
									</option>
									<option selected={product?.status === 'hold'} value="hold">
										Hold
									</option>
									<option
										selected={product?.status === 'delete'}
										value="delete"
									>
										Delete
									</option>
								</select>
								<label for="floatingSelect">Status</label>
							</div>
						)}
						{forVendor && (
							<div className="form-floating">
								<select
									onChange={(e) =>
										active_status_handler(product?.id, e.target.value)
									}
									className="form-select"
									id="floatingSelect"
									aria-label="Floating label select example"
								>
									<option
										selected={product?.status === 'pending'}
										value="pending"
									>
										Pending
									</option>
									<option
										selected={product?.status === 'active'}
										value="active"
									>
										Active
									</option>
									<option
										selected={product?.status === 'rejected'}
										value="rejected"
									>
										Rejected
									</option>
									<option selected={product?.status === 'hold'} value="hold">
										Hold
									</option>
									<option
										selected={product?.status === 'delete'}
										value="delete"
									>
										Delete
									</option>
								</select>
								<label for="floatingSelect">Status</label>
							</div>
						)}
					</div>

					<div className="card-body product-detail">
						{isLoading ? (
							<div className="d-flex justify-content-center align-items-center h-100 w-100">
								<ProductLoading />
							</div>
						) : (
							<>
								<div className="row">
									{from === 'order-view' ? (
										<div className="col-xl-4 col-lg-6">
											<div className="row">
												<img
													style={{ borderRadius: '10px' }}
													className="img-responsive w-100"
													src={` ${process.env.REACT_APP_IMG_URL}/${product?.image}`}
													alt=""
												/>
											</div>
										</div>
									) : (
										<Slider
											image={product?.image}
											product_image={product?.product_image}
										/>
									)}

									<div className="col-xl-5 col-lg-6">
										<div className="row product-overview">
											<div className="col-12">
												<Details
													product={product}
													affiliateStatus={affiliateStatus}
												/>
												{from === 'affiliate-active-product' && (
													<>
														{product?.variants ? (
															<div>
																<CartFrom state={state} dispatch={dispatch} />
															</div>
														) : (
															<div>
																<div className="col-md-4 ">
																	<label htmlFor="add-qty">
																		Quantity{' '}
																		<span className="badge badge-info">
																			{state?.preQty}
																		</span>
																	</label>
																	<input
																		onChange={(e) =>
																			dispatch({
																				type: 'CHANGE_ONLY_QTY',
																				payload:
																					e.target.value < 1
																						? null
																						: e.target.value,
																			})
																		}
																		min="0"
																		max={state?.qty}
																		type="number"
																		id="add-qty"
																		name="qty"
																		placeholder="Add Quantity"
																		className={`form-control`}
																		style={{
																			borderColor:
																				parseInt(state.qty) >
																					parseInt(state.preQty) && 'red',
																		}}
																	/>
																</div>
															</div>
														)}
														{/* <CartFrom state={state} dispatch={dispatch} /> */}
														<CartHandler
															add_to_cart_handler={add_to_cart_handler}
															load={load}
															product={product}
															state={state}
														/>
													</>
												)}

												{from === 'affiliate-view-vendor-product' && (
													<button
														disabled={load}
														onClick={() => request_product_handler(product?.id)}
														className={`btn btn-primary `}
													>
														Request Product
													</button>
												)}

												{from === 'affiliate-view-pending-request-product' && (
													<button className={`btn btn-primary`} disabled>
														Already Requested
													</button>
												)}
											</div>
										</div>
									</div>

									<div className="col-xl-3 col-lg-12 u-card">
										{vendor && <UserProfile user={vendor} from="Vendor" />}
										{affiliator && (
											<UserProfile user={affiliator} from="Affiliate" />
										)}
									</div>
								</div>

								{from === 'order-view' && (
									<ShippingAddress product={mainData} />
								)}

								<Specification product={product} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductView;
