import React from 'react';
import user_logo from '../../../../assets/icons/user-icon.webp';

function Profile({ user }) {
	return (
		<div className="ec-disp">
			<div className="text-center widget-profile px-0 border-0">
				<div className="card-img mx-auto rounded-circle">
					<img
						style={{ height: '100%', objectFit: 'cover' }}
						src={
							!user?.image
								? user_logo
								: `${process.env.REACT_APP_IMG_URL}/${user.image}`
						}
						alt="user photos"
					/>
				</div>
				<div className="card-body">
					<h4 className="py-2 text-dark">{user?.name}</h4>
					<p>{user?.email}</p>
					<span className="badge badge-primary my-2">
						Balance: {user?.balance || '00'} TK
					</span>

					<p>
						<span
							className={`badge mt-2 ${
								user.status === 'active' ? 'badge-info' : 'badge-danger'
							}`}
						>
							{user?.status}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Profile;
