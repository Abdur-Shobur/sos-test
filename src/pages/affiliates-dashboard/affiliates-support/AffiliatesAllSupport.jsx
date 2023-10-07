import React, { useState } from 'react';

import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import { useDebounce } from '../../../components/action/useDebounce';
import CommonBreadCrumbs from '../../../components/breadcrumbs/CommonBreadCrumbs';
import { GetAllSupport } from '../../../api/admin/vendorApi';
import SupportViewTable from '../../../components/support-create/SupportViewTable';

function AffiliatesAllSupport() {
	const [page, setPage] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [search, setSearch] = useState(' ');
	const { supportData, refetch, isLoading } = GetAllSupport(page, search);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>All Support -SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					// searchHandler={searchHandler}
					heading="All Support"
					home="/affiliates-dashboard"
					link={{
						name: 'Create Support',
						path: '/affiliates-dashboard/create-support',
					}}
				/>
				<div data-aos="fade" className="row">
					<SupportViewTable
						view="/affiliates-dashboard/single-support/"
						page={page}
						delApi="/supportbox/"
						refetch={refetch}
						setPage={setPage}
						isLoading={isLoading}
						supportData={supportData}
					/>
				</div>
			</div>
		</div>
	);
}

export default AffiliatesAllSupport;
