import React, { useState } from 'react';
import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CommonBreadCrumbs from '../../../../components/breadcrumbs/CommonBreadCrumbs';
import { GetAdminSupportData } from '../../../../api/admin/apiAdmin';
import SupportViewTable from '../../../../components/support-create/SupportViewTable';

function AdminAllSupport() {
	const [page, setPage] = useState(null);
	const { problemTopicData, isLoading, refetch } = GetAdminSupportData(page);

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
					home="/"
				/>
				<div data-aos="fade" className="row">
					<SupportViewTable
						page={page}
						refetch={refetch}
						delApi="/admin/supportbox/"
						setPage={setPage}
						isLoading={isLoading}
						view="/admin/single-support/"
						supportData={problemTopicData}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdminAllSupport;
