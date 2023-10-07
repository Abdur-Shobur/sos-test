import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import tost from '../../../../components/action/tost';

export const updateHandler = async (
	id,
	state,
	setLoading,
	setIsOpen,
	refetch
) => {
	setLoading(true);
	try {
		const res = await http.post(
			`/admin/withdraw-paid/${id}`,
			state,
			multipartConfig
		);
		if (res.data.status === 200) {
			tost(res.data.message);
			refetch();
			setIsOpen(false);
		} else {
			tost(res.data.message);
		}
		setLoading(false);
	} catch (err) {
		setLoading(false);
		tost(err.data.message);
	}
};
