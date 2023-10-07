import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';
import { RejectedReasons } from '../own-components/RejectedReasons';
export const active_status_handler = (id, status, setLoading, refetch) => {
	setLoading(true);
	http
		.post(`/affiliator/product-update/${id}`, {
			status: status,
			reason: null,
		})
		.then((e) => {
			if (e.data.status === 200) {
				tost(e.data.message);
				setLoading(false);
			} else {
				setLoading(false);
				tost(e.data.message);
			}

			refetch();
		});
};

export const rejected_status_handler = (id, refetch) => {
	RejectedReasons(id, refetch);
};
