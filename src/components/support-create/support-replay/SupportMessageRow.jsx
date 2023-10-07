import React from 'react';
import { photoView, timeToCovertCurrentTime } from '../../action/actions';
import { IMG_PATH } from '../../env';

function SupportMessageRow({ data, position }) {
	return (
		<div className=" mb-4">
			<div
				class={`d-flex flex-row justify-content-${
					position === 'left' ? 'start' : 'end'
				}`}
			>
				{position === 'left' && (
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
						alt="avatar 1"
						style={{ width: '45px', height: '100%' }}
					/>
				)}
				<div
					class="p-3 ms-3"
					style={{
						borderRadius: '15px',
						backgroundColor: position === 'left' ? '#acffdd' : '#d9f9ff',
					}}
				>
					<p class="small mb-0">{data?.description}</p>
					<p
						class={`small mb-0 text-${position === 'left' ? 'end' : 'start'}`}
						style={{ fontSize: '9px' }}
					>
						{/* {time(data?.created_at).time} */}
						{timeToCovertCurrentTime(data?.created_at)}
					</p>
				</div>
				{position === 'right' && (
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
						alt="avatar 1"
						style={{ width: '45px', height: '100%' }}
					/>
				)}
			</div>

			{data?.file && (
				<div
					className={`bg-image my-3 d-flex justify-content-${
						position === 'right' && 'end'
					}`}
				>
					<img
						onClick={() => photoView(data?.file.name.replace(/\//g, '/'))}
						src={IMG_PATH + '/' + data?.file.name}
						style={{
							borderRadius: '15px',
							maxWidth: '320px',
							width: '100%',
							height: '120px',
							objectFit: 'cover',
							cursor: 'pointer',
						}}
						alt="video"
					/>
				</div>
			)}
		</div>
	);
}

export default SupportMessageRow;
