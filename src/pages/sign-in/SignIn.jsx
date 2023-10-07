import React, { useContext } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import swal from 'sweetalert';

import { UseAuth } from '../../auth/AuthContext';
import { http } from '../../components/action/axiosInstance';
import { Use_sign_in } from '../../components/action/signinFun';
import { useState } from 'react';
import { ClockLoader } from 'react-spinners';
import Credential from './Credential';

function SignIn() {
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();
	const { setRole, setLoading } = useContext(UseAuth);
	const location = useLocation();
	const nextUrl = location?.state?.from.pathname || '/';
	const roleIds = ['1', '2', '3'];

	if (
		localStorage.getItem('token') &&
		roleIds.includes(localStorage.getItem('role'))
	)
		return navigate(nextUrl);

	const login_form_handler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setLoad(true);
		const target = e.target;
		const email = target.email.value;
		const password = target.password.value;

		const data = {
			email,
			password,
		};

		http
			.post(`/login`, data)
			.then((res) => {
				if (res.data.status === 401) {
					setLoad(false);
					swal('Wait', res.data.message, 'error');
					return;
				}
				if (res.data.status === 200) {
					const roleSS = res.data.role;
					setLoading(false);
					setRole(roleSS);
					Use_sign_in(res);
					navigate(
						(roleSS === '1' && '/') ||
							(roleSS === '2' && '/vendors-dashboard') ||
							(roleSS === '3' && '/affiliates-dashboard')
					);
					setLoad(false);
					return;
				}
			})
			.catch((err) => {
				setLoad(false);
				swal('Wait', err.message, 'error');
			});

		e.target.reset();
	};
	const credential = [
		{
			id: 1,
			title: 'Admin',
			email: 'admin@gmail.com',
			password: '123456',
		},
		{
			id: 2,
			title: 'Vendor',
			email: 'vendor@gmail.com',
			password: '123456789',
		},
		{
			id: 3,
			title: 'Affiliate',
			email: 'affiliate@gmail.com',
			password: '123456789',
		},
	];

	return (
		<div className="sign-inup" id="body">
			<div className="container d-flex align-items-center justify-content-center form-height-login">
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-10">
						<div className="card">
							<div className="card-header bg-primary">
								<div className="ec-brand">
									<Link to="/sign-in" title="SOS">
										<img
											className="ec-brand-icon"
											src="assets/img/logo/logo-login.png"
											alt=""
										/>
									</Link>
								</div>
							</div>
							<div className="card-body p-5">
								<h4 className="text-dark mb-5">Sign In</h4>

								<form onSubmit={login_form_handler}>
									<div className="row">
										<div className="form-group col-md-12 mb-3">
											<label htmlFor="email">Email:</label>
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												required
												placeholder="Email"
											/>
										</div>

										<div className="form-group col-md-12 ">
											<label htmlFor="email">Password:</label>
											<input
												type="password"
												className="form-control"
												required
												id="password"
												placeholder="Password"
											/>
										</div>

										<div className="col-md-12">
											{/* <div className="d-flex my-2 justify-content-between">
												<div className="d-inline-block mr-3">
													<div className="control control-checkbox">
														Remember me
														<input type="checkbox" />
														<div className="control-indicator"></div>
													</div>
												</div>

												<p>
													<a className="text-blue" href="/">
														Forgot Password?
													</a>
												</p>
											</div> */}

											<button
												disabled={load}
												type="submit"
												className="btn btn-primary  mt-3 mb-2 d-flex align-items-center justify-content-center"
											>
												<span style={{ marginRight: '2px' }}>Sign In</span>
												{load && <ClockLoader color="#fff" size={15} />}
											</button>

											<p className="sign-upp">
												Don't have an account yet ?
												<Link to="/sign-up">Sign Up</Link>
											</p>
										</div>
									</div>
								</form>
								<div>
									{credential.map((c) => (
										<Credential
											key={c.id}
											data={c}
											// copied={copied}
											// click_button_handler={click_button_handler}
											// copy_data={copy_data}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
