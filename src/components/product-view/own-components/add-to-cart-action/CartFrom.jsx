import React from 'react';
import CartInput from './CartInput';

function CartFrom({ state, dispatch }) {
 	return (
		<div>
			{state.selectedData.map((e, i) => (
				<CartInput
					key={e.uniqueID}
					data={e}
					state={state}
					dispatch={dispatch}
				/>
			))}
			<div className="">
				<button
					disabled={state.mainData.length <= state.selectedData.length}
					onClick={() =>
						dispatch({
							type: 'CREATE_NEW++',
						})
					}
					className="btn btn-primary btn-sm "
				>
					++
				</button>
			</div>
		</div>
	);
}

export default CartFrom;
