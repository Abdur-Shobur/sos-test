import React from "react";
import style from "./SingleOrder.style.module.css";
import { downloadImage, time } from "../../../components/action/actions";
import { FiDownload } from "react-icons/fi";

const DeliveryInfo = ({ orderSingleData }) => {
 
  return (
    <div className={style.packageInfo}>
      <h3 className={style.heading}>Delivery Info</h3>
      {orderSingleData?.orderdelivery?.length ? (
        orderSingleData?.orderdelivery?.map((e, i) => (
          <div key={i} className={style.delivaryDetails}>
            <h2 className={style.deliveryHeader}>Delivery {i + 1}:</h2>
            <div className={style.gridOption}>
              <div className={style.infomation}>
                <h1 className={style.tilte}>Date:</h1>
                <p className={style.info}>{time(e?.created_at).date}</p>
              </div>
              <div className={style.infomation}>
                <h1 className={style.tilte} id={style.textRight}>
                  Time:
                </h1>
                <p className={style.info}>
                  <p className={style.info}>{time(e?.created_at).time}</p>
                </p>
              </div>
            </div>
            <div className={style.infomation}>
              <h1 className={style.tilte}>Document</h1>
              {e?.deliveryfiles[0]?.files.endsWith("jpg") ||
              e?.deliveryfiles[0]?.files.endsWith("png") ||
              e?.deliveryfiles[0]?.files.endsWith("jpeg") ? (
                <div className={style.deliveryAll}>
                  {e?.deliveryfiles?.map((file, i) => (
                    <div key={i} className={style.deliveryImg}>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "10px",
                        }}
                        src={`${process.env.REACT_APP_IMG_URL}/${file?.files}`}
                        alt="Delivery Images"
                      />
                      <FiDownload
                        onClick={() => downloadImage(file?.files)}
                        className={style.downloadIcon}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={style.deliveryAll}>
                  {e?.deliveryfiles?.map((file, i) => (
                    <div key={i} className={style.deliveryImg}>
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "10px",
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                        alt="Delivery Images"
                      />
                      <FiDownload
                        onClick={() => downloadImage(file?.files)}
                        className={style.downloadIcon}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={style.infomation}>
              <h1 className={style.tilte}>Description</h1>
              <p className={style.info}>{e?.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ marginTop: "10px" }}>Not yet delivery</p>
      )}
    </div>
  );
};

export default DeliveryInfo;