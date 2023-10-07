import swal from 'sweetalert';
import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';

export async function RejectedReasons(id, refetch) {
	return swal('Write Cancel Reason here:', {
		content: 'input',
		buttons: {
			cancel: 'Cancel',
			confirm: 'Rejected',
		},
	}).then((value) => {
		if (value !== null && value !== '') {
			return http
				.post(`/admin/order/update/${id}`, { status: 'cancel', reason: value })
				.then((res) => {
					if (res.data.status === 200) {
						tost(res.data.message);
						refetch();
					}
				})
				.catch((er) => {
					tost(er.message);
				});
		}
	});
}
