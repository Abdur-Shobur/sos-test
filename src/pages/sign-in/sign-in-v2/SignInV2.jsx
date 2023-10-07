import { useContext, useReducer } from 'react';
import { initialState, reducer } from './action';
import style from './sign-in.module.css';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseAuth } from '../../../auth/AuthContext';
import { http } from '../../../components/action/axiosInstance';
import swal from 'sweetalert';
import { Use_sign_in } from '../../../components/action/signinFun';
import { ClockLoader } from 'react-spinners';
import Input from '../common/Input/Input';
import Logo from '../../../assets/img/LoginLogo.png';

function SignInV2() {
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

	const login_form_handler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setLoad(true);

		http
			.post(`/login`, state.data)
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
							(roleSS === '3' && '/affiliates-dashboard') ||
							(roleSS === '4' && '/user-dashboard')
					);
					setLoad(false);
					return;
				}
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
		<section className={style.loginBg}>
			<div className="layout ">
				<div className={style.layoutBgImg}>
					<div className={style.loginFormBox}>
						<div className={style.LoginImg}>
							<img
								className={style.singleChooseImg}
								src={Logo}
								alt="Choose Us Images"
							/>
						</div>
						<div className={style.loginFromHeading}>
							<h3>Login Your Account</h3>
						</div>

						<form onSubmit={login_form_handler}>
							<Input
								dispatch={dispatch}
								label="Email"
								name="email"
								state={state}
								placeholder="Your Email"
								type="email"
							/>
							<Input
								dispatch={dispatch}
								label="Password"
								name="password"
								state={state}
								placeholder="Your Password"
								type="password"
							/>

							{/* <div className={style.loginReFor}>
								<div className={style.loginRadio}>
									<input type="radio" />
									<p>Remember me</p>
								</div>
								<div>
									<a className={style.forgatPassword} href="#">
										Forgot password?
									</a>
								</div>
							</div> */}
							<div className={style.loginButton}>
								<button
									disabled={load || Object.values(state.error).some((e) => e)}
									type="submit"
									className={style.loginBtn}
								>
									<span>Login</span>
									{load && <ClockLoader color="#fff" size={18} />}{' '}
								</button>
							</div>
							<div className={style.goRegister}>
								<p>
									New here?
									<Link className={style.loginGoRLink} to="/sign-up ">
										Register now
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

export default SignInV2;
