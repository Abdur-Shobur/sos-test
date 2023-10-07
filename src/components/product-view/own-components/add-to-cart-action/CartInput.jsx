import React from 'react';

function CartInput({ state, dispatch, data }) {
	const currentID = state.selectedData.map((e) => e.id);
	console.log(data);

	return (
		<div className="row">
			<div className="col-md-4">
				<label>Color</label>
				<select
					className="form-control here set-slug"
					onChange={(e) =>
						dispatch({
							type: 'SELECT_COLOR_ID',
							payload: {
								color_id: e.target.value.split(' ')[0],
								id: e.target.value.split(' ')[1],
								uniqueID: data.uniqueID,
							},
						})
					}
					aria-label="Default select example"
				>
					<option selected disabled>
						-------
					</option>
					{state.uniqueColor.map((c) => (
						<option
							disabled={currentID.includes(c.id)}
							key={c.color_id}
							value={`${c.color_id} ${c.id} ${c.uniqueID}`}
						>
							{c.color_name}
						</option>
					))}
				</select>
			</div>
			<div className="col-md-4">
				<label>Size uuid {data.uniqueID}</label>

				<select
					className="form-control here set-slug"
					onChange={(e) =>
						dispatch({
							type: 'SELECT_SIZE_ID',
							payload: {
								uniqueID: data.uniqueID,
								id: e.target.value,
							},
						})
					}
					aria-label="Default select example"
				>
					{data?.sizes?.map((c, i) => (
						<option key={c.id} value={c.id}>
							{c.size_name}
						</option>
					))}
				</select>
			</div>
			<div className="col-md-4 position-relative">
				<label>
					Have Qty
					<span className="badge badge-info">{data?.preQty}</span>
				</label>
				<input
					className="form-control"
					style={{
						borderColor: parseInt(data.qty) > parseInt(data.preQty) && 'red',
					}}
					type="number"
					placeholder="qty"
					onChange={(e) =>
						dispatch({
							type: 'UPDATE_QTY',
							payload: {
								uniqueID: data.uniqueID,
								value:
									e.target.value.trim() === ''
										? null
										: parseInt(e.target.value) <= 0
										? null
										: e.target.value,
							},
						})
					}
				/>
				{parseInt(data.qty) > parseInt(data.preQty) && (
					<span className="badge badge-danger w-100">
						{data.preQty} You Can Max Add qty
					</span>
				)}
				<button
					onClick={(e) =>
						dispatch({
							type: 'DELETE_SELECTED',
							payload: data.uniqueID,
						})
					}
					className="position-absolute top-50"
					type="button"
					style={{
						display: state.selectedData.length === 1 ? 'none' : 'inline-block',
						color: 'red',
						right: '15px',
						// top: '5px',
						fontSize: '18px',
					}}
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 1024 1024"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default CartInput;
