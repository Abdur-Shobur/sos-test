import React from 'react';
import { Link } from 'react-router-dom';
import {
	photoView,
	time,
	CopyClipboardHandler,
} from '../../../../components/action/actions';
import { MdContentCopy } from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';
import { TableImage } from '../../../../components/table/TableComponents';
import { ADMIN_AFFILIATE_PROFILE_VIEW } from '../../../../components/action/path';

function TableRow({ data, i, page, isOpen, setLoading, refetch, setIsOpen }) {
	const { click_button_handler, copied } = CopyClipboardHandler();
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1}
			</td>
			<td>
				<TableImage
					id={data?.affiliator?.id}
					path={ADMIN_AFFILIATE_PROFILE_VIEW}
					src={data?.affiliator?.image}
				/>
			</td>
			<td>
				<Link to={`/admin/affiliates-profile-view/${data?.affiliator?.id}`}>
					{data?.affiliator?.name}
				</Link>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data.amount} tk
				</span>{' '}
			</td>
			<td>{data.bank_name}</td>
			<td>
				{data.ac_or_number}{' '}
				<button onClick={() => click_button_handler(data?.ac_or_number)}>
					{!copied ? <MdContentCopy /> : <RiCheckboxMultipleFill />}
				</button>
			</td>
			<td>{data.holder_name || 'N/A'} </td>
			<td>{data.branch_name || 'N/A'} </td>
			<td>{data.admin_transition_id || 'N/A'} </td>
			<td>
				<span className="time">
					<span>{time(data?.created_at).date}</span>
					<span className="showTime">{time(data?.created_at).time}</span>
				</span>
			</td>
			<td>
				<span className="time">
					<span>{time(data?.updated_at).date}</span>
					<span className="showTime">{time(data?.updated_at).time}</span>
				</span>
			</td>
			<td>
				<span
					className={`mb-2 mr-2 badge ${
						(data?.status === 'pending' && 'badge-warning') ||
						(data?.status === 'success' && 'badge-success') ||
						(data?.status === 'cancel' && 'badge-danger')
					}`}
				>
					{data?.status}
				</span>
			</td>
			<td>
				<div className="btn-group mb-1">
					<button
						onClick={() => photoView(data.admin_screenshot)}
						style={{ padding: '3px 10px' }}
						type="button"
						className="btn btn-outline-success"
					>
						screenshot
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
					{/* {data?.status === 'pending' && ( */}
					<div className="dropdown-menu">
						<button
							onClick={() => setIsOpen({ id: data.id, open: true })}
							// disabled={load}
							// onClick={() =>
							// 	statusChangeAmount(data.id, 'success', setLoad, refetch)
							// }
							className="dropdown-item"
						>
							Success
						</button>

						{/* <button
						 
							className="dropdown-item"
							onClick={() =>
								updateHandler(
									data.id,
									{ status: 'cancel' },
									setLoading,
									setIsOpen,
									refetch
								)
							}
						>
							Cancel
						</button> */}
					</div>
					{/* )} */}
				</div>
			</td>
		</tr>
	);
}

export default TableRow;
