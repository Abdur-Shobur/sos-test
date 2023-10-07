import Pagination from '../breadcrumbs/Pagination';
import { NoDataFound } from '../table/TableComponents';
import MainCategoryTableRow from './MainCategoryTableRow';
import { SyncLoader } from 'react-spinners';

// ${process.env.REACT_APP_BASE_URL}
function MainCategoryTable({
	category_data,
	refetch,
	isLoading,
	page,
	setPage,
}) {
	return (
		<div className="col-xl-8 col-lg-12 ">
			<div className="ec-cat-list card card-default">
				<div className="card-body">
					<div style={{ overflowX: 'inherit' }} className="table-responsive">
						<table id="responsive-data-table" className="table ">
							<thead>
								<tr>
									<th>Thumb</th>
									<th>Name</th>
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
									{category_data?.data?.length > 0 ? (
										category_data?.data?.map((e) => (
											<MainCategoryTableRow
												refetch={refetch}
												key={e.id}
												data={e}
											/>
										))
									) : (
										<NoDataFound />
									)}
								</tbody>
							)}
						</table>
						<Pagination
							getPaginationData={category_data}
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

export default MainCategoryTable;
