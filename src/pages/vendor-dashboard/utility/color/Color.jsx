import React from 'react';
import { Link } from 'react-router-dom';
import ColorTableRow from '../../../../components/color/ColorTableRow';
import AddColor from './AddColor';
import { GetAllColor } from '../../../../api/vendor/utility';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';
import { NoDataFound } from '../../../../components/table/TableComponents';

function Color() {
	const { color, refetch } = GetAllColor();
	useEffect(() => {
		Aos?.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Colors-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
					<h1>Colors</h1>
					<p className="breadcrumbs">
						<span>
							<Link to={'/vendors-dashboard'}>Home</Link>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Colors
					</p>
				</div>
				<div data-aos="fade" className="row">
					<AddColor refetch={refetch} />
					<div className="col-xl-8 col-lg-12">
						<div className="ec-cat-list card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table id="responsive-data-table" className="table">
										<thead>
											<tr>
												<th>Color Name</th>
												<th>Color Code</th>

												<th>Status</th>

												<th>Action</th>
											</tr>
										</thead>

										<tbody style={{ verticalAlign: 'middle' }}>
											{color?.length > 0 ? (
												color?.map((e, i) => (
													<ColorTableRow key={i} data={e} refetch={refetch} />
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

export default Color;
