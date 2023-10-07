// this input use for main input just get data

function SelectMain({ dispatch }) {
	return (
		<>
			<label className="form-label">Status</label>
			<select
				onChange={(e) =>
					dispatch({
						type: 'INPUT',
						payload: {
							name: e.target.name,
							value: e.target.value,
						},
					})
				}
				defaultValue="pending"
				name="status"
				className="form-control here set-slug"
				aria-label=".form-select-sm example"
			>
				<option value="pending">Pending</option>
				<option value="active">Active</option>
			</select>
		</>
	);
}

export default SelectMain;
