import React from 'react';
import { Helmet } from 'react-helmet';
import ProductLoading from '../../../../components/loader/ProductLoading';
import Slider from '../../../../components/slider/Slider';
import UserProfile from '../../../../components/product-view/own-components/UserProfile';
import Specification from '../../../../components/product-view/own-components/Specification';
import ShippingAddress from '../../../../components/product-view/own-components/ShippingAddress';
import Details from '../../../../components/product-view/own-components/Details';
import { status_handler } from '../own-components/statusHandler';
import { useState } from 'react';
import { RejectedReasons } from '../own-components/RejectedReasons';
import BackNavigation from '../../../../components/action/BackNavigation';

function OrderView({ isLoading, product, mainData, refetch }) {
	const [loading, setLoad] = useState(false);
	const statusHandler = (id, status) => {
		if (status === 'cancel') {
			return RejectedReasons(id, refetch);
		} else {
			status_handler(id, status, setLoad, refetch);
		}
	};

	const styleColor = () => {
		switch (mainData?.status) {
			case 'hold':
				return '#8a909d';
			case 'pending':
				return '#ffd600';
			case 'progress':
				return '#13cae1';
			case 'delivered':
				return '#29cc97';
			case 'cancel':
				return 'red';
			default:
				return '#8a909d';
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
						<div>
							<BackNavigation />
							<h2>Product Detail</h2>
						</div>

						<div className="form-floating">
							<select
								style={{
									borderColor: styleColor(),
								}}
								onChange={(e) => statusHandler(mainData?.id, e.target.value)}
								className="form-select"
								id="floatingSelect"
								aria-label="Floating label select example"
							>
								<option
									disabled={loading}
									selected={mainData?.status === 'hold'}
									value="hold"
								>
									Hold
								</option>
								<option
									disabled={loading}
									selected={mainData?.status === 'pending'}
									value="pending"
								>
									Pending
								</option>
								<option
									disabled={loading}
									selected={mainData?.status === 'progress'}
									value="progress"
								>
									Progress
								</option>
								<option
									disabled={loading}
									selected={mainData?.status === 'delivered'}
									value="delivered"
								>
									Delivered
								</option>
								<option
									disabled={loading}
									selected={mainData?.status === 'cancel'}
									value="cancel"
								>
									Cancel
								</option>
							</select>
							<label
								style={{
									color: styleColor(),
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
										{<UserProfile user={mainData?.vendor} from="Vendor" />}
										{
											<UserProfile
												user={mainData?.affiliator}
												from="Affiliate"
											/>
										}
									</div>
								</div>

								<ShippingAddress product={mainData} />

								<Specification product={product} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderView;
