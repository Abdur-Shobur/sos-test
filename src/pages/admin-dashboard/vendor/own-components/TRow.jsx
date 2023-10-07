/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { http } from '../../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../../components/action/DeletePopUP';
import { useState } from 'react';
import tost from '../../../../components/action/tost';
import {
	CopyClipboardHandler,
	countWord,
	time,
} from '../../../../components/action/actions';
import {
	ClickToCopy,
	TableImage,
	TableName,
	TableSr,
	TableStatus,
	TableTime,
} from '../../../../components/table/TableComponents';
import { ADMIN_VENDOR_PROFILE_VIEW } from '../../../../components/action/path';
import { MdContentCopy } from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';

function TRow({ i, data, page, refetch }) {
	const { click_button_handler, copied } = CopyClipboardHandler();
	const [load, setLoad] = useState(false);
	const location = useLocation();
	const { image, name, email, status, number, created_at, balance } = data;

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
			tost(err.data.message);
			setLoad(false);
		}
	};

	// delete vendor
	const delete_handler = (e) => {
		const del = () =>
			http.delete(`/delete-vendor/${e}`).then((res) => {
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
					id={data?.id}
					path={ADMIN_VENDOR_PROFILE_VIEW}
					src={data?.image}
				/>
			</td>
			<td>
				<TableName
					id={data?.id}
					path={ADMIN_VENDOR_PROFILE_VIEW}
					text={data?.name}
				/>
			</td>
			<td>
				{countWord(data?.email, 15)} <ClickToCopy text={data?.email} />
			</td>

			<td>
				<TableStatus
					status={data?.status}
					text={data?.balance}
					suffix={!balance ? '00 tk' : ' tk'}
				/>
			</td>

			<td>
				{countWord(data?.number || '', 13)}
				<ClickToCopy text={data?.number} />
			</td>
			<td>
				<TableTime date={data?.created_at} />
			</td>
			<td>
				<TableStatus status={data?.status} text={data?.status} />
			</td>
			<td>
				<div className="btn-group">
					<Link
						to={`/admin/vendor-profile-view/${data?.id}`}
						style={{ padding: '3px 10px' }}
						className="btn btn-outline-success"
					>
						View
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
							className="dropdown-item"
							state={{ from: location }}
							replace
							to={`/admin/edit-vendors/${data?.id}`}
						>
							Edit
						</Link>
						{data?.status === 'pending' && (
							<button
								disabled={load}
								onClick={() => status_handler(data?.id, 'active')}
								className="dropdown-item"
								href="#"
							>
								Active
							</button>
						)}
						{data?.status === 'active' && (
							<button
								disabled={load}
								onClick={() => status_handler(data?.id, 'pending')}
								className="dropdown-item"
								href="#"
							>
								Pending
							</button>
						)}
						<a
							onClick={() => delete_handler(data?.id)}
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

export default TRow;
