import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GetAdminSubscriptionData } from "../../../../api/admin/apiAdmin";
import SubscriptionOption from "./SubscriptionOption";
import Aos from "aos";

const GetSubscription = () => {
  const { subscriptionData, isLoading: subscriptionLoading } =
    GetAdminSubscriptionData();

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin Subscription-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Subscription</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Subscription Content
            </p>
          </div>
        </div>
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <SubscriptionOption
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

export default GetSubscription;
