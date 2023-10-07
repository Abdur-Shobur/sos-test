import React from 'react';
import { Helmet } from 'react-helmet';
import ProductLoading from '../../../../components/loader/ProductLoading';
import Slider from '../../../../components/slider/Slider';
import Details from '../../../../components/product-view/own-components/Details';
import Specification from '../../../../components/product-view/own-components/Specification';
import UserProfile from '../../../../components/product-view/own-components/UserProfile';
import {
	rejected_status_handler,
	active_status_handler,
} from '../action/action';
import { useState } from 'react';

function RequestView({ isLoading, product, mainProduct, refetch }) {
	const [loading, setLoading] = useState(false);

	const statusHandler = (id, status) => {
		console.log(id, status);
		if (status === '3') {
			return rejected_status_handler(id, refetch);
		} else {
			active_status_handler(id, status, setLoading, refetch);
		}
	};
	return (
		<div className="row">
			<Helmet>
				<title>Product View-SOS</title>
			</Helmet>
			<div className="col-12">
				<div className="card card-default">
					<div className="card-header card-header-border-bottom d-flex justify-content-between">
						<h2>Product Detail</h2>

						<div className="form-floating">
							<select
								style={{
									borderColor:
										mainProduct?.status === '1'
											? '#3636c0'
											: mainProduct?.status === '2'
											? '#ac9404'
											: 'red',
								}}
								onChange={(e) => statusHandler(mainProduct?.id, e.target.value)}
								className="form-select"
								id="floatingSelect"
								aria-label="Floating label select example"
							>
								<option
									disabled={loading}
									selected={mainProduct?.status === '1'}
									value="1"
								>
									Active
								</option>
								<option
									disabled={loading}
									selected={mainProduct?.status === '2'}
									value="2"
								>
									Pending
								</option>
								<option
									disabled={loading}
									selected={mainProduct?.status === '3'}
									value="3"
								>
									Rejected
								</option>
							</select>
							<label
								style={{
									color:
										mainProduct?.status === '1'
											? '#3636c0'
											: mainProduct?.status === '2'
											? '#ac9404'
											: 'red',
								}}
								for="floatingSelect"
							>
								Request
							</label>
						</div>
					</div>

					<div className="card-body product-detail">
						{isLoading ? (
							<div className="d-flex justify-content-center align-items-center h-100 w-100">
								<ProductLoading />
							</div>
						) : (
							<>
								<div className="row">
									<Slider
										image={product?.image}
										product_image={product?.product_image}
									/>

									<div className="col-xl-5 col-lg-6">
										<div className="row product-overview">
											<div className="col-12">
												<Details product={product} />
											</div>
										</div>
									</div>

									<div className="col-xl-3 col-lg-12 u-card">
										<UserProfile user={mainProduct?.vendor} from="Vendor" />

										<UserProfile
											user={mainProduct?.affiliator}
											from="Affiliate"
										/>
									</div>
								</div>

								<Specification product={product} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RequestView;
