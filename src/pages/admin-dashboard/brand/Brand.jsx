import React from 'react';
import { http } from '../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../components/action/DeletePopUP';
import BrandCard from './BrandCard';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { useEffect } from 'react';
import EditLoader from '../../../components/loader/EditLoader';
import Pagination from '../../../components/breadcrumbs/Pagination';
import { useState } from 'react';
import Search from '../../../components/formComponent/Search';
import { useDebounce } from '../../../components/action/useDebounce';
import { Helmet } from 'react-helmet';
import tost from '../../../components/action/tost';
import { GetBrands } from '../../../api/admin/brandAPI';
import { NoDataFound } from '../../../components/table/TableComponents';

function Brand() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');
	const { searchHandler } = useDebounce(setSearch, setPage);

	// get brands
	const { brands, isLoading, refetch } = GetBrands(page, search);
	// delete brand
	const delete_data_dandler = (e) => {
		const del = () =>
			http.delete(`/delete-brand/${e}`).then((res) => {
				tost(res.data.message);
				refetch();
			});

		return DeletePopUP(del); // DeletePopUP is swal pop up and return del
	};

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Brands-SOS</title>
			</Helmet>
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
						<Search searchHandler={searchHandler} />
					</div>
					<div>
						<Link to="/admin/brand-list/add" className="btn btn-primary">
							Add Brand
						</Link>
					</div>
				</div>

				<div data-aos="fade" className="product-brand card card-default p-24px">
					<div className="row mb-m-24px">
						{isLoading ? (
							<div className="d-flex justify-content-center align-items-center h-100">
								<EditLoader />
							</div>
						) : brands?.data?.length > 0 ? (
							brands?.data?.map((e) => (
								<BrandCard
									data={e}
									key={e.id}
									refetch={refetch}
									delete_data_dandler={delete_data_dandler}
								/>
							))
						) : (
							<NoDataFound />
						)}
						<div className="pb-3">
							<Pagination
								page={page}
								setPage={setPage}
								isLoading={isLoading}
								getPaginationData={brands}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Brand;
