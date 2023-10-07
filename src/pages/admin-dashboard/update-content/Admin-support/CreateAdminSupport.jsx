import React from 'react';

import Aos from 'aos';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CommonBreadCrumbs from '../../../../components/breadcrumbs/CommonBreadCrumbs';
import { Link } from 'react-router-dom';

function CreateAdminSupport() {
	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Crate Support -SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Create Support"
					home=""
					link={{ name: 'All Support', path: '/admin/all-support' }}
				/>
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="ec-vendor-list card card-default">
							<div className="card-body">
								<div className="d-flex" style={{ gap: '10px' }}>
									<Link
										to={'/admin/create-cateogory'}
										className="btn btn-primary"
									>
										Create Category
									</Link>
									<Link
										to={'/admin/create-problem-topic'}
										className="btn btn-primary"
									>
										Create Problem Topic
									</Link>
								</div>
								{/* <div className="table-responsive">
									<table id="responsive-data-table" className="table">
										<THead />
										{isLoading ? (
											<Loading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{vendors?.data?.length > 0 ? (
													vendors?.data?.map((e, i) => (
														<TRow
															i={i}
															key={i}
															data={e}
															page={page}
															refetch={refetch}
														/>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
									<Pagination
										page={page}
										setPage={setPage}
										isLoading={isLoading}
										getPaginationData={vendors}
									/>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateAdminSupport;
