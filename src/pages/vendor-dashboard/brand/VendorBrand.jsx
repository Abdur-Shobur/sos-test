import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import { http } from '../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../components/action/DeletePopUP';
import BrandCard from './VendorBrandCard';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/breadcrumbs/Pagination';

function VendorBrand() {
	const [page, setPage] = useState(null);
	// get brand
	const { data, refetch, isLoading } = useQuery('get_vendor-brands', () => {
		return http.get(`/vendor-brands`);
	});
	const brands_group = data?.data?.brands?.data;
	const getPaginationData = data?.data?.brands;

	// delete brand
	const delete_data_dandler = (e) => {
		const del = () =>
			http.delete(`/vendor-brand-delete/${e}`).then(() => {
				refetch();
			});
		return DeletePopUP(del); // DeletePopUP is swal pop up and return del
	};

	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
					<div>
						<h1>Brand</h1>
						<p className="breadcrumbs">
							<span>
								<a href="index.html">Home</a>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>{' '}
							Brand
						</p>
					</div>

					<div>
						<Link to="/vendors-dashboard/add" className="btn btn-primary">
							Add Brand
						</Link>
					</div>
				</div>

				<div className="product-brand card card-default p-24px">
					<div className="row mb-m-24px">
						{isLoading ? (
							<div
								className="d-flex justify-content-center align-items-center"
								style={{ minHeight: '200px' }}
							>
								<SyncLoader color="#36d7b7" />
							</div>
						) : (
							brands_group?.map((e) => (
								<BrandCard
									data={e}
									key={e.id}
									refetch={refetch}
									delete_data_dandler={delete_data_dandler}
								/>
							))
						)}
						<Pagination
							page={page}
							setPage={setPage}
							isLoading={isLoading}
							getPaginationData={getPaginationData}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VendorBrand;
