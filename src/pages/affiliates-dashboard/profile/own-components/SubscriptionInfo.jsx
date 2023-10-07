import React from "react";
import { time } from "../../../../components/action/actions";

const SubscriptionInfo = ({ user }) => {
  return (
    <div>
      <h5 className="text-dark">Subscription Information:</h5>
      {user?.usersubscription?.affiliate_request && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Affiliate Request
          </p>
          <p>
            {user?.usersubscription?.affiliate_request === null
              ? "0"
              : user?.usersubscription?.affiliate_request}
          </p>
        </>
      )}
      {user?.usersubscription?.product_approve && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Product Approve
          </p>
          <p>
            {user?.usersubscription?.product_approve === null
              ? "0"
              : user?.usersubscription?.product_approve}
          </p>
        </>
      )}
      {user?.usersubscription?.product_request && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Product Request
          </p>
          <p>
            {user?.usersubscription?.product_request === null
              ? "0"
              : user?.usersubscription?.product_request}
          </p>
        </>
      )}
      {user?.usersubscription?.service_create && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Service Create
          </p>
          <p>
            {user?.usersubscription?.service_create === null
              ? "0"
              : user?.usersubscription?.service_create}
          </p>
        </>
      )}
      {user?.usersubscription?.product_qty && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Product Quantity
          </p>
          <p>
            {user?.usersubscription?.product_qty === null
              ? "0"
              : user?.usersubscription?.product_qty}
          </p>
        </>
      )}
      {user?.usersubscription?.service_qty && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Service Quantity
          </p>
          <p>
            {user?.usersubscription?.service_qty === null
              ? "0"
              : user?.usersubscription?.service_qty}
          </p>
        </>
      )}
      {user?.usersubscription?.expire_date && (
        <>
          <p className="text-dark font-weight-medium pt-24px mb-2">
            Expire Date
          </p>
          <p>
            <span className="time">
              <span>{time(user?.usersubscription?.expire_date).date}</span>
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default SubscriptionInfo;
