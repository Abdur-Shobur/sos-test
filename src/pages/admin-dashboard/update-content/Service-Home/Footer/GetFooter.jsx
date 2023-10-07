import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GetAdminFooterData } from '../../../../../api/admin/apiAdmin';
import { http } from '../../../../../components/action/axiosInstance';
import { toast } from 'react-toastify';
import { DeletePopUP } from '../../../../../components/action/DeletePopUP';
// import { IconPickerItem } from "react-fa-icon-picker";
import FooterModal from './FooterModal';
import TableBodyLoading from '../../../../../components/loader/TableBodyLoading';
import { NoDataFound } from '../../../../../components/table/TableComponents';
import { useEffect } from 'react';
import Aos from 'aos';

const GetFooter = () => {
	const { footerData, refetch, isLoading } = GetAdminFooterData();
	const [clickId, setClickId] = useState(1);

	const FooterDataDelete = (id) => {
		const del = () =>
			http.delete(`admin/footer-media/${id}`).then((res) => {
				toast(res.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				refetch();
			});
		return DeletePopUP(del);
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Admin Social Media-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-contacts">
					<div>
						<h1>All Social Media</h1>
						<p className="breadcrumbs">
							<span>
								<Link to={'/'}>Home</Link>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>
							Home Content
						</p>
					</div>
					<div>
						<Link className="btn btn-primary" to="/admin/create-footer">
							Create Social Media
						</Link>
					</div>
				</div>
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<table
										id="responsive-data-table"
										className="table"
										style={{ width: '100%' }}
									>
										<thead>
											<tr>
												<th>SL</th>
												<th>Icon</th>
												<th>Link</th>
												<th>Action</th>
											</tr>
										</thead>
										{isLoading ? (
											<TableBodyLoading />
										) : (
											<tbody style={{ verticalAlign: 'middle' }}>
												{footerData?.length > 0 ? (
													footerData?.map((data, i) => (
														<tr key={data?.id}>
															<td>{i + 1}</td>
															<td>
																{/* <IconPickerItem
                                  icon={data?.icon_class}
                                  size={24}
                                  color="#000"
                                /> */}
															</td>

															<td>{data?.media_link}</td>
															<td>
																<div>
																	<button
																		onClick={() => setClickId(data?.id)}
																		className="btn btn-primary"
																		data-bs-toggle="modal"
																		data-bs-target="#exampleModal"
																	>
																		Update
																	</button>
																	<FooterModal
																		footerRefetch={refetch}
																		clickId={clickId}
																	/>
																	<button
																		onClick={() => FooterDataDelete(data?.id)}
																		className="btn btn-primary bg-danger border border-danger ml-2"
																	>
																		Delete
																	</button>
																</div>
															</td>
														</tr>
													))
												) : (
													<NoDataFound />
												)}
											</tbody>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetFooter;
