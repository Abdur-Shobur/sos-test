import React from "react";
import style from "./SingleOrder.style.module.css";

const PackageInfo = ({ orderSingleData }) => {
  const dummyDiv = document.createElement("div");
  dummyDiv.innerHTML = orderSingleData?.packagedetails?.package_description;
  const description = dummyDiv.textContent;
  return (
    <div className={style.packageInfo}>
      <h3 className={style.heading}>Package Info</h3>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Title:</h1>
        <p className={style.info}>
          {orderSingleData?.packagedetails?.package_title}
        </p>
      </div>{" "}
      <div className={style.gridOption}>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Price:</h1>
          <p className={style.info}>
            {parseInt(orderSingleData?.packagedetails?.price)} TK
          </p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Time:</h1>
          <p className={style.info} id={style.middleAlign}>
            {orderSingleData?.packagedetails?.time} Days
          </p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Revision:</h1>
          <p className={style.info} id={style.middleAlign}>
            {orderSingleData?.packagedetails?.revision_max_time} Times
          </p>
        </div>
      </div>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Description:</h1>
        <p className={style.info}>{description}</p>
      </div>
    </div>
  );
};

export default PackageInfo;
