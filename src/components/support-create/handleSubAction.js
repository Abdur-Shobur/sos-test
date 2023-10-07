import swal from 'sweetalert';
import { http, multipartConfig } from '../action/axiosInstance';
import tost from '../action/tost';

export const HandleSubmitData = async (
	e,
	setLoading,
	state,
	dispatch,
	navigate,
	path
) => {
	setLoading(true);

	try {
		const data = await http.post(`/supportbox`, state.data, multipartConfig);
		if (data?.data?.data !== 'success') {
			tost(data?.data?.errors?.name[0]);
			if (data?.data?.message === 'Validation errors') {
				const errors = data?.data?.data;
				console.log(errors);
				const validationError = {
					subject: errors['subject'] ? errors['subject'] : null,
					support_box_category_id: errors['support_box_category_id']
						? errors['support_box_category_id']
						: null,
					support_problem_topic_id: errors['support_problem_topic_id']
						? errors['support_problem_topic_id']
						: null,
					description: errors['description'] ? errors['description'] : null,
				};
				dispatch({
					type: 'VALIDATION_ERROR',
					payload: validationError,
				});
				setLoading(false);
				return;
			}
		} else if (data?.data?.data === 'success') {
			navigate(path);
			tost(data?.data?.message);
			dispatch({ type: 'RESET' });
		}
	} catch (error) {
		setLoading(false);
		swal('Error', error.message, 'error');
	}
	setLoading(false);
};
