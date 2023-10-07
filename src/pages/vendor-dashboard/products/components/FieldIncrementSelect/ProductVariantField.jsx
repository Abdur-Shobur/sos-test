import React from 'react';

function ProductVariantField({ state, data, dispatch }) {
	return (
		<div className="position-relative">
			<div className="d-flex ">
				<select
					className="flex-grow mb-1"
					style={{ borderEndEndRadius: '0', borderStartEndRadius: 0 }}
					name="color_name"
					onChange={(e) =>
						dispatch({
							type: 'CHANGE_SELECT_COLOR',
							payload: {
								color_id: e.target.value.split(' ')[0],
								name: e.target.name,
								value: e.target.value.split(' ')[1],
								id: data.id,
							},
						})
					}
				>
					<option selected disabled>
						----
					</option>
					{state?.apiDataColor?.map((e, i) => (
						<option key={i} value={`${e.id} ${e.name}`}>
							{e.name}
						</option>
					))}
				</select>
				<select
					className="flex-grow mb-1"
					style={{ borderRadius: 0 }}
					name="size_name"
					onChange={(e) =>
						dispatch({
							type: 'CHANGE_SELECT_SIZE',
							payload: {
								size_id: e.target.value.split(' ')[0],
								name: e.target.name,
								value: e.target.value.split(' ')[1],
								id: data.id,
							},
						})
					}
				>
					<option selected disabled>
						----
					</option>
					{state?.apiDataSize?.map((e, i) => (
						<option key={i} value={`${e.id} ${e.name}`}>
							{e.name}
						</option>
					))}
				</select>
				<input
					style={{ borderStartStartRadius: '0', borderEndStartRadius: 0 }}
					className="flex-grow mb-1"
					type="number"
					name="qty"
					disabled={
						!(
							// (data.size_name !== null && data.color_name === null) ||
							(
								(data.size_name !== null && data.color_name !== null) ||
								(data.size_name === null && data.color_name !== null)
							)
						)
					}
					min={0}
					onChange={(e) => {
						dispatch({
							type: 'CHANGE_VALUE',
							payload: {
								name: e.target.name,
								value: e.target.value > 0 ? parseInt(e.target.value) : null,
								id: data.id,
							},
						});
					}}
					defaultValue={data.qty}
					placeholder="Add qty"
				/>
			</div>

			<button
				className="position-absolute"
				disabled={state.selected.length === 1}
				type="button"
				style={{
					display: state.selected.length === 1 ? 'none' : 'inline-block',
					color: 'red',
					right: '5px',
					top: '5px',
					fontSize: '18px',
				}}
				onClick={(e) =>
					dispatch({
						type: 'DELETE',
						payload: data.id,
					})
				}
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
	);
}

export default ProductVariantField;
