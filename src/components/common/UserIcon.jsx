import user_pic from '../../assets/img/user/user.png';

function UserIcon({ image, ...rest }) {
	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<img
			src={image ? `${process.env.REACT_APP_IMG_URL}/${image}` : user_pic}
			{...rest}
		/>
	);
}

export default UserIcon;
