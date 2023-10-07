/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import { DeletePopUP } from '../action/DeletePopUP';

import { http } from '../action/axiosInstance';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ColorTableRow({ data: mainData, refetch }) {
	const [load, setLoad] = useState(false);

	// delete sub-category
	const delete_handler = (e) => {
		setLoad(true);
		const del = () =>
			http
				.delete(`/delete-color/${e}`)
				.then(() => {
					refetch();
					setLoad(false);
				})
				.catch((er) => {
					setLoad(false);
				});
		setLoad(false);

		return DeletePopUP(del);
	};

	return (
		<tr>
			<td>{mainData.name}</td>
			<td>
				<span className="ec-sub-cat-list">
					<span
						className="ec-sub-cat-tag"
						style={{
							background: mainData?.code,
						}}
					>
						<span
							style={{
								color: mainData?.code,
								WebkitFilter: 'invert(100%)',
								filter: 'invert(100%)',
							}}
						>
							{mainData?.code}
						</span>
					</span>
				</span>
			</td>

			<td className="text-uppercase">
				<span
					className={`mb-2 mr-2 badge ${
						(mainData?.status === 'active' && 'badge-success') ||
						(mainData?.status === 'pending' && 'badge-warning')
					}`}
				>
					{mainData?.status}
				</span>
			</td>

			<td>
				<div className="btn-group">
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
						<Link
							to={`/vendors-dashboard/edit-color/${mainData?.id}`}
							className="dropdown-item"
						>
							Edit
						</Link>

						<button
							disabled={load}
							onClick={() => delete_handler(mainData?.id)}
							className="dropdown-item"
							href="#"
						>
							Delete
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default ColorTableRow;
