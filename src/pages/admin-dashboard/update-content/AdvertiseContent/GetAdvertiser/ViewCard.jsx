import React from 'react';
import { IMG_PATH } from '../../../../../components/env';

function ViewCard({ data, isImg = false, placements, ad_creative }) {
	let mergedData = {};
	placements?.forEach((item) => {
		for (const key in item) {
			if (item.hasOwnProperty(key)) {
				mergedData[key] = item[key];
			}
		}
	});
	return (
		<div className="card">
			<div
				className="card-header"
				style={{
					backgroundColor: '#e1eef1',
					color: '#000',
					textTransform: 'capitalize',
					fontWeight: 'bold',
				}}
			>
				{data?.[0]?.replace(/_/g, ' ')}
			</div>

			{placements && (
				<div className="d-flex mt-3 ml-3">
					<div
						className="card"
						style={{
							width: '18rem',
							borderEndEndRadius: '0',
							borderStartEndRadius: '0',
						}}
					>
						<ul className="list-group list-group-flush">
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Story Reels
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Search Result
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Messages
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Feeds
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Apps And Sites
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Advertise id
							</li>
							<li style={{ background: '#eeeeee' }} className="list-group-item">
								Adds Video And Reels
							</li>
						</ul>
					</div>
					<div
						className="card"
						style={{
							width: '18rem',
							borderEndStartRadius: '0',
							borderStartStartRadius: '0',
						}}
					>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								{mergedData?.story_reels || 'N/A'}
							</li>
							<li className="list-group-item">
								{mergedData?.search_result || 'N/A'}
							</li>
							<li className="list-group-item">
								{mergedData?.messages || 'N/A'}
							</li>
							<li className="list-group-item">{mergedData?.feeds || 'N/A'}</li>
							<li className="list-group-item">
								{mergedData?.apps_and_sites || 'N/A'}
							</li>
							<li className="list-group-item">
								{mergedData?.advertise_id || 'N/A'}
							</li>
							<li className="list-group-item">
								{mergedData?.adds_video_and_reels || 'N/A'}
							</li>
						</ul>
					</div>
				</div>
			)}
			<div className="responsive-multiple-cards-boxes-dfs">
				{ad_creative &&
					ad_creative?.map((x, i) => (
						<div
							className="d-flex mt-3 ml-3"
							style={{ border: '2px solid #a9a9a9', borderRadius: '7px' }}
							key={i}
						>
							<div
								className="card"
								style={{
									width: '100% ',
									borderEndEndRadius: '0',
									borderStartEndRadius: '0',
								}}
							>
								<ul className="list-group list-group-flush text-capitalize">
									<li
										style={{ background: '#eeeeee' }}
										className="list-group-item"
									>
										primary text
									</li>
									<li
										style={{ background: '#eeeeee' }}
										className="list-group-item"
									>
										media
									</li>
									<li
										style={{ background: '#eeeeee' }}
										className="list-group-item"
									>
										heading
									</li>
									<li
										style={{ background: '#eeeeee' }}
										className="list-group-item"
									>
										description
									</li>
									<li
										style={{ background: '#eeeeee' }}
										className="list-group-item"
									>
										call to action{' '}
									</li>
								</ul>
							</div>
							<div
								className="card"
								style={{
									width: '100% ',
									borderEndStartRadius: '0',
									borderStartStartRadius: '0',
								}}
							>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										{x?.primary_text || 'N/A'}
									</li>
									<li className="list-group-item">{x?.media || 'N/A'}</li>
									<li className="list-group-item">{x?.heading || 'N/A'}</li>
									<li className="list-group-item">{x?.description || 'N/A'}</li>
									<li className="list-group-item">
										{x?.call_to_action || 'N/A'}
									</li>
								</ul>
							</div>
						</div>
					))}
			</div>
			<div
				className="card-body"
				style={{
					display: 'flex',
					gap: '20px',
					padding: '10px',
					flexWrap: 'wrap',
				}}
			>
				{/* <h5 className="card-title">Special title treatment</h5> */}
				{isImg &&
					isImg?.map((e) => (
						<div
							className="card"
							style={{
								maxWidth: '250px',
								maxHeight: '250px',
								objectFit: 'cover',
							}}
						>
							<img
								style={{ padding: '14px', borderRadius: '20px' }}
								src={IMG_PATH + '/' + e?.file}
								className="card-img-top"
								alt="..."
							/>
						</div>
					))}
				{data?.[1] && <p className="card-text">{data?.[1]} </p>}
			</div>
		</div>
	);
}

export default ViewCard;
