import React from 'react';

function ShippingAddress({ product }) {
	return (
		<div className="card border-info mb-3 mt-3" style={{ maxWidth: '25rem' }}>
			<div className="card-header">Shipping Address</div>
			<div className="card-body">
				<h5 className="card-title d-flex">
					<span className="" style={{ flex: '1' }}>
						Name:
					</span>
					<span className="" style={{ flex: '1' }}>
						{product.name || 'N/A'}
					</span>
				</h5>
				<div>
					<p className="card-text d-flex justify-content-between border-bottom py-1 border-top">
						<span className="" style={{ flex: '1' }}>
							Phone:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.phone || 'N/A'}
						</span>
					</p>
					<p className="card-text d-flex justify-content-between border-bottom py-1">
						<span className="" style={{ flex: '1' }}>
							Email:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.email || 'N/A'}
						</span>
					</p>
					<p className="card-text d-flex justify-content-between border-bottom py-1">
						<span className="" style={{ flex: '1' }}>
							City:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.city || 'N/A'}
						</span>
					</p>
					<p className="card-text d-flex justify-content-between border-bottom py-1">
						<span className="" style={{ flex: '1' }}>
							Address:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.address || 'N/A'}
						</span>
					</p>
					<p className="card-text d-flex justify-content-between border-bottom py-1">
						<span className="" style={{ flex: '1' }}>
							Afi Amount:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.afi_amount || 'N/A'}
						</span>
					</p>
					<p className="card-text d-flex justify-content-between border-bottom py-1">
						<span className="" style={{ flex: '1' }}>
							Product Price:
						</span>
						<span className="" style={{ flex: '1' }}>
							{product?.product_amount || 'N/A'}
						</span>
					</p>
				</div>
				<h5 className="d-flex pt-1">Variant</h5>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Color</th>
								<th scope="col">Size</th>
								<th scope="col">Qty</th>
							</tr>
						</thead>
						<tbody>
							{product?.variants?.map((e, i) => (
								<tr key={i}>
									<td>{e.color || 'N/A'}</td>
									<td>{e.size || 'N/A'}</td>
									<td>{e.qty || 'N/A'}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default ShippingAddress;
