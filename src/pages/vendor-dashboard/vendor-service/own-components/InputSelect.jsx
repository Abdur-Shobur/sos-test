import React from 'react';

const InputSelect = ({ state, dispatch, name }) => {
	return (
		<>
			<label for="parent-category">
				<span>
					Times
					{!state.data[name] && state.apiRes.time && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({state.apiRes.time[0]})
						</span>
					)}
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
					<option disabled selected>
						Select
					</option>
					<option value={'1'}>1 Day</option>
					<option value={'2'}>2 Day</option>
					<option value={'3'}>3 Day</option>
					<option value={'7'}>7 Day</option>
					<option value={'10'}>10 Day</option>
					<option value={'15'}>15 Day</option>
					<option value={'21'}>21 Day</option>
					<option value={'30'}>30 Day</option>
				</select>
			</div>
		</>
	);
};

export default InputSelect;
