import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';
import { CopyClipboardHandler } from '../../components/action/actions';

function Credential({ data }) {
	const { copied, click_button_handler, copy_data } = CopyClipboardHandler();

	return (
		<div className="card p-3 mt-3">
			<p className="mb-2">
				Demo Credential{' '}
				<span
					className={`badge ${
						data.title === 'Admin'
							? 'badge-primary'
							: data.title === 'Vendor'
							? 'badge-info'
							: 'badge-warning'
					}`}
				>
					{data.title}
				</span>
			</p>
			<h5>
				Email: <span>{data.email}</span>
				<span
					style={{ cursor: 'pointer' }}
					onClick={() => click_button_handler(data.email)}
					className={`btn btn-sm ${
						// copied ? 'btn-info' : 'btn-success'
						copied && copy_data === data.email ? 'btn-info' : 'btn-success'
					}`}
				>
					{copied && copy_data === data.email ? (
						<RiCheckboxMultipleFill />
					) : (
						<MdContentCopy />
					)}
				</span>
			</h5>
			<h6>
				Password: <span>{data.password}</span>
				<span
					style={{ cursor: 'pointer' }}
					onClick={() => click_button_handler(data.password)}
					className={`btn btn-sm ${
						// copied ? 'btn-info' : 'btn-success'
						copied && copy_data === data.password ? 'btn-info' : 'btn-success'
					}`}
				>
					{copied && copy_data === data.password ? (
						<RiCheckboxMultipleFill />
					) : (
						<MdContentCopy />
					)}
				</span>
			</h6>
		</div>
	);
}

export default Credential;
