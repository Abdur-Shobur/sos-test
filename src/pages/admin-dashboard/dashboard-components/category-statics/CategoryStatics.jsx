import React from 'react';
import Row from './Row';
import TableBodyLoading from '../../../../components/loader/TableBodyLoading';
import { NoDataFound } from '../../../../components/table/TableComponents';
import { BsArrowDownUp } from 'react-icons/bs';
import { StatusAllUpDown } from '../../../../components/action/actions';
function CategoryStatics({ categoryStatus, refetch, isLoading }) {
	const { upDown, arrowHandler } = StatusAllUpDown();

	return (
		<div
			className="card card-table-border-none card-default recent-orders"
			id="recent-orders"
		>
			<div className="card-header justify-content-between">
				<h2>Category Statics</h2>
			</div>
			<div className="card-body pt-0 pb-5">
				<div className="table-responsive">
					<table className="table" style={{ width: '100%' }}>
						<thead>
							<tr>
								<th>Sr.</th>
								<th>Category</th>
								<th>Name</th>
								<th>Product qty</th>
								<th>Qty Last Month</th>
								<th>Qty Current Month</th>
								<th>Sold Qty</th>
								<th>Status</th>
								<th
									style={{ cursor: 'pointer' }}
									onClick={() => arrowHandler(upDown)}
								>
									Sell Ratio{' '}
									{upDown === null ? ' All' : upDown === true ? 'Up' : 'Down'}{' '}
									<BsArrowDownUp />
								</th>
							</tr>
						</thead>
						{isLoading ? (
							<TableBodyLoading />
						) : (
							<tbody style={{ verticalAlign: 'middle' }}>
								{categoryStatus?.length > 0 ? (
									categoryStatus
										.filter((e) => (upDown === null ? e : e.is_up === upDown))
										?.map((o, i) => (
											<Row i={i} key={o.id} data={o} refetch={refetch} />
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
	);
}

export default CategoryStatics;
