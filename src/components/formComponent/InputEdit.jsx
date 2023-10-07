// this input use for EDIT field

import React from 'react';
function InputEdit({
	dispatch,
	defaultValue,
	label,
	name,
	placeholder,
	require,
	type,
	error,
	dispatchType = 'INPUT',
	readOnly,
}) {
	return (
		<>
			<label htmlFor={name}>
				{label}{' '}
				<span>
					{' '}
					{error && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({error})
						</span>
					)}
				</span>
			</label>
			<input
				style={{
					border: error && '1px solid #ffa7a7',
				}}
				name={name}
				type={type}
				className="form-control"
				id={name}
				required={require}
				defaultValue={defaultValue}
				placeholder={placeholder}
				readOnly={readOnly}
				onChange={(e) =>
					dispatch({
						type: dispatchType,
						payload: {
							name: e.target.name,
							value: e.target.value,
						},
					})
				}
			/>
		</>
	);
}

export default InputEdit;
