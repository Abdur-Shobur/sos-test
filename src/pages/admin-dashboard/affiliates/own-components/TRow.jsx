/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { http } from '../../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../../components/action/DeletePopUP';
import style from '../../../../assets/css/style.module.css';
import tost from '../../../../components/action/tost';
import { countWord, time } from '../../../../components/action/actions';
import {
	TableImage,
	TableName,
	TableSr,
} from '../../../../components/table/TableComponents';
import { ADMIN_AFFILIATE_PROFILE_VIEW } from '../../../../components/action/path';

function TRow({ i, page, affiliate, refetch }) {
	const [load, setLoad] = useState(false);
	const location = useLocation();

	// status_handler
	const status_handler = async (id, status) => {
		setLoad(true);
		try {
			const res = await http.post(`/user/status/update/${id}`, {
				status: status,
			});

			if (res.data.status === 200) {
				refetch();
				tost(res.data.message);
				setLoad(false);
			}
			setLoad(false);
		} catch (err) {
			tost(err.message);
			setLoad(false);
		}
	};

	// delete affiliator
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/delete-affiliator/${e}`).then((res) => {
				tost(res.data.message);
				refetch();
			});
		return DeletePopUP(del);
	};
	return (
		<tr>
			<td>
				<TableSr i={i} page={page} />
			</td>

			<td>
				<TableImage
					id={affiliate?.id}
					path={ADMIN_AFFILIATE_PROFILE_VIEW}
					src={affiliate?.image}
				/>
			</td>
			<td>
				<TableName
					id={affiliate?.id}
					path={ADMIN_AFFILIATE_PROFILE_VIEW}
					text={affiliate?.name}
				/>
			</td>
			<td>{countWord(affiliate?.email, 15)}</td>

			<td>
				<span className={`mb-2 mr-2 badge badge-success`}>
					{affiliate?.balance || '00'} tk
				</span>
			</td>

			<td>{countWord(affiliate?.number, 13)}</td>
			<td>
				<span className={'time'}>
					<span>{time(affiliate.created_at).date}</span>
					<span className={'showTime'}>{time(affiliate.created_at).time}</span>
				</span>
			</td>

			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(affiliate?.status === 'pending' && 'badge-warning') ||
						(affiliate?.status === 'active' && 'badge-success')
					}`}
				>
					{affiliate?.status}
				</span>
			</td>
			<td>
				<div className="btn-group mb-1">
					<Link
						to={`/admin/affiliates-profile-view/${affiliate?.id}`}
						style={{ padding: '3px 10px' }}
						type="button"
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
						<Link
							to={`/admin/edit-affiliates/${affiliate?.id}`}
							state={{ from: location }}
							replace
							className="dropdown-item"
						>
							Edit
						</Link>
						{affiliate?.status === 'pending' && (
							<button
								disabled={load}
								onClick={() => status_handler(affiliate?.id, 'active')}
								className="dropdown-item"
								href="#"
							>
								Active
							</button>
						)}
						{affiliate?.status === 'active' && (
							<button
								disabled={load}
								onClick={() => status_handler(affiliate?.id, 'pending')}
								className="dropdown-item"
								href="#"
							>
								Pending
							</button>
						)}
						<button
							disabled={load}
							onClick={() => delete_handler(affiliate?.id)}
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

export default TRow;
