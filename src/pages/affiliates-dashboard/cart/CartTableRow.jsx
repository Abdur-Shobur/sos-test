import React from 'react';
import { Link } from 'react-router-dom';
import { http } from '../../../components/action/axiosInstance';
import { DeletePopUP } from '../../../components/action/DeletePopUP';
import { time } from '../../../components/action/actions';

function CartTableRow({ data, refetch, page, i }) {
	const deleteCartItemHandler = (cart_id) => {
		const delFun = async () => {
			return await http.delete(`/delete-cartitem/${cart_id}`).then((e) => {
				refetch();
			});
		};
		DeletePopUP(delFun);
	};
	return (
		<tr>
			<td>
				{page === null || parseInt(page) === 1
					? i + 1
					: (parseInt(page) - 1) * 10 + i + 1 || i + 1}
			</td>
			<td>
				<Link
					style={{ padding: '3px 10px' }}
					to={`/affiliates-dashboard/active-product-details/${data?.product?.id}`}
					// className="btn btn-outline-success"
				>
					{data?.product?.name}
				</Link>
			</td>
			<td>
				<span className="badge badge-info">
					{data.product_price || '00'} tk
				</span>
			</td>
			<td>
				<span className="badge badge-primary">{data.amount || '00'} tk</span>
			</td>
			<td>
				<span className="badge badge-dark">
					{data.cart_details
						.map((e) => parseInt(e.qty))
						.reduce((pre, cur) => pre + cur, 0)}
				</span>
			</td>
			<td>
				<span className="badge badge-success">
					{(
						data.cart_details
							.map((e) => parseInt(e.qty))
							.reduce((pre, cur) => pre + cur, 0) * parseFloat(data.amount)
					).toFixed(2) || '00'}{' '}
					tk
				</span>
			</td>
			<td>
				<span className={'time'}>
					<span>{time(data?.created_at).date}</span>
					<span className={'showTime'}>{time(data?.created_at).time}</span>
				</span>
			</td>
			<td>
				<button
					onClick={() => deleteCartItemHandler(data?.id)}
					className="mb-2 mr-2 badge badge-danger"
				>
					Cancel
				</button>
			</td>

			<td>
				<div className="btn-group mb-1">
					<Link
						style={{ padding: '3px 10px' }}
						to={`/affiliates-dashboard/checkout/${data?.id}`}
						className="btn btn-outline-success"
					>
						Checkout
					</Link>
				</div>
			</td>
		</tr>
	);
}

export default CartTableRow;
