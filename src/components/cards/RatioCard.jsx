import React from 'react';

function RatioCard({ count, title, icon, isLoading }) {
	return (
		<div className="col-xl-3 col-sm-6 p-b-15 lbl-card">
			<div className="card card-mini dash-card card-1">
				<div className="card-body">
					<h2 className="mb-1">{isLoading ? '...' : count}</h2>
					<p>{title}</p>
					<span className={icon}></span>
				</div>
			</div>
		</div>
	);
}

export default RatioCard;
