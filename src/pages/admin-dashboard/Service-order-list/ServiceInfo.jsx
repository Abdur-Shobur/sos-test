import React from "react";
import style from "./SingleOrder.style.module.css";

const ServiceInfo = ({ orderSingleData }) => {
  return (
    <div className={style.serviceInfo}>
      <h3 className={style.heading}>Service Info</h3>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Title:</h1>
        <p className={style.info}>{orderSingleData?.servicedetails?.title}</p>
      </div>
      <div className={style.gridOption}>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Amount:</h1>
          <p className={style.info}>{orderSingleData?.amount}</p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Commision:</h1>
          <p className={style.info} id={style.middleAlign}>
            {orderSingleData?.commission_amount}
          </p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Type:</h1>
          <p className={style.info} id={style.middleAlign}>
            {orderSingleData?.commission_type}
          </p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte} id={style.textRight}>
            Status:
          </h1>
          <p className={style.info}>{orderSingleData?.status}</p>
        </div>
      </div>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Details:</h1>
        <p className={style.info}>{orderSingleData?.details}</p>
      </div>
    </div>
  );
};

export default ServiceInfo;
