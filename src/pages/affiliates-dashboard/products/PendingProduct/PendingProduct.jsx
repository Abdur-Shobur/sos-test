import React from 'react';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import { http } from '../../../../components/action/axiosInstance';
import PendingCard from './PendingCard';

function PendingProduct() {
	// get brand
	const { data, isLoading } = useQuery(
		'fetch_affiliator_request_pending_product_data',
		() => {
			return http.get(`/affiliator/request/pending/product`);
		}
	);
	const pending = data?.data?.pending?.data;

	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1>Pending Product</h1>
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
						{pending?.map((e) => {
							return (
								<PendingCard key={e.id} product={e} isRequested={e?.request} />
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default PendingProduct;
