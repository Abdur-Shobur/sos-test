import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Aos from "aos";
import AffiRenewOption from "./AffiRenewOption";
import { GetAffiliateSubscriptionRenew } from "../../../api/admin/affiliatesAPI";

const AffiRenew = () => {
  const { subscriptionData, isLoading: subscriptionLoading } =
    GetAffiliateSubscriptionRenew();

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Affiliates Renew-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Renew</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Renew Content
            </p>
          </div>
        </div>
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <AffiRenewOption
                  subscriptions={subscriptionData}
                  subscriptionLoading={subscriptionLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiRenew;
