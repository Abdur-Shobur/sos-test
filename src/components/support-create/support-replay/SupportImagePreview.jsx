import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function SupportImagePreview({ state, dispatch }) {
	return (
		state.url && (
			<div
				style={{
					maxWidth: '400px',
					height: '300px',
					boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
					padding: '21px',
					marginBottom: '10px',
					position: 'relative',
				}}
			>
				<button
					onClick={() =>
						dispatch({
							type: 'DELETE_URL',
							payload: 1,
						})
					}
					className="btn btn-sm btn-danger position-absolute"
					style={{
						right: '15px',
						top: '15px',
						width: '40px',
						height: '40px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '0',
						borderRadius: '10px',
					}}
				>
					<AiOutlineCloseCircle style={{ fontSize: '24px' }} />
				</button>
				<img
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: '10px',
					}}
					src={state.url}
					alt="Problem Img"
				/>
			</div>
		)
	);
}

export default SupportImagePreview;
