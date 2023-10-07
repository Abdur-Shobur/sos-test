import React from 'react';
import { Link } from 'react-router-dom';

function VendorDropDownMenu({
	load,
	data,
	setLoad,
	refetch,
	viewLink,
	status_handler,
}) {
	return (
		<div className="btn-group mb-1">
			{data?.status !== 'hold' && (
				<Link
					style={{ padding: '3px 10px' }}
					to={viewLink + `${data?.id}`}
					className="btn btn-outline-success"
				>
					view
				</Link>
			)}
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
				{data?.status !== 'hold' && data?.status === null && (
					<button
						disabled={load}
						onClick={() => status_handler(data.id, 'pending', setLoad, refetch)}
						className="dropdown-item"
						href="#"
					>
						Pending
					</button>
				)}
				{data?.status !== 'progress' && data?.status === 'pending' && (
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
				{data?.status !== 'delivered' && data?.status === 'progress' && (
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
				{!(
					data?.status === 'hold' ||
					data?.status === 'cancel' ||
					data.status === 'delivered'
				) && (
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

export default VendorDropDownMenu;
