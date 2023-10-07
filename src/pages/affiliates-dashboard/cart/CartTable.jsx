import { GetCart } from '../../../api/affiliate/apiAffiliate';
import { NoDataFound } from '../../../components/table/TableComponents';
import CartTableRow from './CartTableRow';

function CartTable() {
	const { product, refetch } = GetCart();
	return (
		<table
			id="responsive-data-table"
			className="table"
			style={{ width: '100%' }}
		>
			<thead>
				<tr>
					<th>Sr.</th>
					<th>Product</th>
					<th>Price</th>
					<th>Per Commission</th>
					<th>Qty</th>
					<th>Income</th>
					<th>Date</th>
					<th>Action</th>
					<th>Checkout</th>
				</tr>
			</thead>

			<tbody style={{ verticalAlign: 'middle' }}>
				{product?.length > 0 ? (
					product?.map((e, i) => (
						<CartTableRow key={e.id} data={e} i={i} refetch={refetch} />
					))
				) : (
					<NoDataFound />
				)}
			</tbody>
		</table>
	);
}

export default CartTable;
