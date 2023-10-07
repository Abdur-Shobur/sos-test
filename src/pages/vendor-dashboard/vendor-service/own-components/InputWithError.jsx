// this input use for EDIT field

import React from 'react';
function InputWithError({
	dispatch,
	defaultValue,
	label,
	name,
	placeholder,
	require,
	type,
	state,
}) {
	return (
		<>
			<label htmlFor={name}>
				{label}
				<span>
					Sub Category{' '}
					{state.apiRes.service_sub_category_id && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({state.apiRes.service_sub_category_id[0]})
						</span>
					)}
				</span>
			</label>
			<input
				name={name}
				type={type}
				className="form-control"
				id={name}
				required={require}
				defaultValue={defaultValue}
				placeholder={placeholder}
				onChange={(e) =>
					dispatch({
						type: 'INPUT',
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

export default InputWithError;
