import React from 'react';

function SelectEdit({ dispatch, defaultValue }) {
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
				defaultValue={defaultValue}
				name="status"
				className="form-control here set-slug"
				aria-label=".form-select-sm example"
			>
				<option
					selected={defaultValue === 'pending' && 'pending'}
					value="pending"
				>
					Pending
				</option>
				<option selected={defaultValue === 'active' && 'active'} value="active">
					Active
				</option>
			</select>
		</>
	);
}

export default SelectEdit;
