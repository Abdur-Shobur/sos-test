import React from 'react';
import style from './style.module.css';
function NotFound() {
	return (
		<div class={style.container}>
			<h1 className={style.firstFour}>4</h1>
			<div className={style.cogWheel1}>
				<div className={style.cog1}>
					<div className={style.top}></div>
					<div className={style.down}></div>
					<div className={style.leftTop}></div>
					<div className={style.leftDown}></div>
					<div className={style.rightTop}></div>
					<div className={style.rightDown}></div>
					<div className={style.left}></div>
					<div className={style.right}></div>
				</div>
			</div>

			<div className={style.cogWheel2}>
				<div className={style.cog2}>
					<div className={style.top}></div>
					<div className={style.down}></div>
					<div className={style.leftTop}></div>
					<div className={style.leftDown}></div>
					<div className={style.rightTop}></div>
					<div className={style.rightDown}></div>
					<div className={style.left}></div>
					<div className={style.right}></div>
				</div>
			</div>
			<h1 className={style.secondFour}>4</h1>
			<p className={style.wrongPara}>Uh Oh! Page not found!</p>
		</div>
	);
}

export default NotFound;
