import { useQuery } from "react-query";
import { http } from "../../components/action/axiosInstance";

// 1 get all Affiliates
export const AffiliatesAll = (page, search) => {
  // get affiliates
  const { data, refetch, isLoading } = useQuery(
    ["get_affiliates_all_view", page, search],
    () => {
      return http.get(`/affiliator/view/all?page=${page}&email=${search}`);
    }
  );
  const affiliates = data?.data?.affiliator;
  return { affiliates, refetch, isLoading };
};

// 2 get all Affiliates Pending
export const AffiliatesPending = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_affiliates_pending_view", page, search],
    () => {
      return http.get(`/affiliator/view/pending?page=${page}&email=${search}`);
    }
  );
  const affiliates = data?.data?.affiliator;
  return { affiliates, refetch, isLoading };
};

// 3 get all Affiliates Active
export const AffiliatesActive = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_affiliates_active_view", page, search],
    () => {
      return http.get(`/affiliator/view/active?page=${page}&email=${search}`);
    }
  );
  const affiliates = data?.data?.affiliator;
  return { affiliates, refetch, isLoading };
};

// 4 get all Affiliates By ID
export const GetAffiliatesById = (id) => {
  const { data, isLoading } = useQuery(["edit_affiliate_get_data", id], () => {
    return http.get(`/edit-affiliator/${id}`);
  });
  const affiliator = data?.data?.affiliator;
  return { affiliator, isLoading };
};

// get affiliates coupon
export const GetAffiliateCoupon = () => {
  const { data, isLoading } = useQuery(
    "fetch_affiliates_all_coupon_data",
    () => {
      return http.get("/coupon-lists");
    }
  );
  const affiliatesCoupon = data?.data?.message;
  return { affiliatesCoupon, isLoading };
};

// get affiliate subsciption new option
export const GetAffiliateSubscriptionRenew = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_affiliate_subscription_renew_data",
    () => {
      return http.get("/subscriptions");
    }
  );
  const subscriptionData = data?.data?.data;
  return { subscriptionData, isLoading, refetch };
};

// get affiliates subsciption new option
export const GetAffiliatesAdvertiserData = (page) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_affiliates_advertiser__data", page],
    () => {
      return http.get(`/all-advertise?page=${page}`);
    }
  );
  const advertiserData = data?.data?.message;
  return { advertiserData, isLoading, refetch };
};

// get affiliate advertiser single data
export const GetAffiAdvertiseDataSingle = (id) => {
  const { data: editData, isLoading } = useQuery(
    ["etch_affiliates_/api/advertise", id],
    () => {
      return http.get(`/advertise/${id}`);
    }
  );
  const advertiserData = editData?.data?.message;
  return { advertiserData, isLoading };
};

// get affiliate my service
export const GetAffiAllService = (page) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_affiliates_my_service__data", page],
    () => {
      return http.get(`/service/orders?page=${page}`);
    }
  );
  const serviceAllData = data?.data?.message;
  return { serviceAllData, isLoading, refetch };
};

// get affiliates service single data service order
export const GetAffiliateSingleOrder = (id) => {
  const { data, isLoading } = useQuery(
    ["etch_affiliate_single_order_/api/service/order", id],
    () => {
      return http.get(`/service/orders/view/${id}`);
    }
  );
  const orderSingleData = data?.data?.message;
  return { orderSingleData, isLoading };
};
