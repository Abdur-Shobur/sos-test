import React from 'react';

function CommonTableHead({ th }) {
	return (
		<thead>
			<tr>
				{th.map((e, i) => (
					<th style={{ textTransform: 'capitalize' }} key={i}>
						{e}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default CommonTableHead;
