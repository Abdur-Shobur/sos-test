import React from 'react';

function Search({ searchHandler }) {
	return (
		<div className="d-flex align-items-center" style={{ gap: '5px' }}>
			<input
				onInput={(e) => searchHandler(e.target.value)}
				placeholder="Search"
				className="form-control"
				autoComplete={'off'}
				name="email"
			/>
			<button
				type="submit"
				className="btn btn-primary   d-flex align-items-center"
			>
				<span style={{ marginRight: '2px' }}>Search</span>
			</button>
		</div>
	);
}

export default Search;
