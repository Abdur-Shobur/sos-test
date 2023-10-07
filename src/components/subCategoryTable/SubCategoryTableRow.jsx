/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import { DeletePopUP } from '../action/DeletePopUP';

import { http } from '../action/axiosInstance';
import { Link } from 'react-router-dom';
import { countWord } from '../action/actions';
import tost from '../action/tost';

function SubCategoryTableRow({ data: mainData, refetch }) {
	// delete sub-category
	const delete_handler = (e) => {
		const del = () =>
			http
				.delete(`/delete-subcategory/${e}`)
				.then(() => {
					refetch();
				})
				.catch((er) => tost(er.message));
		return DeletePopUP(del);
	};
	const updateStatus = (id, status) => {
		http
			.post(`/subcategory-status/${id}`, { status: status })
			.then((res) => {
				if (res.data.status === 200) {
					refetch();
					return tost(res.data.message);
				}
				tost(res.data.message);
			})
			.catch((er) => tost(er.message));
	};

	return (
		<tr>
			<td>
				<span className="ec-sub-cat-tag">{countWord(mainData.name, 15)}</span>
			</td>
			<td>
				<Link to="/admin/main-category">
					<span className="ec-sub-cat-list">
						<span className="badge badge-info">
							{countWord(mainData?.category?.name, 15)}
						</span>
					</span>
				</Link>
			</td>

			<td className="text-uppercase">
				<span
					className={`mb-2 mr-2 badge ${
						(mainData?.status === 'pending' && 'badge-warning') ||
						(mainData?.status === 'active' && 'badge-success')
					}`}
				>
					{mainData.status}
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
							to={`/admin/edit-sub-category/${mainData?.id}`}
							className="dropdown-item"
						>
							Edit
						</Link>
						{mainData?.status === 'active' && (
							<button
								type="button"
								onClick={() => updateStatus(mainData?.id, 'pending')}
								className="dropdown-item"
							>
								Pending
							</button>
						)}
						{mainData?.status === 'pending' && (
							<button
								type="button"
								onClick={() => updateStatus(mainData?.id, 'active')}
								className="dropdown-item"
							>
								Active
							</button>
						)}

						<a
							onClick={() => delete_handler(mainData?.id)}
							className="dropdown-item"
							href="#"
						>
							Delete
						</a>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default SubCategoryTableRow;
