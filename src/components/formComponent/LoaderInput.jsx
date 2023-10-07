import React from 'react';

function LoaderInput({ label }) {
	return (
		<>
			<label>{label}</label>
			<input
				readOnly
				type="text"
				className="form-control"
				placeholder="Loading..."
			/>
		</>
	);
}

export default LoaderInput;
