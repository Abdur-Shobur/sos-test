import React, { useEffect } from 'react';

const InputField = ({ state, dispatch, data, i }) => {
	return (
		<div>
			<div
				className="d-lg-flex d-block justify-content-center py-2 align-items-center"
				style={{ gap: '20px' }}
			>
				<div style={{ width: '100%' }}>
					<label htmlFor="">Features - {i}</label>
					<input
						className="mb-1 px-3"
						placeholder="type...."
						type="text"
						name="value"
						defaultValue={data.value}
						onChange={(e) => {
							dispatch({
								type: 'CHANGE_TEXT',
								payload: {
									id: data?.id,
									value: e.target.value,
									name: e.target.name,
								},
							});
						}}
					/>
				</div>
				<div style={{ width: '100%' }}>
					<label for="parent-category">
						<span>Include</span>
						<span className="position-absolute error start-0 mt-3"></span>
					</label>
					<div>
						<select
							id="parent-category"
							name="key"
							className="custom-select"
							onChange={(e) => {
								dispatch({
									type: 'CHANGE_TEXT',
									payload: {
										id: data?.id,
										value: e.target.value,
										name: e.target.name,
									},
								});
							}}
						>
							<option selected={data.key === 'yes'} value={'yes'}>
								Yes
							</option>
							<option selected={data.key === 'no'} value={'no'}>
								No
							</option>
						</select>
					</div>
				</div>
				<button
					disabled={state?.data?.card_facilities_title.length === 1}
					style={{
						height: 'fit-content',
						display:
							state?.data?.card_facilities_title.length === 1
								? 'none'
								: 'inline-block',
					}}
					className="btn btn-danger btn-sm"
					onClick={() =>
						dispatch({
							type: 'DELETE',
							payload: data.id,
						})
					}
				>
					<svg
						style={{ color: 'white' }}
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 448 512"
					>
						<path
							fill="#fff"
							d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default InputField;
