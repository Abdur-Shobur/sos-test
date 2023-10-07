import swal from 'sweetalert';

export const DeletePopUP = async (cb) => {
	return swal({
		title: 'Are you sure?',
		text: 'Deleted, you will not be able to recover',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			return cb();
		}
	});
};
