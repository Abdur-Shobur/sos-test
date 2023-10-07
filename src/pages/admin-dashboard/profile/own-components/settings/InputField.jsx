import React from 'react';

function InputField({
	label,
	name,
	type,
	defaultValue,
	placeholder,
	dispatch,
	readOnly,
}) {
	return (
		<div className="form-group">
			<label htmlFor="firstName">{label}</label>
			<input
				onChange={(e) =>
					dispatch({
						type: 'TEXT',
						payload: {
							name,
							value:
								type === 'number' ? parseInt(e.target.value) : e.target.value,
						},
					})
				}
				type={type ? type : 'text'}
				className="form-control"
				id={name}
				defaultValue={defaultValue || null}
				placeholder={placeholder}
				readOnly={readOnly ? true : false}
			/>
		</div>
	);
}

export default InputField;
