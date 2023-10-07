import style from './Input.module.css';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Input({ type = 'text', name, label, dispatch, state, placeholder }) {
	const [eye, setEye] = useState(false);
	return (
		<div className={style.inputWrap}>
			{type === 'password' && (
				<button
					type="button"
					onClick={() => setEye((e) => !e)}
					className={style.eyeIcon}
				>
					{eye ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
				</button>
			)}
			<label className={style.loginLabel} htmlFor={name}>
				{label} <span>{state.error[name]}</span>
			</label>
			<input
				onChange={(e) => {
					dispatch({
						type: 'INPUT',
						payload: {
							value: e.target.value ? e.target.value.trim() : null,
							name: name,
						},
					});
				}}
				id={name}
				name={name}
				className={`${style.loginInput} ${
					(state?.error?.[name] || state?.resError?.[name]) && style?.error
				}`}
				placeholder={placeholder}
				type={eye ? 'text' : type}
				autoComplete="off"
			/>
		</div>
	);
}

export default Input;
