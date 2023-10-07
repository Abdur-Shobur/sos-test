import React from 'react';

function InputField({ data, color, size, state, dispatch, hide }) {
	return (
		<div>
			<div className="row mt-3">
				{!hide && (
					<>
						<div className="col-md-4">
							<label className="form-label"> Color</label>
							<select
								onChange={(e) =>
									dispatch({
										type: 'CHANGE_TEXT',
										payload: {
											id: data?.id,
											name: e.target.name,
											value: e.target.value,
										},
									})
								}
								name="color"
								className="form-control here set-slug"
								aria-label=".form-select-sm example"
							>
								{color?.map((e) => (
									<option
										selected={data.color === e.name}
										value={e.name}
										key={e.id}
									>
										{e.name}
									</option>
								))}
								<option value="" selected={data.color === ''}>
									---
								</option>
							</select>
						</div>

						<div className="col-md-4">
							<label className="form-label"> Size</label>

							<select
								onChange={(e) =>
									dispatch({
										type: 'CHANGE_TEXT',
										payload: {
											id: data?.id,
											name: e.target.name,
											value: e.target.value,
										},
									})
								}
								name="size"
								className="form-control here set-slug"
								aria-label=".form-select-sm example"
							>
								{size?.map((e) => (
									<option
										selected={data.size === e.name}
										value={e.name}
										key={e.id}
									>
										{e.name}
									</option>
								))}
								<option value="" selected={data.size === ''}>
									---
								</option>
							</select>
						</div>
					</>
				)}
				<div className="col-md-4 position-relative">
					<label htmlFor="add-qty"> Quantity</label>
					<input
						onChange={(e) =>
							dispatch({
								type: 'CHANGE_TEXT',
								payload: {
									id: data?.id,
									name: e.target.name,
									value: e.target.value < 1 ? 1 : e.target.value,
								},
							})
						}
						min="1"
						defaultValue={data.qty}
						required={require}
						type="number"
						id="add-qty"
						name="qty"
						placeholder="Add Quantity"
						className="form-control"
					/>
					<button
						disabled={state.fields.length === 1}
						style={{
							display: state.fields.length === 1 ? 'none' : 'inline-block',
						}}
						className="btn btn-danger btn-sm position-absolute top-0 end-0"
						onClick={() =>
							dispatch({
								type: 'DELETE',
								payload: data.id,
							})
						}
					>
						-
					</button>
				</div>
			</div>
		</div>
	);
}

export default InputField;
