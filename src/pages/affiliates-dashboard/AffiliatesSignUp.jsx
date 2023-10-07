import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { http } from '../../components/action/axiosInstance';
import tost from '../../components/action/tost';

function AffiliatesSignUp() {
	const [err, setErr] = useState('');
	const navigate = useNavigate();
	// sign up handler
	const handel_sign_up_vendor = async (e) => {
		setErr('');
		e.preventDefault();
		const target = e.target;

		const name = target.vendor_name.value;
		const number = target.vendor_phone_number.value;
		const email = target.vendor_email.value;
		const password = target.password.value;
		const confirm_password = target.confirm_password.value;
		if (password !== confirm_password) {
			setErr('Password Not Match');
			return false;
		}

		const data = {
			name,
			email,
			number,
			password,
		};
		http
			.post(`/affiliator/register`, data)

			.then((res) => {
				navigate(`/affiliates/sign-in`);
			})
			.catch((err) => tost(err.message));

		// const reg_vendor = await fetch(
		// 	`${process.env.REACT_APP_BASE_URL}/affiliator/register`,
		// 	{
		// 		method: 'POST',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify(data),
		// 	}
		// );

		// const response = await reg_vendor.json();

		// if (response.status === 200) {
		// 	swal('Await for Approve!', response.message || '', 'success');
		// 	// navigate('/affiliates');
		// } else {
		// 	swal('Not found!', response.message || '', 'error');
		// }
	};

	return (
		<div className="sign-inup" id="body">
			<div className="container d-flex align-items-center justify-content-center form-height pt-24px pb-24px">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-10">
						<div className="card">
							<div className="card-header bg-primary">
								<div className="ec-brand">
									<a href="index.html" title="Ekka">
										<img
											className="ec-brand-icon"
											src="assets/img/logo/logo-login.png"
											alt=""
										/>
									</a>
								</div>
							</div>
							<div className="card-body p-5">
								<h4 className="text-dark mb-5">Sign Up</h4>

								<form onSubmit={handel_sign_up_vendor}>
									<div className="row">
										<div className="form-group col-md-12 mb-4">
											<input
												type="text"
												className="form-control"
												id="name"
												name="vendor_name"
												placeholder="Name"
											/>
										</div>

										<div className="form-group col-md-12 mb-4">
											<input
												type="text"
												className="form-control"
												name="vendor_email"
												id="vendor_email"
												placeholder="Enter Your Email"
											/>
										</div>
										<div className="form-group col-md-12 mb-4">
											<input
												type="text"
												className="form-control"
												name="vendor_phone_number"
												id="vendor_phone_number"
												placeholder="Enter Phone Number"
											/>
										</div>

										<div className="form-group col-md-12 ">
											<input
												type="password"
												name="password"
												className="form-control"
												id="password"
												placeholder="Password"
											/>
										</div>

										<div className="form-group col-md-12 ">
											<input
												type="password"
												name="confirm_password"
												className="form-control"
												id="cpassword"
												placeholder="Confirm Password"
											/>
										</div>
										<div>
											<p style={{ color: '#d75f5f' }} className="mb-3">
												{err}
											</p>
										</div>

										<div className="col-md-12">
											<div className="d-inline-block mr-3">
												<div className="control control-checkbox">
													<input onChange={''} type="checkbox" />
													<div className="control-indicator"></div>I Agree the
													terms and conditions
												</div>
											</div>

											<button
												type="submit"
												className="btn btn-primary btn-block mb-4"
											>
												Sign Up
											</button>

											<p className="sign-upp">
												Already have an account?
												<Link to="/affiliates/sign-in" className="text-blue">
													Sign in
												</Link>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AffiliatesSignUp;
