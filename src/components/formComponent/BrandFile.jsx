import React from 'react';

function BrandFile({ dispatch }) {
	return (
		<>
			<label htmlFor="brand_image">Brand Image</label>
			<input
				type="file"
				onChange={(e) =>
					dispatch({
						type: 'FILE',
						payload: e.target.files,
					})
				}
				name="image"
				id="brand_image"
				className="form-control"
				placeholder="Brand Image"
			/>
		</>
	);
}

export default BrandFile;
