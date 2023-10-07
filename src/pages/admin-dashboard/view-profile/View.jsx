import React from 'react';
import { useQuery } from 'react-query';
import user_logo from '../../../assets/icons/user-icon.webp';
import { http } from '../../../components/action/axiosInstance';

const View = () => {
	const { data, isLoading } = useQuery('fetch_admin_profile_data', () => {
		return http.get(`/admin/profile`, {});
	});

	const vendorData = data?.data?.user;
	isLoading && <p>Loading...</p>;
	return (
		<>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-contacts">
					<div>
						<h1>Admin Profile</h1>
						<p className="breadcrumbs">
							<span>
								<a href="index.html">Home</a>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>
							Profile
						</p>
					</div>
					<div>
						<a href="vendor-list.html" className="btn btn-primary">
							Edit
						</a>
					</div>
				</div>
				<div className="card bg-white profile-content ec-vendor-profile">
					<div className="row">
						<div className="col-lg-4 col-xl-3">
							<div className="profile-content-left profile-left-spacing">
								<div className="ec-disp">
									<div className="text-center widget-profile px-0 border-0">
										<div className="card-img mx-auto rounded-circle">
											<img
												src={
													!vendorData?.image
														? user_logo
														: `${process.env.REACT_APP_IMG_URL}/${vendorData.image}`
												}
												alt="user image"
											/>
										</div>
										<div className="card-body">
											<h4 className="py-2 text-dark">{vendorData?.name}</h4>
											<p>{vendorData?.email}</p>
											<a className="btn btn-primary my-3" href="#">
												Follow
											</a>
										</div>
									</div>

									<div className="d-flex justify-content-between ">
										<div className="text-center pb-4">
											<h6 className="text-dark pb-2">1703</h6>
											<p>Friends</p>
										</div>

										<div className="text-center pb-4">
											<h6 className="text-dark pb-2">3005</h6>
											<p>Followers</p>
										</div>

										<div className="text-center pb-4">
											<h6 className="text-dark pb-2">1150</h6>
											<p>Following</p>
										</div>
									</div>
								</div>
								<hr className="w-100" />

								<div className="contact-info pt-4">
									<h5 className="text-dark">Contact Information</h5>
									<p className="text-dark font-weight-medium pt-24px mb-2">
										Email address
									</p>
									<p>{vendorData?.email}</p>
									<p className="text-dark font-weight-medium pt-24px mb-2">
										Phone Number
									</p>
									<p>{vendorData?.number}</p>
									<p className="text-dark font-weight-medium pt-24px mb-2">
										Birthday
									</p>
									<p>Dec 10, 1991</p>
									<p className="text-dark font-weight-medium pt-24px mb-2">
										Social Profile
									</p>
									<p className="social-button">
										<a
											href="#"
											className="mb-1 btn btn-outline btn-twitter rounded-circle"
										>
											<i className="mdi mdi-twitter"></i>
										</a>

										<a
											href="#"
											className="mb-1 btn btn-outline btn-linkedin rounded-circle"
										>
											<i className="mdi mdi-linkedin"></i>
										</a>

										<a
											href="#"
											className="mb-1 btn btn-outline btn-facebook rounded-circle"
										>
											<i className="mdi mdi-facebook"></i>
										</a>

										<a
											href="#"
											className="mb-1 btn btn-outline btn-skype rounded-circle"
										>
											<i className="mdi mdi-skype"></i>
										</a>
									</p>
								</div>
							</div>
						</div>

						<div className="col-lg-8 col-xl-9">
							<div className="profile-content-right profile-right-spacing py-5">
								<ul
									className="nav nav-tabs px-3 px-xl-5 nav-style-border"
									id="myProfileTab"
									role="tablist"
								>
									<li className="nav-item" role="presentation">
										<button
											className="nav-link active"
											id="profile-tab"
											data-bs-toggle="tab"
											data-bs-target="#profile"
											type="button"
											role="tab"
											aria-controls="profile"
											aria-selected="true"
										>
											Profile
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button
											className="nav-link"
											id="settings-tab"
											data-bs-toggle="tab"
											data-bs-target="#settings"
											type="button"
											role="tab"
											aria-controls="settings"
											aria-selected="false"
										>
											Settings
										</button>
									</li>
								</ul>
								<div className="tab-content px-3 px-xl-5" id="myTabContent">
									<div
										className="tab-pane fade show active"
										id="profile"
										role="tabpanel"
										aria-labelledby="profile-tab"
									>
										<div className="tab-widget mt-5">
											<div className="row">
												<div className="col-xl-4">
													<div className="media widget-media p-3 bg-white border">
														<div className="icon rounded-circle mr-3 bg-primary">
															<i className="mdi mdi-account-outline text-white "></i>
														</div>

														<div className="media-body align-self-center">
															<h4 className="text-primary mb-2">5300</h4>
															<p>New Users</p>
														</div>
													</div>
												</div>

												<div className="col-xl-4">
													<div className="media widget-media p-3 bg-white border">
														<div className="icon rounded-circle bg-warning mr-3">
															<i className="mdi mdi-cart-outline text-white "></i>
														</div>

														<div className="media-body align-self-center">
															<h4 className="text-primary mb-2">1953</h4>
															<p>Order Placed</p>
														</div>
													</div>
												</div>

												<div className="col-xl-4">
													<div className="media widget-media p-3 bg-white border">
														<div className="icon rounded-circle mr-3 bg-success">
															<i className="mdi mdi-diamond-stone text-white "></i>
														</div>

														<div className="media-body align-self-center">
															<h4 className="text-primary mb-2">1450</h4>
															<p>Total Sales</p>
														</div>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-xl-12">
													<div className="card card-default mb-24px">
														<div className="card-header justify-content-between mb-1">
															<h2>Latest Notifications</h2>
															<div>
																<button className="text-black-50 mr-2 font-size-20">
																	<i className="mdi mdi-cached"></i>
																</button>
																<div className="dropdown show d-inline-block widget-dropdown">
																	<a
																		className="dropdown-toggle icon-burger-mini"
																		href="#"
																		role="button"
																		id="dropdown-notification"
																		data-bs-toggle="dropdown"
																		aria-haspopup="true"
																		aria-expanded="false"
																		data-display="static"
																	></a>
																	<ul
																		className="dropdown-menu dropdown-menu-right"
																		aria-labelledby="dropdown-notification"
																	>
																		<li className="dropdown-item">
																			<a href="#">Action</a>
																		</li>
																		<li className="dropdown-item">
																			<a href="#">Another action</a>
																		</li>
																		<li className="dropdown-item">
																			<a href="#">Something else here</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
														<div
															className="card-body compact-notifications"
															data-simplebar="init"
															style={{ height: '434px' }}
														>
															<div
																className="simplebar-wrapper"
																style={{ margin: '-24px' }}
															>
																<div className="simplebar-height-auto-observer-wrapper">
																	<div className="simplebar-height-auto-observer"></div>
																</div>
																<div className="simplebar-mask">
																	<div
																		className="simplebar-offset"
																		style={{ right: '0px', bottom: '0px' }}
																	>
																		<div
																			className="simplebar-ec-content-wrapper"
																			style={{
																				height: '100%',
																				overflow: 'hidden scroll',
																			}}
																		>
																			<div
																				className="simplebar-content"
																				style={{ padding: '24px' }}
																			>
																				<div className="media pb-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
																						<i className="mdi mdi-cart-outline font-size-20"></i>
																					</div>
																					<div className="media-body pr-3 ">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							New Order
																						</a>
																						<p>
																							Selena has placed an new order
																						</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						10 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
																						<i className="mdi mdi-email-outline font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							New Enquiry
																						</a>
																						<p>
																							Phileine has placed an new order
																						</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						9 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
																						<i className="mdi mdi-stack-exchange font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							Support Ticket
																						</a>
																						<p>Emma has placed an new order</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						10 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
																						<i className="mdi mdi-cart-outline font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							New order
																						</a>
																						<p>Ryan has placed an new order</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						10 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-info text-white">
																						<i className="mdi mdi-calendar-blank font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href=""
																						>
																							Comapny Meetup
																						</a>
																						<p>
																							Phileine has placed an new order
																						</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						10 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
																						<i className="mdi mdi-stack-exchange font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							Support Ticket
																						</a>
																						<p>Emma has placed an new order</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						10 AM
																					</span>
																				</div>

																				<div className="media py-3 align-items-center justify-content-between">
																					<div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
																						<i className="mdi mdi-email-outline font-size-20"></i>
																					</div>
																					<div className="media-body pr-3">
																						<a
																							className="mt-0 mb-1 font-size-15 text-dark"
																							href="#"
																						>
																							New Enquiry
																						</a>
																						<p>
																							Phileine has placed an new order
																						</p>
																					</div>
																					<span className=" font-size-12 d-inline-block">
																						<i className="mdi mdi-clock-outline"></i>{' '}
																						9 AM
																					</span>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div
																	className="simplebar-placeholder"
																	style={{ width: 'auto', height: '590px' }}
																></div>
															</div>
															<div
																className="simplebar-track simplebar-horizontal"
																style={{ visibility: 'hidden' }}
															>
																<div
																	className="simplebar-scrollbar"
																	style={{ width: '0px', display: 'none' }}
																></div>
															</div>
															<div
																className="simplebar-track simplebar-vertical"
																style={{ visibility: 'hidden' }}
															>
																<div
																	className="simplebar-scrollbar"
																	style={{
																		height: '319px',
																		transform: 'translate3d(0px, 0px, 0px)',
																		display: 'block',
																	}}
																></div>
															</div>
														</div>
														<div className="mt-3"></div>
													</div>
												</div>

												<div className="col-12">
													<div
														className="card card-default card-table-border-none ec-tbl"
														id="recent-orders"
													>
														<div className="card-header justify-content-between">
															<h2>Recent Orders</h2>

															<div className="date-range-report">
																<span>Feb 11, 2023 - Mar 12, 2023</span>
															</div>
														</div>

														<div className="card-body pt-0 pb-0 table-responsive">
															<table className="table">
																<thead>
																	<tr>
																		<th>Order_ID</th>
																		<th>Product_Name</th>
																		<th>Units</th>
																		<th>Order_Date</th>
																		<th>Order_Cost</th>
																		<th>Status</th>
																		<th></th>
																	</tr>
																</thead>

																<tbody>
																	<tr>
																		<td>24541</td>
																		<td>
																			<a className="text-dark" href="">
																				{' '}
																				Coach Swagger
																			</a>
																		</td>
																		<td>1 Unit</td>
																		<td>Oct 20, 2018</td>
																		<td>$230</td>
																		<td>
																			<span className="badge badge-success">
																				Completed
																			</span>
																		</td>
																		<td className="text-right">
																			<div className="dropdown show d-inline-block widget-dropdown">
																				<a
																					className="dropdown-toggle icon-burger-mini"
																					href=""
																					role="button"
																					id="dropdown-recent-order1"
																					data-bs-toggle="dropdown"
																					aria-haspopup="true"
																					aria-expanded="false"
																					data-display="static"
																				></a>

																				<ul
																					className="dropdown-menu dropdown-menu-right"
																					aria-labelledby="dropdown-recent-order1"
																				>
																					<li className="dropdown-item">
																						<a href="#">View</a>
																					</li>

																					<li className="dropdown-item">
																						<a href="#">Remove</a>
																					</li>
																				</ul>
																			</div>
																		</td>
																	</tr>

																	<tr>
																		<td>24541</td>
																		<td>
																			<a className="text-dark" href="">
																				{' '}
																				Toddler Shoes, Gucci Watch
																			</a>
																		</td>
																		<td>2 Units</td>
																		<td>Nov 15, 2018</td>
																		<td>$550</td>
																		<td>
																			<span className="badge badge-warning">
																				Delayed
																			</span>
																		</td>
																		<td className="text-right">
																			<div className="dropdown show d-inline-block widget-dropdown">
																				<a
																					className="dropdown-toggle icon-burger-mini"
																					href="#"
																					role="button"
																					id="dropdown-recent-order2"
																					data-bs-toggle="dropdown"
																					aria-haspopup="true"
																					aria-expanded="false"
																					data-display="static"
																				></a>

																				<ul
																					className="dropdown-menu dropdown-menu-right"
																					aria-labelledby="dropdown-recent-order2"
																				>
																					<li className="dropdown-item">
																						<a href="#">View</a>
																					</li>

																					<li className="dropdown-item">
																						<a href="#">Remove</a>
																					</li>
																				</ul>
																			</div>
																		</td>
																	</tr>

																	<tr>
																		<td>24541</td>
																		<td>
																			<a className="text-dark" href="">
																				{' '}
																				Hat Black Suits
																			</a>
																		</td>
																		<td>1 Unit</td>
																		<td>Nov 18, 2018</td>
																		<td>$325</td>
																		<td>
																			<span className="badge badge-warning">
																				On Hold
																			</span>
																		</td>
																		<td className="text-right">
																			<div className="dropdown show d-inline-block widget-dropdown">
																				<a
																					className="dropdown-toggle icon-burger-mini"
																					href="#"
																					role="button"
																					id="dropdown-recent-order3"
																					data-bs-toggle="dropdown"
																					aria-haspopup="true"
																					aria-expanded="false"
																					data-display="static"
																				></a>

																				<ul
																					className="dropdown-menu dropdown-menu-right"
																					aria-labelledby="dropdown-recent-order3"
																				>
																					<li className="dropdown-item">
																						<a href="#">View</a>
																					</li>

																					<li className="dropdown-item">
																						<a href="#">Remove</a>
																					</li>
																				</ul>
																			</div>
																		</td>
																	</tr>

																	<tr>
																		<td>24541</td>
																		<td>
																			<a className="text-dark" href="">
																				{' '}
																				Backpack Gents, Swimming Cap Slin
																			</a>
																		</td>
																		<td>5 Units</td>
																		<td>Dec 13, 2018</td>
																		<td>$200</td>
																		<td>
																			<span className="badge badge-success">
																				Completed
																			</span>
																		</td>
																		<td className="text-right">
																			<div className="dropdown show d-inline-block widget-dropdown">
																				<a
																					className="dropdown-toggle icon-burger-mini"
																					href="#"
																					role="button"
																					id="dropdown-recent-order4"
																					data-bs-toggle="dropdown"
																					aria-haspopup="true"
																					aria-expanded="false"
																					data-display="static"
																				></a>

																				<ul
																					className="dropdown-menu dropdown-menu-right"
																					aria-labelledby="dropdown-recent-order4"
																				>
																					<li className="dropdown-item">
																						<a href="#">View</a>
																					</li>

																					<li className="dropdown-item">
																						<a href="#">Remove</a>
																					</li>
																				</ul>
																			</div>
																		</td>
																	</tr>

																	<tr>
																		<td>24541</td>
																		<td>
																			<a className="text-dark" href="">
																				{' '}
																				Speed 500 Ignite
																			</a>
																		</td>
																		<td>1 Unit</td>
																		<td>Dec 23, 2018</td>
																		<td>$150</td>
																		<td>
																			<span className="badge badge-danger">
																				Cancelled
																			</span>
																		</td>
																		<td className="text-right">
																			<div className="dropdown show d-inline-block widget-dropdown">
																				<a
																					className="dropdown-toggle icon-burger-mini"
																					href="#"
																					role="button"
																					id="dropdown-recent-order5"
																					data-bs-toggle="dropdown"
																					aria-haspopup="true"
																					aria-expanded="false"
																					data-display="static"
																				></a>
																				<ul
																					className="dropdown-menu dropdown-menu-right"
																					aria-labelledby="dropdown-recent-order5"
																				>
																					<li className="dropdown-item">
																						<a href="#">View</a>
																					</li>

																					<li className="dropdown-item">
																						<a href="#">Remove</a>
																					</li>
																				</ul>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div
										className="tab-pane fade"
										id="settings"
										role="tabpanel"
										aria-labelledby="settings-tab"
									>
										<div className="tab-pane-content mt-5">
											<form>
												<div className="form-group row mb-6">
													<label
														for="coverImage"
														className="col-sm-4 col-lg-2 col-form-label"
													>
														User Image
													</label>
													<div className="col-sm-8 col-lg-10">
														<div className="custom-file mb-1">
															<input
																type="file"
																className="custom-file-input"
																id="coverImage"
																required=""
															/>
															<label
																className="custom-file-label"
																for="coverImage"
															>
																Choose file...
															</label>
															<div className="invalid-feedback">
																Example invalid custom file feedback
															</div>
														</div>
													</div>
												</div>

												<div className="row mb-2">
													<div className="col-lg-6">
														<div className="form-group">
															<label for="firstName">First name</label>
															<input
																type="text"
																className="form-control"
																id="firstName"
																value="First name"
															/>
														</div>
													</div>

													<div className="col-lg-6">
														<div className="form-group">
															<label for="lastName">Last name</label>
															<input
																type="text"
																className="form-control"
																id="lastName"
																value="Last name"
															/>
														</div>
													</div>
												</div>

												<div className="form-group mb-4">
													<label for="userName">User name</label>
													<input
														type="text"
														className="form-control"
														id="userName"
														value="User name"
													/>
													<span className="d-block mt-1">
														Accusamus nobis at omnis consequuntur culpa tempore
														saepe animi.
													</span>
												</div>

												<div className="form-group mb-4">
													<label for="email">Email</label>
													<input
														type="email"
														className="form-control"
														id="email"
														value="ekka.example@gmail.com"
													/>
												</div>

												<div className="form-group mb-4">
													<label for="oldPassword">Old password</label>
													<input
														type="password"
														className="form-control"
														id="oldPassword"
													/>
												</div>

												<div className="form-group mb-4">
													<label for="newPassword">New password</label>
													<input
														type="password"
														className="form-control"
														id="newPassword"
													/>
												</div>

												<div className="form-group mb-4">
													<label for="conPassword">Confirm password</label>
													<input
														type="password"
														className="form-control"
														id="conPassword"
													/>
												</div>

												<div className="d-flex justify-content-end mt-5">
													<button
														type="submit"
														className="btn btn-primary mb-2 btn-pill"
													>
														Update Profile
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default View;
