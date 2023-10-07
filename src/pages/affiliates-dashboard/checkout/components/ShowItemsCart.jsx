import React from 'react';
import { TiDelete } from 'react-icons/ti';

function ShowItemsCart({ data, dispatch, state }) {
	return (
		<div className="card bg-primary-subtle mt-4">
			<div className="card-body position-relative">
				<div className="text-section">
					<h5 className="card-title fw-bold">{data?.name}</h5>
					<p className="card-text">{data?.phone}</p>
					<p className="card-text">{data?.email}</p>
				</div>
				<div className="cta-section">
					<div>{data?.qty}</div>

					<p>{data?.city}</p>
					<p>{data?.address}</p>
					{/* {data?.variants?.map((e, i) => (
						<li key={i}>
							Qty={e.qty}; Size={e.size}; Color= {e.color}
						</li>
					))} */}
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Sr.</th>
								<th scope="col">Color</th>
								<th scope="col">Size</th>
								<th scope="col">Qty</th>
								<th scope="col">Price</th>
							</tr>
						</thead>
						<tbody>
							{data?.variants?.map((x, ix) => (
								<tr key={ix}>
									<th scope="row">{ix + 1}</th>
									<td>{x.color || 'N/A'}</td>
									<td>{x.size || 'N/A'}</td>
									<td>{x.qty || 'N/A'}</td>
									<td>
										{(
											parseInt(x.qty) * parseFloat(state?.apiData?.amount)
										).toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<button
					className="btn btn-danger position-absolute"
					style={{ top: '5px', right: '5px', padding: 0 }}
					onClick={(e) =>
						dispatch({
							type: 'DELETE',
							payload: data.id,
						})
					}
				>
					<TiDelete className="fs-3" />
				</button>
				{/* <button
					onClick={(e) =>
						dispatch({
							type: 'EDIT',
							payload: data.id,
						})
					}
				>
					edit
				</button> */}
			</div>
		</div>
	);
}

export default ShowItemsCart;
