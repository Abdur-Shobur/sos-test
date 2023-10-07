// this input use for main input just get data

function FileMain({ dispatch }) {
	return (
		<div className="custom-file mb-1">
			<input
				type="file"
				onChange={(e) =>
					dispatch({
						type: 'FILE',
						payload: e.target.files[0],
					})
				}
				name="image"
				className="custom-file-input"
				id="coverImage"
				required
			/>
			<label className="custom-file-label" htmlFor="coverImage">
				Choose file...
			</label>
			<div className="invalid-feedback">
				Example invalid custom file feedback
			</div>
		</div>
	);
}

export default FileMain;
