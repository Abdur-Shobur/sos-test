import React from 'react';

function FormInput({ label, name, placeholder, info, dispatch, require }) {
	return (
		<div className="mb-3">
			<label htmlFor="exampleInputEmail1" className="form-label">
				{label}
			</label>
			<input
				onChange={(e) =>
					dispatch({
						type: 'TEXT',
						payload: {
							name: e.target.name,
							value: e.target.value,
						},
					})
				}
				type="text"
				className="form-control"
				id={name}
				name={name}
				placeholder={placeholder}
				required={require}
			/>
			<div id={name} className="form-text">
				{info}
			</div>
		</div>
	);
}

export default FormInput;
