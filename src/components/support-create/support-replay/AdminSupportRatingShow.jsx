import React from 'react';

function AdminSupportRatingShow({ data }) {
	return (
		<div className="d-flex justify-content-center">
			<span
				style={{
					maxWidth: '450px',
					width: '100%',
					height: '120px',
					boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
					padding: '10px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '22px',
					borderRadius: '10px',
					flexDirection: 'column',
				}}
			>
				<span style={{ color: 'red' }}>Ticket Closed !</span>
				<span>
					User Rating:{' '}
					<span className="btn btn-success btn-sm">
						{data?.rating || 'N/A'}
					</span>
				</span>
				<div style={{ marginTop: '5px' }}>
					{data?.rating_comment !== null && (
						<p>User Comment: {data?.rating_comment}</p>
					)}
				</div>
			</span>
		</div>
	);
}

export default AdminSupportRatingShow;
