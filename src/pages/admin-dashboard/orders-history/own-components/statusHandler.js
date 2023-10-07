import { toast } from 'react-toastify';
import { http } from '../../../../components/action/axiosInstance';
import swal from 'sweetalert';
import { RejectedReasons } from './RejectedReasons';

export const status_handler = (id, status, setLoad, refetch) => {
	setLoad(true);
	const updateStatus = async () => {
		return http
			.post(`/admin/order/update/${id}`, { status: status })
			.then((res) => {
				refetch();
				if (res.data.status === 200) {
					toast(res.data.message, {
						position: 'top-right',
						autoClose: 300,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				} else {
					toast(res.data.message, {
						position: 'top-right',
						autoClose: 300,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				}
				setLoad(false);
			})
			.catch((err) => {
				toast(err.data.message, {
					position: 'top-right',
					autoClose: 300,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				setLoad(false);
			});
	};
	if (status === 'cancel') {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				setLoad(false);
				return RejectedReasons(id, refetch);
				// updateStatus();
			}
			setLoad(false);
			return;
		});
	} else {
		return updateStatus();
	}
};
