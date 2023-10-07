import React from 'react';

function LoaderTextArea({ cols = 4 }) {
	return (
		<textarea
			readOnly
			placeholder="Loading..."
			cols="40"
			rows={cols}
			className="form-control"
		></textarea>
	);
}

export default LoaderTextArea;
