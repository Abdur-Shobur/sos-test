import React from 'react';
import UserIcon from '../../common/UserIcon';

function UserProfile({ user, from = 'Vendor' }) {
	return (
		<div className="card card-default seller-card mt-2">
			<div className="position-relative card-body text-center">
				<div className="position-absolute">
					<span className="badge rounded-pill bg-primary">{from}</span>
				</div>

				<div className="image mb-3">
					<UserIcon
						image={user?.image}
						className="img-fluid rounded-circle"
						alt="Avatar "
						style={{
							height: '100px',
							objectFit: 'cover',
							width: '100px',
						}}
					/>
				</div>

				<h5 className="text-dark">{user?.name}</h5>

				<ul className="list-unstyled">
					{user?.email && (
						<li className="d-flex mb-1">
							<i className="mdi mdi-email mr-1"></i>
							<span>{user?.email || 'N/A'}</span>
						</li>
					)}
					{user?.number && (
						<li className="d-flex">
							<i className="mdi mdi-whatsapp mr-1"></i>
							<span>{user?.number || 'N/A'}</span>
						</li>
					)}

					{user?.number2 && (
						<li className="d-flex">
							<i className="mdi mdi-whatsapp mr-1"></i>
							<span>{user?.number2 || 'N/A'}</span>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default UserProfile;
