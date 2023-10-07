import React from 'react';
import { SyncLoader } from 'react-spinners';

function TableBodyLoading() {
	return (
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
	);
}

export default TableBodyLoading;
