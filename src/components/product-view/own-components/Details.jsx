import React from 'react';

function Details({ product }) {
	const obj = {
		variants: null,
	};

	return (
		<>
			<h5 className="product-title">{product?.name}</h5>
			<div></div>
			<p className="product-rate">
				<i className="mdi mdi-star is-rated"></i>
				<i className="mdi mdi-star is-rated"></i>
				<i className="mdi mdi-star is-rated"></i>
				<i className="mdi mdi-star is-rated"></i>
				<i className="mdi mdi-star"></i>
			</p>
			<p className="product-desc">{product?.short_description}</p>

			<span className="badge badge-dark">
				Commission{' '}
				{product?.discount_type === 'percent'
					? product?.discount_rate + '%'
					: product?.discount_rate + 'Tk'}
			</span>
			<p className="product-price">
				Price:{' '}
				<span style={{ color: '#c6b8b8', textDecoration: 'line-through' }}>
					৳ {product?.original_price}
				</span>{' '}
				<span style={{ color: 'red' }}>৳ {product?.selling_price}</span>
			</p>

			<p className="product-sku">
				Brand:{' '}
				<span
					style={{ background: '#d2e5ff', padding: '3px', borderRadius: '3px' }}
				>
					{product?.brand?.name || 'N/A'}
				</span>
			</p>
			<p className="product-sku">
				Category:{' '}
				<span
				// style={{ background: '#d2e5ff', padding: '3px', borderRadius: '3px' }}
				>
					{product?.category?.name || 'N/A'}{' '}
					{product?.subcategory?.name && ' > ' + product?.subcategory?.name}
				</span>
			</p>
			{product?.variants && (
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Color</th>
							<th scope="col">Size</th>
							<th scope="col">Qty</th>
						</tr>
					</thead>
					<tbody>
						{product?.variants?.map((e, i) => (
							<tr key={e.id}>
								<th scope="row">{i + 1}</th>
								<td>{e.color_name}</td>
								<td>{e.size_name}</td>
								<td>{e.qty}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className="product-stock">
				<div className="stock">
					<p className="title">Available</p>
					<p className="text">{product?.qty}</p>
				</div>
			</div>
			{product?.status === 'rejected' && (
				<div className="alert alert-danger" role="alert">
					{product?.rejected_details || ''}
				</div>
			)}
		</>
	);
}

export default Details;
