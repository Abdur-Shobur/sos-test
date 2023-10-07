import React from 'react';
import { Link } from 'react-router-dom';
import AdSize from './AdSize';
import SizeTableRow from './SizeTableRow';
import { GetAllSize } from '../../../../api/vendor/utility';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { NoDataFound } from '../../../../components/table/TableComponents';

function Size() {
	const { refetch, size } = GetAllSize();
	useEffect(() => {
		Aos?.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Sizes-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
					<h1>Sizes</h1>
					<p className="breadcrumbs">
						<span>
							<Link to={'/vendors-dashboard'}>Home</Link>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Sizes
					</p>
				</div>
				<div data-aos="fade" className="row">
					<AdSize refetch={refetch} />
					<div className="col-xl-8 col-lg-12">
						<div className="ec-cat-list card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table id="responsive-data-table" className="table">
										<thead>
											<tr>
												<th>Size Name</th>
												<th>Status</th>
												<th>Action</th>
											</tr>
										</thead>

										<tbody style={{ verticalAlign: 'middle' }}>
											{size?.length > 0 ? (
												size?.map((e, i) => (
													<SizeTableRow key={i} data={e} refetch={refetch} />
												))
											) : (
												<NoDataFound />
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Size;
