import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../../components/action/axiosInstance';
import swal from 'sweetalert';
import { UseAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { ClockLoader } from 'react-spinners';

function SignUp() {
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();
	const { setRole, setLoading } = useContext(UseAuth);
	const [check, setChecked] = useState(false);
	const [error, setError] = useState({
		password: null,
		name: null,
		email: null,
		number: null,
		role: null,
	});

	const signUpFormHandler = async (e) => {
		setError(null);
		e.preventDefault();
		setLoad(true);
		const target = e.target;
		const name = target.name.value;
		const email = target.email.value;
		const password = target.password.value;
		const cPassword = target.cPassword.value;
		const number = target.number.value;
		const role = target.role.value;

		if (password !== cPassword) {
			setError({ password: 'Password not match' });
			setLoad(false);
			e.target.cPassword.value = '';
			e.target.password.value = '';
			return;
		}
		if (password === cPassword) {
			const data = {
				name,
				email,
				password,
				role,
				number,
			};
			http.post(`/register`, data).then((res) => {
				if (res.data.status === 401) {
					swal('Wait', res.data.message, 'error');
					setLoad(false);
					return;
				}
				if (res.status === 200 && res.data.validation_errors) {
					setLoad(false);
					let [key, value] = Object.entries(res.data.validation_errors)[0];
					return setError({ [key]: value[0] });
				}
				if (res.data.status === 200 && res.data.user_status === 'pending') {
					const roleSS = res.data.role;
					swal('Please Wait for Activation', res.data.message, 'success');
					setLoading(false);
					setRole(roleSS);
					navigate(
						(roleSS === '2' && '/sign-in') || (roleSS === '3' && '/sign-in')
					);
					e.target.reset();
					setLoad(false);
					return;
				}

				setLoad(false);
			});
		}
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

								<form onSubmit={signUpFormHandler}>
									<div className="row">
										<div className=" mb-2 col-md-12 ">
											<label htmlFor="name">Name: </label>
											<input
												type="text"
												className="form-control"
												id="name"
												name="name"
												placeholder="Name"
											/>

											<p style={{ color: '#ff4b4b', marginTop: '3px' }}>
												{error?.name}
											</p>
										</div>

										<div className=" mb-2 col-md-12 ">
											<label htmlFor="email">Email: </label>

											<input
												type="email"
												className="form-control"
												id="email"
												name="email"
												placeholder="Email"
											/>
											<p style={{ color: '#ff4b4b', marginTop: '3px' }}>
												{error?.email}
											</p>
										</div>
										<div className=" mb-2 col-md-12 ">
											<label htmlFor="number">Number: </label>

											<input
												type="text"
												className="form-control"
												id="number"
												name="number"
												placeholder="Number"
											/>
											<p style={{ color: '#ff4b4b', marginTop: '3px' }}>
												{error?.number}
											</p>
										</div>

										<div className=" mb-2 col-md-12 ">
											<label htmlFor="password">Password: </label>

											<input
												type="password"
												className="form-control"
												id="password"
												name="password"
												placeholder="Password"
											/>
										</div>

										<div className=" mb-2 col-md-12 ">
											<label htmlFor="cPassword">Confirm Password: </label>

											<input
												type="password"
												className="form-control"
												id="cPassword"
												name="cPassword"
												placeholder="Confirm Password"
											/>
											<p style={{ color: '#ff4b4b', marginTop: '3px' }}>
												{error?.password}
											</p>
										</div>

										<div className=" mb-2 col-md-12 ">
											<label htmlFor="">Registration As</label>
											<div className="d-flex  ">
												<div className="form-check ">
													<input
														value={'2'}
														className="form-check-input"
														type="radio"
														name="role"
														id="flexRadioDefault1"
													/>
													<label
														className="form-check-label"
														for="flexRadioDefault1"
													>
														Vendor
													</label>
												</div>
												<div className="form-check ml-5">
													<input
														value={'3'}
														className="form-check-input"
														type="radio"
														name="role"
														id="flexRadioDefault2"
													/>
													<label
														className="form-check-label"
														for="flexRadioDefault2"
													>
														Affiliate
													</label>
												</div>
											</div>
											<p style={{ color: '#ff4b4b', marginTop: '3px' }}>
												{error?.role}
											</p>
										</div>

										<div className="col-md-12">
											<div className="d-inline-block mr-3">
												<div className="form-check">
													<input
														onChange={(e) => setChecked(e.target.checked)}
														className="form-check-input"
														type="checkbox"
														value=""
														id="defaultCheck1"
													/>
													<label
														className="form-check-label"
														for="defaultCheck1"
													>
														I Agree the terms and conditions
													</label>
												</div>
											</div>

											<button
												disabled={load || !check}
												type="submit"
												className="btn btn-primary  d-flex align-items-center justify-content-center"
											>
												<span style={{ marginRight: '2px' }}>Sign Up</span>
												{load && <ClockLoader color="#fff" size={15} />}
											</button>

											<p className="sign-upp">
												Already have an account?
												<Link to="/sign-in">Sign in</Link>
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

export default SignUp;
