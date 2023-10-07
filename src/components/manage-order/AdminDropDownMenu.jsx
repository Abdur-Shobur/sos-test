import React from 'react';
import { Link } from 'react-router-dom';

function AdminDropDownMenu({
	load,
	data,
	viewLink,
	status_handler,
	setLoad,
	refetch,
}) {
	return (
		<div className="btn-group mb-1">
			<Link
				style={{ padding: '3px 10px' }}
				to={viewLink + `${data?.id}`}
				className="btn btn-outline-success"
			>
				view
			</Link>
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
				{(data?.status === 'hold' ||
					data?.status === null ||
					data?.status !== 'pending') &&
					data?.status !== 'delivered' && (
						<button
							disabled={load}
							onClick={() =>
								status_handler(data.id, 'pending', setLoad, refetch)
							}
							className="dropdown-item"
							href="#"
						>
							Pending
						</button>
					)}

				{/* (data?.status === 'hold' || data?.status === 'pending') && ( ) */}
				{data?.status !== 'progress' && data?.status !== 'delivered' && (
					<button
						disabled={load}
						onClick={() =>
							status_handler(data.id, 'progress', setLoad, refetch)
						}
						className="dropdown-item"
						href="#"
					>
						Progress
					</button>
				)}

				{/* {data?.status !== 'delivered' && data?.status === 'progress' && (
					<button
						disabled={load}
						onClick={() =>
							status_handler(data.id, 'delivered', setLoad, refetch)
						}
						className="dropdown-item"
						href="#"
					>
						Delivered
					</button>
				)} */}
				{data?.status !== 'delivered' && (
					<button
						disabled={load}
						onClick={() =>
							status_handler(data.id, 'delivered', setLoad, refetch)
						}
						className="dropdown-item"
						href="#"
					>
						Delivered
					</button>
				)}
				{data?.status !== 'cancel' && (
					<button
						disabled={load}
						onClick={() => status_handler(data.id, 'cancel', setLoad, refetch)}
						className="dropdown-item"
						href="#"
					>
						Cancel
					</button>
				)}
			</div>
		</div>
	);
}

export default AdminDropDownMenu;
