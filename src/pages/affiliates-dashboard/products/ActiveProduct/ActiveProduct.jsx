import React from 'react';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import { http } from '../../../../components/action/axiosInstance';
import ActiveCard from './ActiveCard';

function ActiveProduct() {
	// get brand
	const { data, isLoading } = useQuery(
		'fetch_affiliator_request_active_product_data',
		() => {
			return http.get(`/affiliator/request/active/product`);
		}
	);
	const active = data?.data?.active?.data;

	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1>Active Product</h1>
					<p className="breadcrumbs">
						<span>
							<a href="index.html">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						History
					</p>
				</div>

				{isLoading ? (
					<div className="d-flex justify-content-center align-items-center">
						<SyncLoader color="#36d7b7" />
					</div>
				) : (
					<div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
						{active?.map((e) => {
							return <ActiveCard key={e.id} product={e} />;
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default ActiveProduct;
