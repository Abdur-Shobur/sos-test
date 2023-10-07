import React from 'react';

function Input({ i, state, hide, dispatch, data }) {
	// const handleQuantityChange = (event) => {
	// 	const value = parseInt(event.target.value, 10);
	// 	const id = event.target.dataset.id;
	// 	const name = event.target.name;
	// 	dispatch({
	// 		type: 'CHANGE_QTY',
	// 		payload: {
	// 			id,
	// 			name,
	// 			value,
	// 		},
	// 	});
	// };

	return (
		<div className="row mt-3">
			{!hide && (
				<>
					<div className="col-md-4 ">
						<label htmlFor="add-qty">Color</label>
						<input
							defaultValue={data?.color}
							type="text"
							placeholder="N/A"
							className="form-control"
							readOnly
						/>
					</div>

					<div className="col-md-4 ">
						<label htmlFor="add-qty"> Size</label>
						<input
							defaultValue={data?.size}
							type="text"
							placeholder="N/A"
							className="form-control"
							readOnly
						/>
					</div>
				</>
			)}
			<div className="col-md-4 ">
				<label htmlFor="add-qty">
					Quantity <span className="badge badge-info">{data?.preQty}</span>
				</label>
				<input
					onChange={(e) =>
						dispatch({
							type: 'CHANGE_QTY',
							payload: {
								id: data?.id,
								name: e.target.name,
								value: e.target.value < 1 ? null : e.target.value,
							},
						})
					}
					min="0"
					max={parseInt(data?.preQty)}
					type="number"
					id="add-qty"
					name="qty"
					placeholder="Add Quantity"
					className={`form-control`}
					style={{
						borderColor: parseInt(data.qty) > parseInt(data.preQty) && 'red',
					}}
				/>
				{/* <input
					key={data.id}
					type="number"
					name="quantity"
					value={data.quantity || ''}
					min={1}
					data-id={data.id}
					onChange={handleQuantityChange}
				/> */}
			</div>
		</div>
	);
}

export default Input;
