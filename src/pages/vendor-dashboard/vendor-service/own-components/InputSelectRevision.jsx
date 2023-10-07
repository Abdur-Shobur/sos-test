import React from 'react';

const InputSelectRevision = ({ state, dispatch, name }) => {
	return (
		<>
			<label for="parent-category">
				<span>
					Revision Max Time{' '}
					{!state.data[name] && state.apiRes.revision_max_time && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({state.apiRes.revision_max_time[0]})
						</span>
					)}{' '}
				</span>
				<span className="position-absolute error start-0 mt-3"></span>
			</label>
			<div>
				<select
					id="parent-category"
					name={name}
					className="custom-select"
					onChange={(e) => {
						dispatch({
							type: 'INPUT',
							payload: {
								name: e.target.name,
								value: e.target.value,
							},
						});
					}}
				>
					<option selected value={''}>
						Select
					</option>
					<option value={'1'}>1 Time</option>
					<option value={'2'}>2 Times</option>
					<option value={'3'}>3 Times</option>
				</select>
			</div>
		</>
	);
};

export default InputSelectRevision;
