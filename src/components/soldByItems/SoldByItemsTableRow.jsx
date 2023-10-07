import React from 'react';

function SoldByItemsTableRow({ title, count, percent }) {
	return (
		<tr>
			<td className="text-dark">{title}</td>
			<td className="text-center">{count}</td>
			<td className="text-right">
				{percent}%
				<i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"></i>
				{/* <i className="mdi mdi-arrow-down-bold text-danger pl-1 font-size-12"></i> */}
			</td>
		</tr>
	);
}

export default SoldByItemsTableRow;
