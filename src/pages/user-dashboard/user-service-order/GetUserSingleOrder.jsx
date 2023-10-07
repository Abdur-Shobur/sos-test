import React from "react";
import { Helmet } from "react-helmet";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { GetVendorSingleOrder } from "../../../api/admin/vendorApi";
import { useParams } from "react-router-dom";
import EditLoader from "../../../components/loader/EditLoader";
import style from "./SingleOrder.style.module.css";
import DeliveryInfo from "./DeliveryInfo";
import PackageInfo from "./PackageInfo";
import { useEffect } from "react";
import Aos from "aos";

const GetUserSingleOrder = () => {
  const id = useParams().id;
  const { orderSingleData, isLoading, refetch } = GetVendorSingleOrder(id);
  // console.log("order 43434", orderSingleData);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Order Details-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Order Details"
          link={{ name: "All Order", path: "/user/orders" }}
        />
        {isLoading ? (
          <EditLoader />
        ) : (
          <div
            data-aos="fade"
            style={{ maxWidth: "1200px", margin: "20px auto" }}
            className="ec-cat-form shadow p-lg-4 p-0"
          >
            {orderSingleData?.status === "success" && (
              <h3
                style={{
                  textAlign: "center",
                  color: "green",
                  fontSize: "28px",
                }}
              >
                Order successfully completed!
              </h3>
            )}
            <div className="modal-header px-4">
              <h5 className={style.topHeader} id="exampleModalCenterTitle">
                My Order Detailis
              </h5>
            </div>
            <div className="modal-body px-lg-4 px-3">
              <div className="row mb-2">
                <div className={style.serviceInfo}>
                  <h3 className={style.heading}>Order Info</h3>
                  <div className={style.infomation}>
                    <h1 className={style.tilte}>Title:</h1>
                    <p className={style.info}>
                      {orderSingleData?.servicedetails?.title}
                    </p>
                  </div>
                  <div className={style.gridOption}>
                    <div className={style.infomation}>
                      <h1 className={style.tilte}>Amount:</h1>
                      <p className={style.info}>{orderSingleData?.amount} TK</p>
                    </div>
                    <div className={style.infomation}>
                      <h1 className={style.tilte}>Commision:</h1>
                      <p className={style.info} id={style.middleAlign}>
                        {orderSingleData?.commission_amount} TK
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
                  <div className={style.infomation}>
                    <label className={style.tilte}>Images:</label>
                    {orderSingleData?.files?.map((e) => (
                      <img
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "10px",
                        }}
                        src={`${process.env.REACT_APP_IMG_URL}/${e.name}`}
                        alt="Order delivery Images"
                      />
                    ))}
                  </div>
                </div>
                <PackageInfo orderSingleData={orderSingleData} />
                {orderSingleData?.orderdelivery?.length > 0 && (
                  <DeliveryInfo
                    orderSingleData={orderSingleData}
                    refetch={refetch}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetUserSingleOrder;
