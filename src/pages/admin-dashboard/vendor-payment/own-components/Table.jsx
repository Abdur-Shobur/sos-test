import React from 'react';
import TableHead from './TableHead';
import TableBodyLoading from '../../../../components/loader/TableBodyLoading';
import TableRow from './TableRow';
import { NoDataFound } from '../../../../components/table/TableComponents';

function Table({ isLoading, deposit, page, refetch }) {
	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: '100%' }}
		>
			<TableHead />
			{isLoading ? (
				<TableBodyLoading />
			) : (
				<tbody style={{ verticalAlign: 'middle' }}>
					{deposit?.data?.length > 0 ? (
						deposit?.data?.map((d, i) => (
							<TableRow
								i={i}
								data={d}
								key={d.id}
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
	);
}

export default Table;
