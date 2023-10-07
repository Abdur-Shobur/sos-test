import InputField from './InputField';

function FieldIncrement({ color, size, state, dispatch, hide }) {
	return (
		<div className="mt-5">
			{state.fields?.map((e) => (
				<InputField
					key={e.id}
					data={e}
					color={color}
					size={size}
					state={state}
					dispatch={dispatch}
					hide={hide}
				/>
			))}
			<div className="text-end  mt-3  ">
				{!hide && (
					<button
						onClick={() =>
							dispatch({
								type: 'CREATE',
							})
						}
						type="button"
						className="btn btn-primary btn-sm"
					>
						++
					</button>
				)}
			</div>
		</div>
	);
}

export default FieldIncrement;
