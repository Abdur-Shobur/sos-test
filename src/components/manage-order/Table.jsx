import React from 'react';
import TableHead from './TableHead';
import TableBodyLoading from '../loader/TableBodyLoading';
import TableRow from './TableRow';
import { NoDataFound } from '../table/TableComponents';

function Table({
	getData,
	isLoading,
	page,
	from,
	load,
	refetch,
	setLoad,
	status_handler,
	hold,
}) {
	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: '100%' }}
		>
			<TableHead from={from} />
			{isLoading ? (
				<TableBodyLoading />
			) : (
				<tbody style={{ verticalAlign: 'middle' }}>
					{getData?.length > 0 ? (
						getData?.map((e, i) => (
							<TableRow
								i={i}
								key={i}
								data={e}
								page={page}
								from={from}
								load={load}
								refetch={refetch}
								setLoad={setLoad}
								status_handler={status_handler}
								hold={hold}
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
