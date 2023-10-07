import React from 'react';

function CartHandler({ state, product, load, add_to_cart_handler }) {
	return (
		<div className="product-stock mt-3">
			<div className="stock">
				<p className="title">Total Cart</p>
				<p className="text">{state?.totalQty || 0}</p>
			</div>
			<div>
				<p
					className={`${
						state?.totalQty > parseInt(product?.qty)
							? 'd-block text-danger'
							: 'd-none'
					}`}
				>
					<span className="badge badge-danger w-100">
						You can select Maximum {product?.qty} products
					</span>
				</p>
				<button
					// hidden={product?.request !== '1'}
					disabled={
						load ||
						state?.totalQty > parseInt(product?.qty) ||
						state.totalQty <= 0
					}
					onClick={() => add_to_cart_handler()}
					className="btn btn-success"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default CartHandler;
