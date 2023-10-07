import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { http } from '../../components/action/axiosInstance';
import { Use_sign_in } from '../../components/action/signinFun';
import { USE_USER } from '../../context/UserContext';

function VendorsSignIn() {
	const navigator = useNavigate();
	const { setVendorAuthCheck, setRole } = useContext(USE_USER);
	// login handler
	const login_form_handler = async (e) => {
		e.preventDefault();

		const target = e.target;
		const email = target.email.value;
		const password = target.password.value;

		const data = {
			email,
			password,
		};

		http.post(`/vendor/login`, data).then((res) => {
			if (res.data.status === 200 && res.data.role === 'vendor') {
				Use_sign_in(res);
				setRole('vendor');
				setVendorAuthCheck(true);
				navigator('/vendors-dashboard');
			} else {
				setRole(null);
				swal('Not found!', res.message || '', 'error');
				localStorage.removeItem('token');
			}
		});
	};
	return (
		<div className="sign-inup" id="body">
			<div className="container d-flex align-items-center justify-content-center form-height-login">
				<div className="row justify-content-center">
					<div className="col-lg-6 col-md-10">
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
								<h4 className="text-dark mb-5">Sign In As a Vendor</h4>

								<form onSubmit={login_form_handler}>
									<div className="row">
										<div className="form-group col-md-12 mb-4">
											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												required
												placeholder="Username"
											/>
										</div>

										<div className="form-group col-md-12 ">
											<input
												type="password"
												className="form-control"
												required
												id="password"
												placeholder="Password"
											/>
										</div>

										<div className="col-md-12">
											<div className="d-flex my-2 justify-content-between">
												<div className="d-inline-block mr-3">
													<div className="control control-checkbox">
														Remember me
														<input onChange={''} type="checkbox" />
														<div className="control-indicator"></div>
													</div>
												</div>

												<p>
													<a className="text-blue" href="#">
														Forgot Password?
													</a>
												</p>
											</div>

											<button
												type="submit"
												className="btn btn-primary btn-block mb-4"
											>
												Sign In
											</button>

											<p className="sign-upp">
												Don't have an account yet ?
												<Link to="/vendors/sign-up" className="text-blue">
													Sign Up
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

export default VendorsSignIn;
