/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Style from './Register.style.module.css';
import Input from '../common/Input/Input';
import { useReducer } from 'react';
import { initialState, reducer } from './action';
import { useState } from 'react';
import { useContext } from 'react';
import { http } from '../../../components/action/axiosInstance';
import swal from 'sweetalert';
import Logo from '../../../assets/img/LoginLogo.png';
import { UseAuth } from '../../../auth/AuthContext';
import RoleButton from './RoleButton';
import { ClockLoader } from 'react-spinners';
import { Use_sign_in } from '../../../components/action/signinFun';

function RegisterV2() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();
	const { setRole, setLoading } = useContext(UseAuth);
	const location = useLocation();
	const nextUrl = location?.state?.from.pathname || '/';
	const roleIds = ['1', '2', '3', '4'];

	if (
		localStorage.getItem('token') &&
		roleIds.includes(localStorage.getItem('role'))
	)
		return navigate(nextUrl);

	const signUpFormHandler = async (e) => {
		e.preventDefault();
		setLoad(true);

		if (state.data.name === null || state.data.name === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					name: ['Name Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}
		if (state.data.email === null || state.data.email === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					email: ['Email Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}
		if (state.data.number === null || state.data.number === '') {
			dispatch({
				type: 'API_ERROR',
				payload: {
					number: ['Number Field is Required!'],
				},
			});
			setLoad(false);
			return;
		}

		if (
			state.data.password === null ||
			state.data.password === '' ||
			state.data.c_password === null ||
			state.data.c_password === '' ||
			state.data.c_password !== state.data.password
		) {
			dispatch({
				type: 'PASSWORD_MATCH',
			});
			setLoad(false);
			return;
		}
		setLoading(true);

		http
			.post(`/register`, state.data)
			.then((res) => {
				if (res.data.status === 401) {
					swal('Wait', res.data.message, 'error');
					setLoad(false);
					return;
				}
				if (res.status === 200 && res.data.validation_errors) {
					setLoad(false);
					// let [key, value] = Object.entries(res.data.validation_errors);

					dispatch({
						type: 'API_ERROR',
						payload: res.data.validation_errors,
					});

					// return setError({ [key]: value[0] });
				}
				if (res.data.status === 200 && res.data.user_status === 'active') {
					const roleSS = res.data.role;
					setLoading(false);
					setRole(roleSS);
					Use_sign_in(res);
					navigate(
						(roleSS === '1' && '/') ||
							(roleSS === '2' && '/vendors-dashboard') ||
							(roleSS === '3' && '/affiliates-dashboard') ||
							(roleSS === '4' && '/user-dashboard')
					);
					e.target.reset();
					setLoad(false);
					return;
				}

				setLoading(false);
				setLoad(false);
			})
			.catch((err) => {
				setLoad(false);
				swal('Wait', err.message, 'error');
			});
		setLoading(false);
		dispatch({
			type: 'RESET',
		});

		e.target.reset();
	};

	return (
		<section className={Style.loginBg}>
			<div className="layout ">
				<div className={Style.layoutBgImg}>
					<div className={Style.loginFormBox}>
						<div className={Style.LoginImg}>
							<img
								className={Style.singleChooseImg}
								src={Logo}
								alt="Choose Us Images"
							/>
						</div>
						<div className={Style.loginFromHeading}>
							<h3>Create an Account Create Own Startup</h3>
						</div>
						<form onSubmit={signUpFormHandler} action="">
							<Input
								dispatch={dispatch}
								label={
									<span>
										Name{' '}
										<span
											style={{
												color: '#ff5353',
												top: '20px',
												left: '0',
												position: 'absolute',
												fontSize: '12px',
											}}
										>
											{state.resError.name && state.resError.name[0]}
											{state.error.name && 'Name Is required !'}
										</span>
									</span>
								}
								name="name"
								state={state}
								placeholder="Your Name"
							/>

							<div className={Style.loignTabBox}>
								<p className={Style.loginP}>Register as,</p>
							</div>
							<div className={Style.userItemsBox}>
								<RoleButton dispatch={dispatch} state={state} label="User" />
								<RoleButton dispatch={dispatch} state={state} label="Vendor" />
								<RoleButton
									dispatch={dispatch}
									state={state}
									label="Affiliate"
								/>
							</div>
							{/* <div className={Style.loginReFor}>
                                <div className={Style.loginRadio}>
                                    <input type="radio"/>
                                    <p>Remember me</p>
                                </div>
                                <div>
                                    <a className={Style.forgatPassword} href="#">Forgot password?</a>
                                </div>
                            </div> */}
							<div className={Style.registerFormFildWP}>
								<div className="w-100">
									<Input
										dispatch={dispatch}
										label={
											<span>
												Email{' '}
												<span
													style={{
														color: '#ff5353',
														top: '20px',
														left: '0',
														position: 'absolute',
														fontSize: '12px',
													}}
												>
													{state.resError.email && state.resError.email[0]}
													{state.error.email && 'Email Is required !'}
												</span>
											</span>
										}
										name="email"
										state={state}
										placeholder="example@gmail.com"
										type="email"
									/>
								</div>
								<div className="w-100">
									<Input
										dispatch={dispatch}
										label={
											<span>
												Number{' '}
												<span
													style={{
														color: '#ff5353',
														top: '20px',
														left: '0',
														position: 'absolute',
														fontSize: '12px',
													}}
												>
													{state.resError.number && state.resError.number[0]}
													{state.error.number && 'Number Is required !'}
												</span>
											</span>
										}
										name="number"
										state={state}
										placeholder="Your Number"
									/>
								</div>
							</div>

							<div className={Style.registerFormFildWP}>
								<Input
									dispatch={dispatch}
									label={
										<span>
											Password{' '}
											<span
												style={{
													color: '#ff5353',
													top: '20px',
													left: '0',
													position: 'absolute',
													fontSize: '12px',
												}}
											>
												{state.resError.password && state.resError.password[0]}
												{!state.password_match && 'Password Not Match'}
												{state.error.password && 'Password Is required !'}
											</span>
										</span>
									}
									name="password"
									state={state}
									placeholder="******"
									type="password"
								/>
								<Input
									dispatch={dispatch}
									label={
										<span>
											Confirm Password{' '}
											<span
												style={{
													color: '#ff5353',
													top: '20px',
													left: '0',
													position: 'absolute',
													fontSize: '12px',
												}}
											>
												{!state.password_match && 'Password Not Match'}
												{state.error.c_password &&
													'Confirm Password Is required !'}
											</span>
										</span>
									}
									name="c_password"
									state={state}
									placeholder="******"
									type="password"
								/>
							</div>
							<div className={Style.checkboxWrapper}>
								<div class={`form-check ${Style.CheckBox}`}>
									<input
										class={`form-check-input ${Style.checkInput}`}
										type="checkbox"
										value=""
										id="flexCheckDefault"
										onChange={(e) =>
											dispatch({
												type: 'INPUT',
												payload: {
													name: 'agree',
													value: e.target.checked,
												},
											})
										}
									/>
									<label
										className="form-check-label mb-0"
										for="flexCheckDefault"
									>
										I agree to all of <a href="#">terms & conditions</a>
									</label>
								</div>
							</div>

							<div className={Style.loginButton}>
								<button
									disabled={load || Object.values(state.error).some((e) => e)}
									type="submit"
									className={Style.loginBtn}
								>
									<span>Register Now</span>
									{load && <ClockLoader color="#fff" size={18} />}{' '}
								</button>
							</div>
							<div className={Style.goRegister}>
								<p>
									Already have an account?{' '}
									<Link className={Style.loginGoRLink} to="/sign-in">
										Log in
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RegisterV2;
