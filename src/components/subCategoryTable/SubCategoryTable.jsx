import React from 'react';
import SubCategoryTableRow from './SubCategoryTableRow';
import { SyncLoader } from 'react-spinners';
import Pagination from '../breadcrumbs/Pagination';
import { NoDataFound } from '../table/TableComponents';

function SubCategoryTable({ subcategory, refetch, isLoading, page, setPage }) {
	return (
		<div className="col-xl-8 col-lg-12">
			<div className="ec-cat-list card card-default">
				<div className="card-body">
					<div className="table-responsive">
						<table id="responsive-data-table" className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Main Categories</th>

									<th>Status</th>

									<th>Action</th>
								</tr>
							</thead>
							{isLoading ? (
								<tbody>
									<tr className="position-relative">
										<td style={{ borderBottom: '0' }}>
											<div
												style={{
													position: 'absolute',
													transform: 'translate(-50%,-50%)',
													left: '50%',
													top: '10px',
												}}
											>
												<SyncLoader color="#36d7b7" />
											</div>
										</td>
									</tr>
								</tbody>
							) : (
								<tbody style={{ verticalAlign: 'middle' }}>
									{subcategory?.data?.length > 0 ? (
										subcategory?.data?.map((e, i) => (
											<SubCategoryTableRow refetch={refetch} key={i} data={e} />
										))
									) : (
										<NoDataFound />
									)}
								</tbody>
							)}
						</table>
						<Pagination
							getPaginationData={subcategory}
							isLoading={isLoading}
							page={page}
							setPage={setPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubCategoryTable;
