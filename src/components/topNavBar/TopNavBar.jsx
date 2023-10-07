/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import user_pic from '../../assets/img/user/user.png';
import { UseAuth } from '../../auth/AuthContext';
// import { USE_USER } from '../../context/UserContext';

function TopNavBar({ setSidebar, from, user, res }) {
	let path;
	let adminProfile = '/admin/profile';
	let vendorProfile = '/vendors-dashboard/profile';
	let affiliateProfile = '/affiliates-dashboard/profile';
	let userProfile = '/user-dashboard/profile';
	if (from === 'admin') {
		path = adminProfile;
	} else if (from === 'vendor') {
		// eslint-disable-next-line no-unused-expressions
		path = vendorProfile;
	} else if (from === 'affiliate') {
		// eslint-disable-next-line no-unused-expressions
		path = affiliateProfile;
	} else {
		path = userProfile;
	}

	const { logout, logoutLoading } = useContext(UseAuth);
	if (res?.message === 'Account is not active') {
		logout();
	}
	return (
		<header className="ec-main-header" id="header">
			<nav className="navbar navbar-static-top navbar-expand-lg">
				{/* <!-- Sidebar toggle button --> */}
				<button onClick={() => setSidebar((e) => !e)} id="sidebar-toggler">
					<svg
						width="30"
						height="23"
						viewBox="0 0 30 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M30 1.15C30 1.7825 29.4375 2.3 28.75 2.3H1.25C0.5625 2.3 0 1.7825 0 1.15C0 0.5175 0.5625 0 1.25 0H28.75C29.4375 0 30 0.5175 30 1.15ZM8.75 20.7H1.25C0.5625 20.7 0 21.2175 0 21.85C0 22.4825 0.5625 23 1.25 23H8.75C9.4375 23 10 22.4825 10 21.85C10 21.2175 9.4375 20.7 8.75 20.7ZM18.75 10.35H1.25C0.5625 10.35 0 10.8675 0 11.5C0 12.1325 0.5625 12.65 1.25 12.65H18.75C19.4375 12.65 20 12.1325 20 11.5C20 10.8675 19.4375 10.35 18.75 10.35Z"
							fill="#3A3A3A"
						/>
					</svg>
				</button>
				{/* <!-- search form --> */}
				<div className="search-form d-lg-inline-block  "></div>

				{/* <!-- navbar right --> */}
				<div className="navbar-right">
					<ul className="nav navbar-nav">
						{/* notification  */}

						{from !== 'admin' && (
							<h3>
								<span className="badge rounded-pill badge-success">
									৳ {user?.balance || '00'}
								</span>
							</h3>
						)}

						{/* <!-- User Account --> */}
						<li className="dropdown user-menu">
							<button
								// onClick={() => setPorfile_dropDown((e) => !e)}
								type="button"
								className="dropdown-toggle dropdown-toggle-split nav-link ec-drop"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								data-display="static"
							>
								<img
									src={
										user?.image
											? `${process.env.REACT_APP_IMG_URL}/${user?.image}`
											: user_pic
									}
									className="user-image"
									alt="User Images"
								/>
							</button>

							<div>
								<p
									style={{
										textAlign: 'center',
										marginRight: '12px',
										textTransform: 'capitalize',
										marginTop: '3px',
										padding: '0 5px',
									}}
								>
									{user?.name?.split(' ')[0]}
								</p>
							</div>
							<ul
								className={`dropdown-menu dropdown-menu-right ec-dropdown-menu  `}
							>
								{/* <!-- User image --> */}
								<li className="dropdown-header">
									<div className="d-flex">
										<img
											src={
												user?.image
													? `${process.env.REACT_APP_IMG_URL}/${user?.image}`
													: user_pic
											}
											className="img-circle"
											alt="User Images"
										/>
										<div>
											<p
												style={{
													textTransform: 'capitalize',
												}}
											>
												{user?.name}
											</p>
											<p className="mt-1">
												<span className="badge badge-primary">
													{user?.status}
												</span>
											</p>
										</div>
									</div>
								</li>
								<li>
									<Link to={path}>
										<i className="mdi mdi-account"></i> My Profile
									</Link>
								</li>

								{/* <li className="right-sidebar-in">
									<Link to={path}>
										<i className="mdi mdi-settings-outline"></i> Setting
									</Link>
								</li> */}
								<li className="dropdown-footer">
									<button
										onClick={() => logout()}
										disabled={logoutLoading}
										className="w-100 text-start"
									>
										<a href="#">
											<i className="mdi mdi-logout"></i> Log Out{' '}
										</a>
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default TopNavBar;
