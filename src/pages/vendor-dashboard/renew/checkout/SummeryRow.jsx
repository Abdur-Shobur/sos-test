import style from "./summery.module.css";

function SummeryRow({ pp, text }) {
  return (
    <div className={style.summeryRow}>
      <div className={style.left}>
        <h1 className={style.title}>{text?.h}</h1>
        <p className={style.subTitle}>{text?.p}</p>
      </div>
      <div className={style.right}>
        <p className={style.pp}>{pp}</p>
      </div>
    </div>
  );
}

export default SummeryRow;
