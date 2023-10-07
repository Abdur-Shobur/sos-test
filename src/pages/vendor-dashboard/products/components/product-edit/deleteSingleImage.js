import swal from 'sweetalert';
import { http } from '../../../../../components/action/axiosInstance';
import tost from '../../../../../components/action/tost';

export const deleteImageHandler = (payload, refetch) => {
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you will not be able to recover!',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			http
				.delete(`/vendor-delete-image/${payload}`)
				.then((res) => {
					if (res.data.status === 200) {
						tost(res.data.message);
						refetch((pre) => !pre);
					}
				})
				.catch((err) => {
					tost(err.data.message);
				});
		}
	});
};
