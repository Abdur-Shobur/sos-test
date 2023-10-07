import React from 'react';
import { useQuery } from 'react-query';
import { SyncLoader } from 'react-spinners';
import { http } from '../../../../components/action/axiosInstance';
import CardForAllProducts from './CardForAllProducts';
import Pagination from '../../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import { useDebounce } from '../../../../components/action/useDebounce';
import Search from '../../../../components/formComponent/Search';

function AllProducts() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);
	// get brand
	// const { data, isLoading } = useQuery('fetch_all_products_data', () => {
	// 	return http.get(`/affiliator/products`);
	// });

	const { data, refetch, isLoading } = useQuery(
		['fetch_all_products_data', page, search],
		() => {
			return http.get(`/affiliator/products?page=${page}&search=${search}`);
		}
	);
	const products = data?.data?.product?.data;
	const getPaginationData = data?.data?.product;
	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2">
					<h1>All Products</h1>
					<div className="d-flex" style={{ gap: '5px' }}>
						<Search searchHandler={searchHandler} />
					</div>
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
					<>
						<div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
							{products?.map((e) => {
								return <CardForAllProducts key={e.id} product={e} />;
							})}
						</div>
						<Pagination
							getPaginationData={getPaginationData}
							isLoading={isLoading}
							page={page}
							setPage={setPage}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default AllProducts;
