import { DeletePopUP } from '../action/DeletePopUP';
import { http } from '../action/axiosInstance';
import tost from '../action/tost';

export const deleteData = (id, refetch, path) => {
	const del = () =>
		http.delete(path + id).then((res) => {
			tost(res.data.message);
			refetch();
		});
	return DeletePopUP(del);
};
