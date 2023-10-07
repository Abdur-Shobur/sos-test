import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { Link, useParams } from "react-router-dom";
import EditLoader from "../../../components/loader/EditLoader";
import style from "./SingleOrder.style.module.css";
import { GetAffiliateSingleOrder } from "../../../api/admin/affiliatesAPI";
import Aos from "aos";
import DeliveryInfo from "./DeliveryInfo";
import PackageInfo from "./PackageInfo";
import ServiceInfo from "./ServiceInfo";

const GetAffiSingleService = () => {
  const id = useParams().id;
  const { orderSingleData, isLoading } = GetAffiliateSingleOrder(id);

  console.log("order", orderSingleData);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Service Order-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Order Details"
          link={{ name: "All Order", path: "/affiliates-dashboard/my-service" }}
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
                You have successfully complete the order!
              </h3>
            )}
            <div className="modal-header px-4">
              <h5 className={style.topHeader} id="exampleModalCenterTitle">
                My Order Detailis
              </h5>
              {orderSingleData?.status === "revision" ||
                (orderSingleData?.status === "progress" && (
                  <button className="btn btn-primary">
                    <Link
                      style={{ color: "white" }}
                      to={`/affiliates-dashboard/my-service/delivery/${orderSingleData?.id}`}
                    >
                      Delivery
                    </Link>
                  </button>
                ))}
            </div>
            <div className="modal-body px-lg-4 px-3">
              <div className="row mb-2">
                <ServiceInfo orderSingleData={orderSingleData} />
                <PackageInfo orderSingleData={orderSingleData} />
                <div className={style.packageInfo}>
                  <h3 className={style.heading}>User Info</h3>
                  <div className={style.gridOption}>
                    <div className={style.infomation}>
                      <h1 className={style.tilte}>Name:</h1>
                      <p className={style.info}>
                        {orderSingleData?.customerdetails?.name}
                      </p>
                    </div>
                    <div className={style.infomation}>
                      <h1 className={style.tilte} id={style.textRight}>
                        Email:
                      </h1>
                      <p className={style.info}>
                        {orderSingleData?.customerdetails?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <DeliveryInfo orderSingleData={orderSingleData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAffiSingleService;
