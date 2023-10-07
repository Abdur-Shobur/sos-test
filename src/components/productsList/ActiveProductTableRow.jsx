import React from 'react';

function ActiveProductTableRow({ data }) {
	return (
		<tr>
			<td>
				<img
					className="tbl-thumb"
					src={`${process.env.REACT_APP_IMG_URL}/${data?.product?.image}`}
					alt="Product Images"
				/>
			</td>
			<td>{data?.product?.name}</td>
			<td>{data?.product?.category?.name}</td>
			<td>{data?.product?.status}</td>

			<td>
				<div className="btn-group mb-1">
					<button
						style={{ padding: '3px 10px' }}
						type="button"
						className="btn btn-outline-success"
					>
						Info
					</button>
					<button
						type="button"
						className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
						data-bs-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
						data-display="static"
					>
						<span className="sr-only">Info</span>
					</button>

					<div className="dropdown-menu">
						<button
							// onClick={() => active_status_handler(data?.id)}
							className="dropdown-item"
						>
							Active
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default ActiveProductTableRow;
