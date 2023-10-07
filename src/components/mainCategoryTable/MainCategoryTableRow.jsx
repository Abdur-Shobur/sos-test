/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import icon from '../../assets/icons/category.webp';

import { Link } from 'react-router-dom';
import { http } from '../action/axiosInstance';

import { DeletePopUP } from '../action/DeletePopUP';
import tost from '../action/tost';
import { countWord } from '../action/actions';
function MainCategoryTableRow({ data, refetch }) {
	// delete category
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/delete-category/${e}`).then((res) => {
				if (res.data.status === 200) {
					refetch();
					tost(res.data.message);
				}
			});

		return DeletePopUP(del);
	};

	const updateStatus = (id, status) => {
		http
			.post(`/category-status/${id}`, { status: status })
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
				<img
					className="cat-thumb"
					src={
						data?.image === null
							? icon
							: `${process.env.REACT_APP_IMG_URL}/${data?.image}`
					}
					alt="Product-Images"
				/>
			</td>
			<td>
				<span className="ec-sub-cat-tag">{countWord(data?.name, 20)}</span>
			</td>

			<td className="text-uppercase">
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'active' && 'badge-success')
					}`}
				>
					{data?.status}
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
							to={`/admin/edit-main-category/${data?.id}`}
							className="dropdown-item"
						>
							Edit
						</Link>
						{data?.status === 'active' && (
							<button
								type="button"
								onClick={() => updateStatus(data?.id, 'pending')}
								className="dropdown-item"
							>
								Pending
							</button>
						)}
						{data?.status === 'pending' && (
							<button
								type="button"
								onClick={() => updateStatus(data?.id, 'active')}
								className="dropdown-item"
							>
								Active
							</button>
						)}

						<button
							type="button"
							onClick={() => delete_handler(data?.id)}
							className="dropdown-item"
						>
							Delete
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default MainCategoryTableRow;
