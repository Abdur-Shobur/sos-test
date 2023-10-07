/* eslint-disable eqeqeq */
import React from 'react';
import ShowItemsCart from './ShowItemsCart';

function InputFields({ state, dispatch }) {
	const formHandel = (e) => {
		e.preventDefault();
		dispatch({
			type: 'CREATE',
			payload: {
				...state.InitialItems,
				variants: state.InitialItems.variants.filter((v) => v.qty !== ''),
				id: state.selected[state.selected.length - 1]?.id + 1 || 1,
			},
		});
		e.target.reset();
	};

	let getItemQty = (id) => {
		let value = state?.InitialItems?.variants?.filter((item) => item.id == id);
		return { qty: value[0]?.qty ? parseInt(value[0]?.qty) : 0 };
	};
	return (
		<div className="needs-validation">
			<form onSubmit={formHandel} action="">
				<div className="row">
					<div className="col-md-6 mb-3">
						<label htmlFor="firstName">First name</label>
						<input
							onInput={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										id: state.selected[state.selected.length - 1]?.id || 1,
										name: e.target.name,
										value: e.target.value,
									},
								})
							}
							type="text"
							className="form-control"
							id="firstName"
							placeholder="Enter Name Here"
							name="name"
							required
						/>
						<div className="invalid-feedback">
							Valid first name is required.
						</div>
					</div>
					<div className="col-md-6 mb-3">
						<label htmlFor="phone">Phone Number</label>
						<input
							onInput={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										id: state.selected[state.selected.length - 1]?.id || 1,
										name: e.target.name,
										value: e.target.value ? parseInt(e.target.value) : null,
									},
								})
							}
							type="number"
							className="form-control"
							id="phone"
							placeholder="017********"
							name="phone"
							required
						/>
						<div className="invalid-feedback">
							Please enter a valid email address for shipping updates.
						</div>
					</div>
					<div className="mb-3 col-md-6">
						<label htmlFor="email">
							Email <span className="text-muted">(Optional)</span>
						</label>
						<input
							onInput={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										id: state.selected[state.selected.length - 1]?.id || 1,
										name: e.target.name,
										value: e.target.value,
									},
								})
							}
							type="email"
							className="form-control"
							id="email"
							placeholder="you@example.com"
							name="email"
						/>
						<div className="invalid-feedback">
							Please enter a valid email address for shipping updates.
						</div>
					</div>
					<div className="mb-3 col-md-6">
						<label htmlFor="city">City</label>
						<input
							onInput={(e) =>
								dispatch({
									type: 'TEXT',
									payload: {
										id: state.selected[state.selected.length - 1]?.id || 1,
										name: e.target.name,
										value: e.target.value,
									},
								})
							}
							type="text"
							className="form-control"
							id="city"
							placeholder="Dhaka"
							required
							name="city"
						/>
						<div className="invalid-feedback">
							Please enter your shipping address.
						</div>
					</div>
				</div>

				<div className="mb-3 ">
					<label htmlFor="address">Full Address</label>
					<textarea
						onInput={(e) =>
							dispatch({
								type: 'TEXT',
								payload: {
									id: state.selected[state.selected.length - 1]?.id || 1,
									name: e.target.name,
									value: e.target.value,
								},
							})
						}
						type="text"
						className="form-control"
						id="address"
						placeholder="1234 Main St"
						name="address"
						required
					></textarea>

					<div className="invalid-feedback">
						Please enter your shipping address.
					</div>
				</div>
				{state?.apiData?.cart_details?.map((x, i) => (
					<div className="row" key={x.id}>
						<h6>Variant {i + 1}</h6>
						<div className="col-md-4">
							<label htmlFor="color">Color</label>
							<input
								type="text"
								className="form-control"
								id="color"
								placeholder="No Color"
								autoComplete="off"
								required
								name="color"
								defaultValue={x.color}
								readOnly
							/>
						</div>
						<div className="col-md-4">
							<label htmlFor="color">Size</label>
							<input
								type="text"
								className="form-control"
								id="size"
								placeholder="No Size"
								autoComplete="off"
								required
								name="size"
								defaultValue={x.size}
								readOnly
							/>
						</div>
						<div className=" col-md-4">
							<label className="form-label" htmlFor="qty">
								Quantity <span className="badge badge-info">{x.qty}</span>
								{getItemQty(x.id).qty > parseInt(x.qty) && (
									<span className="badge badge-danger w-100">
										{x.qty} You Can Max Add qty
									</span>
								)}
							</label>
							<input
								onInput={(e) =>
									dispatch({
										type: 'VARIANT',
										payload: {
											id: x.id,
											name: e.target.name,
											value: e.target.value,
											size: x.size,
											color: x.color,
											vendor_id: state?.apiData?.vendor_id,
											product_id: state?.apiData?.product_id,
											cart_id: state?.apiData?.id,
											amount: state?.apiData?.amount,
											variant_id: x.variant_id,
										},
									})
								}
								type="number"
								className="form-control"
								id="qty"
								placeholder="00"
								name="qty"
								style={{
									borderColor: getItemQty(x.id).qty > parseInt(x.qty) && 'red',
								}}
							/>
							<div className="invalid-feedback">
								Please enter your shipping address.
							</div>
						</div>
					</div>
				))}
				<div className="text-end">
					<button
						disabled={state.InitialItems.variants.every(
							(e) => parseInt(e.qty) <= 0 || e.qty === ''
						)}
						className="btn btn-success btn-lg mt-3 d-inline-block"
						type="submit"
					>
						Create
					</button>
				</div>
			</form>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
				{state?.selected
					?.map((e, i) => (
						<ShowItemsCart dispatch={dispatch} data={e} key={i} state={state} />
					))
					?.reverse()}
			</div>
		</div>
	);
}

export default InputFields;
