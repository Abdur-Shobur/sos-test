import React from 'react';
import { ClipLoader } from 'react-spinners';

function SupportHeading({ data, handleChatOff, loadingBtn, from }) {
	return (
		<div
			className="card-header d-flex justify-content-center align-items-center p-3 bg-info text-white border-bottom-0"
			style={{
				borderTopLeftRadius: '15px',
				borderTopRightRadius: '15px',
				position: 'relative',
			}}
		>
			<p className="mb-0 fw-bold">Ticket chat</p>

			{data?.is_close !== '1' && from === 'admin' && (
				<button
					style={{ position: 'absolute', right: '0' }}
					onClick={handleChatOff}
					className="btn btn-danger"
					disabled={data?.is_close === '1' || loadingBtn}
				>
					Close Support {loadingBtn && <ClipLoader color="#fff" size={13} />}
				</button>
			)}
		</div>
	);
}

export default SupportHeading;
