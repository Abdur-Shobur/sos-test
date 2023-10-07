import { useQuery } from "react-query";
import { http } from "../../components/action/axiosInstance";

// 4 get all Affiliates By ID
export const GetAllVendorById = (id) => {
  const { data, isLoading } = useQuery(
    ["fetch_vendor-profile-view_data", id],
    () => {
      return http.get(`/edit-vendor/${id}`);
    }
  );

  const vendorData = data?.data?.vendor;
  return { vendorData, isLoading };
};

// get support category
export const GetAdminCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_supportboxcategory_data",
    () => {
      return http.get("admin/supportboxcategory");
    }
  );
  const categoryData = data;
  console.log("cateogry data", categoryData);
  return { categoryData, isLoading, refetch };
};

// get vendor service category
export const GetServiceCategorySubCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_service-category-subcategory",
    () => {
      return http.get("/service-category-subcategory");
    }
  );
  const serviceCategoryData = data?.data?.message;
  return { serviceCategoryData, isLoading, refetch };
};

// get sub category
export const GetVendorServiceSubCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_vendor_sub_category_data",
    () => {
      return http.get("/vendor/service-sub-category");
    }
  );
  const serviceSubCategoryData = data?.data?.message;
  return { serviceSubCategoryData, isLoading, refetch };
};

// get category
export const GetAllTicketCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_all_ticketcategory_data",
    () => {
      return http.get("/all-ticket-category");
    }
  );
  const allTicketCategoryData = data?.data?.message;
  return { allTicketCategoryData, isLoading, refetch };
};

// get vendor all support
export const GetAllSupport = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_all_supportbox_data", page, search],
    () => {
      return http.get(`/supportbox?page=${page}&search=${search}`);
    }
  );
  const supportData = data?.data?.message;
  return { supportData, isLoading, refetch };
};

// get vendor category and sub category
export const GetVendorCategoryAndSub = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_service-category-subcategory_data",
    () => {
      return http.get("/service-category-subcategory");
    }
  );
  const categoryAndSubData = data?.data?.message;
  return { categoryAndSubData, isLoading, refetch };
};

// get vendor service
export const GetVendorServiceData = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_/main-services_data", page, search],
    () => {
      return http.get(`/main-services?page=${page}&search=${search}`);
    }
  );
  const serviceData = data?.data?.message;
  return { serviceData, isLoading, refetch };
};

// get vendor single service
export const GetVendorSingleServiceData = (id) => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_/main-services_single_data__",
    () => {
      return http.get(`/main-services/${id}`);
    }
  );
  const serviceSingleData = data?.data?.message;
  return { serviceSingleData, isLoading, refetch };
};

// get vendor all coupon
export const GetVendorAllCoupon = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_vendor_all_coupon_data",
    () => {
      return http.get("/coupon-lists");
    }
  );
  const couponData = data?.data?.message;
  return { couponData, isLoading, refetch };
};

// get vendor subscrioption
export const GetVendorBuySubscription = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_vendor_subscription_data",
    () => {
      return http.get("/subscriptions");
    }
  );
  const subscriptionData = data?.data?.data;
  return { subscriptionData, isLoading, refetch };
};

// get vendor subsciption new option
export const GetVendorSubscriptionRenew = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_vendor_subscription_renew_data",
    () => {
      return http.get("/subscriptions");
    }
  );
  const subscriptionData = data?.data?.data;
  return { subscriptionData, isLoading, refetch };
};

// get vendor subsciption new option
export const GetVendorAdvertiserData = (page) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_vendor_advertiser__data", page],
    () => {
      return http.get(`/all-advertise?page=${page}`);
    }
  );
  const advertiserData = data?.data?.message;
  return { advertiserData, isLoading, refetch };
};

// get vendor advertiser single data
export const GetVendorAdvertiseDataSingle = (id) => {
  const { data: editData, isLoading } = useQuery(
    ["fetch_vendor_/api/advertise", id],
    () => {
      return http.get(`/advertise/${id}`);
    }
  );
  const advertiserData = editData?.data?.message;
  return { advertiserData, isLoading };
};

// get vendor service order my order
export const GetVendorOrderData = (page) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_vendor_order__data", page],
    () => {
      return http.get(`/service/order?page=${page}`);
    }
  );
  const orderData = data?.data?.message;
  return { orderData, isLoading, refetch };
};

// get vendor advertiser single data my order
export const GetVendorSingleOrder = (id) => {
  const { data, isLoading, refetch } = useQuery(
    ["etch_vendor_single_order_/api/service/myorder", id],
    () => {
      return http.get(`/service/myorders/${id}`);
    }
  );
  const orderSingleData = data?.data?.message;
  return { orderSingleData, isLoading, refetch };
};
