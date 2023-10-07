import { http } from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';

export const statusChangeAmount = (id, payload, setLoad, refetch) => {
	http
		.post(`/admin/deposit-history/${id}`, { status: payload })
		.then((res) => {
			if (res.data.status === 200) {
				tost(res.data.message);
				refetch();
			}
			setLoad(false);
		})
		.catch((er) => {
			setLoad(false);
			tost(er.message);
		});
};
