import style from './Radio.module.css';

function Radio({ txt, time, setTime }) {
	const getTxt = (e) => {
		return e.replace(/_/g, '-').toUpperCase();
	};

	return (
		<div onClick={() => setTime(txt)} className={style.RadioBox}>
			<span className={`${style.radio} ${txt === time && style.active}`}></span>
			<span className={`${style.label} ${txt === time && style.active}`}>
				{getTxt(txt)}
			</span>
		</div>
	);
}

export default Radio;
