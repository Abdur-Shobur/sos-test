import React from 'react';

import ProductLoading from '../loader/ProductLoading';

function OrderView({ product, isLoading }) {
	return (
		<div className="content">
			{/* <Breadcrumbs /> */}
			<div className="row">
				<div className="col-12">
					<div className="card card-default">
						<div className="card-header card-header-border-bottom">
							<h2>Product Detail</h2>
						</div>

						<div className="card-body product-detail">
							{isLoading ? (
								<div className="d-flex justify-content-center align-items-center h-100 w-100">
									<ProductLoading />
								</div>
							) : (
								<>
									<div className="row">
										<div className="col-xl-4 col-lg-6">
											<div className="row">
												<img
													style={{ borderRadius: '10px' }}
													className="img-responsive w-100"
													src={` ${process.env.REACT_APP_IMG_URL}/${product?.product?.image}`}
													alt=""
												/>
											</div>
										</div>

										<div className="col-xl-5 col-lg-6">
											<div className="row product-overview">
												<div className="col-12">
													<h5 className="product-title">
														{product?.product?.name}
													</h5>
													<p className="product-rate">
														<i className="mdi mdi-star is-rated"></i>
														<i className="mdi mdi-star is-rated"></i>
														<i className="mdi mdi-star is-rated"></i>
														<i className="mdi mdi-star is-rated"></i>
														<i className="mdi mdi-star"></i>
													</p>
													<p className="product-desc">
														{product?.product?.short_description}
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
															{product?.product?.original_price}
														</span>
													</p>
													<p className="product-price">
														Selling Price: ${product?.product?.selling_price}
													</p>
													<p className="product-price">
														Commission: {product?.product?.discount_rate}
														{product?.product?.discount_type === 'percent'
															? '%'
															: ' tk'}{' '}
														per product
													</p>

													{/* <p className="product-sku">SKU#: WH12</p> */}
													<ul className="product-size">
														{product?.sizes?.map((e) => (
															<li key={e.id} className="size">
																<span>{e.name}</span>
															</li>
														))}
													</ul>
													<ul className="product-color">
														{product?.colors?.map((e) => (
															<li key={e?.id} className="color">
																<span
																	style={{ backgroundColor: e.code }}
																></span>
															</li>
														))}
													</ul>

													<div className="product-stock">
														<div className="stock">
															<p className="title">Available</p>
															<p className="text">{product?.qty}</p>
														</div>

														{product?.productdetails?.length === 1 &&
															product?.productdetails[0].status === 1 && (
																<div>
																	<button className={`btn btn-primary `}>
																		Add to cart
																	</button>
																</div>
															)}
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-lg-12 u-card">
											<div className="card card-default seller-card">
												<div className="position-relative card-body text-center">
													<div className="position-absolute">
														<span className="badge rounded-pill bg-primary">
															Vendor
														</span>
													</div>

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
																	height: '100px',
																	objectFit: 'contain',
																}}
															/>
														</div>

														<h5 className="text-dark">
															{product?.vendor?.name}
														</h5>

														<ul className="list-unstyled">
															<li className="d-flex mb-1">
																<i className="mdi mdi-email mr-1"></i>
																<span>{product?.vendor?.email}</span>
															</li>
															{product?.vendor?.number && (
																<li className="d-flex">
																	<i className="mdi mdi-whatsapp mr-1"></i>
																	<span>{product?.vendor?.number}</span>
																</li>
															)}
															{product?.vendor?.number2 && (
																<li className="d-flex">
																	<i className="mdi mdi-whatsapp mr-1"></i>
																	<span>{product?.vendor?.number2}</span>
																</li>
															)}
														</ul>
													</a>
												</div>
											</div>
											<div className="mt-3 card card-default seller-card">
												<div className="position-relative card-body text-center">
													<div className="position-absolute">
														<span className="badge rounded-pill bg-primary">
															Affiliate
														</span>
													</div>
													<a
														href="javascript:0"
														className="text-secondary d-inline-block"
													>
														<div className="image mb-3">
															<img
																src={`${process.env.REACT_APP_IMG_URL}/${product?.affiliator?.image}`}
																className="img-fluid rounded-circle"
																alt="Avatar "
																style={{
																	height: '100px',
																	objectFit: 'contain',
																}}
															/>
														</div>

														<h5 className="text-dark">
															{product?.affiliator?.name}
														</h5>

														<ul className="list-unstyled">
															<li className="d-flex mb-1">
																<i className="mdi mdi-email mr-1"></i>
																<span>{product?.affiliator?.email}</span>
															</li>
															<li className="d-flex">
																<i className="mdi mdi-whatsapp mr-1"></i>
																<span>{product?.affiliator?.number}</span>
															</li>
															<li className="d-flex">
																<i className="mdi mdi-whatsapp mr-1"></i>
																<span>{product?.affiliator?.number2}</span>
															</li>
														</ul>
													</a>
												</div>
											</div>
										</div>
									</div>

									<div
										className="card border-info mb-3"
										style={{ maxWidth: '25rem' }}
									>
										<div className="card-header">Shipping Address</div>
										<div className="card-body">
											<h5 className="card-title d-flex">
												<span className="" style={{ flex: '1' }}>
													Name:
												</span>
												<span className="" style={{ flex: '1' }}>
													{product.name}
												</span>
											</h5>
											<div>
												<p className="card-text d-flex justify-content-between border-bottom py-1 border-top">
													<span className="" style={{ flex: '1' }}>
														Phone:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.phone}
													</span>
												</p>
												<p className="card-text d-flex justify-content-between border-bottom py-1">
													<span className="" style={{ flex: '1' }}>
														Email:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.email}
													</span>
												</p>
												<p className="card-text d-flex justify-content-between border-bottom py-1">
													<span className="" style={{ flex: '1' }}>
														City:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.city}
													</span>
												</p>
												<p className="card-text d-flex justify-content-between border-bottom py-1">
													<span className="" style={{ flex: '1' }}>
														Address:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.address}
													</span>
												</p>
												<p className="card-text d-flex justify-content-between border-bottom py-1">
													<span className="" style={{ flex: '1' }}>
														Afi Amount:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.afi_amount}
													</span>
												</p>
												<p className="card-text d-flex justify-content-between border-bottom py-1">
													<span className="" style={{ flex: '1' }}>
														Product Price:
													</span>
													<span className="" style={{ flex: '1' }}>
														{product?.product_amount}
													</span>
												</p>
											</div>
											<h5 className="d-flex pt-1">Variant</h5>
											<div>
												<table className="table">
													<thead>
														<tr>
															<th scope="col">Color</th>
															<th scope="col">Size</th>
															<th scope="col">Qty</th>
														</tr>
													</thead>
													<tbody>
														{product?.variants?.map((e, i) => (
															<tr key={i}>
																<td>{e.color}</td>
																<td>{e.size}</td>
																<td>{e.qty}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>

									<div className="row review-rating mt-4">
										<div className="col-12">
											<ul
												className="nav nav-tabs"
												id="myRatingTab"
												role="tablist"
											>
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
														<i className="mdi mdi-library-books mr-1"></i>{' '}
														Detail
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
															Any Product types that You want - Simple,
															Configurable
														</li>
														<li>
															Downloadable/Digital Products, Virtual Products
														</li>
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
																<img
																	src="assets/img/review-image/1.jpg"
																	alt=""
																/>
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
																		Lorem Ipsum is simply dummy text of the
																		printing and typesetting industry.
																	</p>
																</div>
															</div>
														</div>
														<div className="ec-t-review-item">
															<div className="ec-t-review-avtar">
																<img
																	src="assets/img/review-image/2.jpg"
																	alt=""
																/>
															</div>
															<div className="ec-t-review-content">
																<div className="ec-t-review-top">
																	<p className="ec-t-review-name">
																		Linda Morgus
																	</p>
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
																		Lorem Ipsum is simply dummy text of the
																		printing and typesetting industry.
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderView;
