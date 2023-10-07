import swal from 'sweetalert';
import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';

export async function RejectedReasons(id, refetch) {
	return swal('Write Rejected Reason here:', {
		content: 'input',
		buttons: {
			cancel: true,
			confirm: 'Confirm',
		},
	}).then((value) => {
		if (value !== null && value.trim() !== '') {
			http
				.post(`/affiliator/product-update/${id}`, {
					reason: value,
					status: '3',
				})
				.then((res) => {
					if (res.data.status === 200) {
						tost('Rejected Successfully');
						refetch();
					} else {
						tost(res?.data?.message);
						refetch();
					}
				});
		}
	});
}
