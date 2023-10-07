import React from 'react';
import swal from 'sweetalert';
import { http } from '../../../../../components/action/axiosInstance';
import { toast } from 'react-toastify';
import CopyClipboardHandler from '../../../../../components/action/CopyClipboardHandler';
import { MdContentCopy } from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';

function Card({ bank, refetch, to }) {
	const { click_button_handler, copied } = CopyClipboardHandler();

	const deleteHandler = (payload) => {
		const del = async () => {
			return http
				.delete(`/admin/bank/delete/${payload}`)
				.then((e) => {
					refetch();
					toast(e.data.message, {
						position: 'top-right',
						autoClose: 300,
						hideProgressBar: false,
						closeOnClick: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				})
				.catch((er) =>
					toast(er.data.message, {
						position: 'top-right',
						autoClose: 300,
						hideProgressBar: false,
						closeOnClick: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					})
				);
		};
		if (payload) {
			swal({
				title: 'Are you sure?',
				text: 'Are you Confirm to delete?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					del();
				}
			});
		}
	};
	return (
		<div className="col-md-6 col-xl-4 mb-3">
			<div className="card h-100" style={{ maxWidth: '400px' }}>
				<div
					style={{ padding: '20px' }}
					className="card-header d-flex justify-content-between"
				>
					<h5 className="">{bank.name}</h5>
					<div>
						{/* <button className="btn btn-sm btn-primary mr-2">Edit</button> */}
						{to !== 'vendor' ? (
							<button
								className="btn btn-sm btn-danger"
								onClick={() => deleteHandler(bank.id)}
							>
								Delete
							</button>
						) : (
							<span className="badge badge-success">Admin Bank</span>
						)}
					</div>
				</div>
				<div className="card-body">
					<h5 className="card-title">
						<span>A/C: {bank.number} </span>
						<button
							onClick={() => click_button_handler(bank.number)}
							className={`btn btn-sm ${!copied ? 'btn-info' : 'btn-success'}`}
						>
							{!copied ? <MdContentCopy /> : <RiCheckboxMultipleFill />}
						</button>
					</h5>
					{bank.account_holder_name && (
						<p className="card-text">Name: {bank.account_holder_name}</p>
					)}
					{bank.branch_name && (
						<p className="card-text">Branch Name: {bank.branch_name}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Card;
