import React from "react";
import style from "./SingleOrder.style.module.css";
import { TableStatus } from "../../../components/table/TableComponents";

const ServiceInfo = ({ orderSingleData }) => {
  return (
    <div className={style.serviceInfo}>
      <h3 className={style.heading}>Order Info</h3>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Title:</h1>
        <p className={style.info}>{orderSingleData?.servicedetails?.title}</p>
      </div>
      <div className={style.gridOption}>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Amount:</h1>
          <p className={style.info}>{parseInt(orderSingleData?.amount)} TK</p>
        </div>
        <div className={style.infomation}>
          <h1 className={style.tilte}>Commision:</h1>
          <p className={style.info} id={style.middleAlign}>
            {parseInt(orderSingleData?.commission_amount)} TK
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
          <p className={style.info}>
            <TableStatus
              status={orderSingleData?.status}
              text={orderSingleData?.status}
            />
          </p>
        </div>
      </div>
      <div className={style.infomation}>
        <h1 className={style.tilte}>Details:</h1>
        <p className={style.info}>{orderSingleData?.details}</p>
      </div>
      <div className={style.infomation}>
        <label className={style.tilte}>Images:</label>
        {orderSingleData?.files?.map((e, i) => (
          <img
            key={i}
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "10px",
              marginRight: "10px",
            }}
            src={`${process.env.REACT_APP_IMG_URL}/${e.name}`}
            alt="Delivery Images"
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceInfo;
