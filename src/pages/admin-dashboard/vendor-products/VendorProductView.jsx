import React from 'react';
import { useParams } from 'react-router-dom';
import { GetVendorProductById } from '../../../api/admin/vendorsProductAPI';
import ProductView from '../../../components/product-view/ProductView';
import { http } from '../../../components/action/axiosInstance';
import tost from '../../../components/action/tost';
import { RejectedReasons } from '../../../components/action/RejectedReasons';
import { DeletePopUP } from '../../../components/action/DeletePopUP';

function VendorProductView() {
	const { id = 5 } = useParams();

	const { product, isLoading, refetch } = GetVendorProductById(id);
	const active_status_handler = (id, status) => {
		if (status === 'rejected') {
			return RejectedReasons(id, refetch);
		}
		if (status === 'delete') {
			const del = () =>
				http.delete(`/delete-product/${id}`).then((res) => {
					tost(res.data.messaage);
					refetch();
				});
			return DeletePopUP(del);
		} else
			http
				.post(`/admin-product-status-update/${id}`, { status: status })
				.then((res) => {
					if (res.data.status === 200) {
						tost(res.data.messaage);
						refetch();
					}
				});
	};
	return (
		<div className="content">
			<ProductView
				product={product}
				isLoading={isLoading}
				from="admin"
				refetch={refetch}
				active_status_handler={active_status_handler}
			/>
		</div>
	);
}

export default VendorProductView;
