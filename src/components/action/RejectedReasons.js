import { http } from './axiosInstance';
import swal from 'sweetalert';
import tost from './tost';

export async function RejectedReasons(id, refetch) {
	return swal('Write Rejected Reason here:', {
		content: 'input',
		buttons: {
			cancel: true,
			confirm: 'Confirm',
		},
	}).then((value) => {
		if (value !== null) {
			http
				.post(`/admin-product-status-update/${id}`, {
					rejected_details: value,
					status: 'rejected',
				})
				.then((res) => {
					if (res.data.status === 200) {
						tost('Rejected Successfully');
						refetch();
					}
				});
		}
	});
}
