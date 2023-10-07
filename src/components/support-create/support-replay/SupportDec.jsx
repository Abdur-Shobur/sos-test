import React from 'react';
import { photoView, timeConvert } from '../../action/actions';
import { IMG_PATH } from '../../env';

function SupportDec({ data }) {
	return (
		<div className="p-3 border">
			<p style={{ marginBottom: '15px' }}>
				<span style={{ fontWeight: 'bold' }}>Subject: </span>
				{data?.subject}
			</p>
			<p style={{ marginBottom: '10px' }}>
				<span style={{ fontWeight: 'bold' }}>Description:</span>{' '}
				{data?.description}
			</p>
			<p style={{ marginBottom: '10px' }}>
				<span style={{ fontWeight: 'bold' }}>Date:</span>{' '}
				{timeConvert(data?.created_at)}
			</p>
			<div style={{ marginBottom: '10px' }}>
				{data?.file && (
					<img
						onClick={() => photoView(data?.file.replace(/\//g, '/'))}
						style={{
							height: '100px',
							width: '100px',
							objectFit: 'cover',
							cursor: 'pointer',
						}}
						src={IMG_PATH + '/' + data?.file.replace(/\//g, '/')}
						alt="Problem-Img"
					/>
				)}
			</div>
		</div>
	);
}

export default SupportDec;
