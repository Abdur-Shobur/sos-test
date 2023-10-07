import React from 'react';
import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useParams } from 'react-router-dom';
import CommonBreadCrumbs from '../../../components/breadcrumbs/CommonBreadCrumbs';
import ViewCard from '../../admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/ViewCard';
import { GetVendorAdvertiseDataSingle } from '../../../api/admin/vendorApi';
import EditLoader from '../../../components/loader/EditLoader';

function UserSingleAdvertiser() {
	const { id } = useParams();

	const { advertiserData, isLoading } = GetVendorAdvertiseDataSingle(id);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	let removeKey = [
		'advertise_placement',
		'advertise_location_files',
		'advertise_audience_file',
		'placements',
		'ad_creative',
		'id',
		'deleted_at',
		'created_at',
		'updated_at',
	];
	var getValues = {};
	for (var key in advertiserData) {
		if (!removeKey.includes(key)) {
			getValues[key] = advertiserData[key];
		}
	}

	// Log the filtered object
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Advertisers Details-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Advertiser Details"
					link={{
						name: 'All Advertiser',
						path: '/user/advertiser',
					}}
				/>
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="ec-vendor-list card card-default">
							{isLoading ? (
								<EditLoader />
							) : (
								<div className="card-body">
									<div className="wrap_single_card_view">
										{Object.entries(getValues)?.map((e, i) => (
											<ViewCard key={i} data={e} />
										))}
									</div>
									<div className="mt-4">
										<ViewCard
											data={['advertise_audience_file']}
											isImg={advertiserData?.advertise_audience_file}
										/>
									</div>
									<div className="mt-4">
										<ViewCard
											data={['advertise_location_files']}
											isImg={advertiserData?.advertise_location_files}
										/>
									</div>
									<div className="mt-4">
										<ViewCard
											data={['placements']}
											placements={advertiserData?.placements}
										/>
									</div>
									<div className="mt-4">
										<ViewCard
											data={['ad_creative']}
											ad_creative={advertiserData?.ad_creative}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserSingleAdvertiser;
