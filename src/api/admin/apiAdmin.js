import { useQuery } from "react-query";
import { http } from "../../components/action/axiosInstance";

export const AdminProfileAPI = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_profile_data",
    () => {
      return http.get(`/admin/profile`);
    },
    {
      staleTime: 5000,
    }
  );

  const user = data?.data?.user;
  const res = data?.data;
  return { user, isLoading, refetch, res };
};

export const GetAllWithDraw = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_all_/admin/all-withdraw", page, search],
    () => {
      return http.get(`/admin/all-withdraw?page=${page}&search=${search}`);
    }
  );
  const allReq = data?.data?.message;
  return { allReq, isLoading, refetch };
};
export const GetAllWithDrawSuccess = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_all_/admin/all-withdraw/success", page, search],
    () => {
      return http.get(
        `/admin/all-withdraw/success?page=${page}&search=${search}`
      );
    }
  );
  const allReq = data?.data?.message;
  return { allReq, isLoading, refetch };
};
export const GetAllWithDrawPending = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_all_/admin/all-withdraw/pending", page, search],
    () => {
      return http.get(
        `/admin/all-withdraw/pending?page=${page}&search=${search}`
      );
    }
  );
  const allReq = data?.data?.message;
  return { allReq, isLoading, refetch };
};

// orders
export const GetOrdersAll = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_all_orders", page, search],
    () => {
      return http.get(`/admin/all-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};
export const GetOrdersCancel = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_cancel_orders", page, search],
    () => {
      return http.get(`/admin/cancel-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};
export const GetOrdersDelivered = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_delivered_orders", page, search],
    () => {
      return http.get(`/admin/delivered-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};
export const GetOrdersHold = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_hold_orders", page, search],
    () => {
      return http.get(`/admin/hold-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};
export const GetOrdersPending = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_pending_orders", page, search],
    () => {
      return http.get(`/admin/pending-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};
export const GetOrdersProgress = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["get_admin_progress_orders", page, search],
    () => {
      return http.get(`/admin/progress-orders?page=${page}&search=${search}`);
    }
  );

  const getData = data?.data?.message;
  return { getData, isLoading, refetch };
};

// payment
export const GetAllVendorPaymentsAccept = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_vendor_all_deposit_success_items", page, search],
    () => {
      return http.get(
        `/admin/deposit-history/success?page=${page}&search=${search}`
      );
    }
  );
  const deposit = data?.data?.message;
  return { deposit, isLoading, refetch };
};
export const GetAllVendorPaymentsAll = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_vendor_all_deposit_items", page, search],
    () => {
      return http.get(`/admin/deposit-history?page=${page}&search=${search}`);
    }
  );
  const deposit = data?.data?.message;
  return { deposit, isLoading, refetch };
};
export const GetAllVendorPaymentsPending = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_vendor_all_deposit/pending_items", page, search],
    () => {
      return http.get(
        `/admin/deposit-history/pending?page=${page}&search=${search}`
      );
    }
  );
  const deposit = data?.data?.message;
  return { deposit, isLoading, refetch };
};
export const GetAllVendorPaymentsCancel = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_vendor_all_deposit_pending_items", page, search],
    () => {
      return http.get(
        `/admin/deposit-history/cancel?page=${page}&search=${search}`
      );
    }
  );
  const deposit = data?.data?.message;
  return { deposit, isLoading, refetch };
};

export const GetAdminDashboardData = () => {
  const { data, isLoading } = useQuery(
    `/dashboard-datas`,
    () => {
      return http.get(`/dashboard-datas`);
    },
    {
      staleTime: 500,
    }
  );
  const dashboard = data?.data;
  return { dashboard, isLoading };
};
export const GetAdminRecentOrders10 = () => {
  const { data, isLoading, refetch } = useQuery(`/admin/recent-order`, () => {
    return http.get(`/admin/recent-order`);
  });
  const recentOrders = data?.data?.message;
  return { recentOrders, isLoading, refetch };
};
export const GetAdminOrderVsRevenueChart = () => {
  const { data, isLoading, refetch } = useQuery(
    `/admin/order-vs-revenue`,
    () => {
      return http.get(`/admin/order-vs-revenue`);
    }
  );
  const chartData = data?.data;
  return { chartData, isLoading, refetch };
};
export const GetCategoryByStatic = () => {
  const { data, isLoading, refetch } = useQuery(
    `/admin/category-status`,
    () => {
      return http.get(`/admin/category-status`);
    }
  );
  const categoryStatus = data?.data;
  return { categoryStatus, isLoading, refetch };
};

// admin about page get
export const GetAdminCompanionData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_companion_data",
    () => {
      return http.get("/admin/companion");
    }
  );
  const companionData = data?.data?.data;
  return { companionData, isLoading, refetch };
};

// admin get missin data
export const GetAdminMissionsData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_missions_data",
    () => {
      return http.get("/admin/mission");
    }
  );
  const missionsData = data?.data?.data;
  return { missionsData, isLoading, refetch };
};

// admin get faq data
export const GetAdminFAQData = () => {
  const { data, isLoading, refetch } = useQuery("fetch_admin_faq_data", () => {
    return http.get("admin/faq");
  });
  const faqData = data?.data?.datas;
  return { faqData, isLoading, refetch };
};

// admin get testimonial data
export const GetAdminTestimonialData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_testimonial_data",
    () => {
      return http.get("/admin/testimonial");
    }
  );
  const testimonialData = data?.data?.data;
  return { testimonialData, isLoading, refetch };
};

// admin get members data
export const GetAdminMembersData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_members_data",
    () => {
      return http.get("/admin/member");
    }
  );
  const membersData = data?.data?.data;
  return { membersData, isLoading, refetch };
};

// admin get home services
export const GetAdminServicesData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_services_data",
    () => {
      return http.get("/admin/service");
    }
  );
  const serviceData = data?.data?.data;
  return { serviceData, isLoading, refetch };
};

// admin get home Organization
export const GetAdminOrganizationData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_organization_data",
    () => {
      return http.get("/admin/organization");
    }
  );
  const organizationData = data?.data?.data;
  return { organizationData, isLoading, refetch };
};

// admin get home it service
export const GetAdminItServiceData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_it_services_data",
    () => {
      return http.get("/admin/it-service");
    }
  );
  const itServiceData = data?.data?.data?.data;
  return { itServiceData, isLoading, refetch };
};

// admin get home Organization two
export const GetAdminOrganizationTwoData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_organization_two_data",
    () => {
      return http.get("/admin/organizationTwo");
    }
  );
  const organizationTwoData = data?.data?.data;
  return { organizationTwoData, isLoading, refetch };
};

// admin get home partner
export const GetAdminPartnerData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_partner_data",
    () => {
      return http.get("/admin/partner");
    }
  );
  const partnerData = data?.data?.data;
  return { partnerData, isLoading, refetch };
};

// admin get footer data
export const GetAdminFooterData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_footer_data",
    () => {
      return http.get("/admin/footer-media");
    }
  );
  const footerData = data?.data?.data;
  return { footerData, isLoading, refetch };
};

// get admin setting data
export const GetAdminHomeSettingData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_home_setting_data",
    () => {
      return http.get("/admin/settings");
    }
  );
  const homeData = data?.data?.message[0];
  return { homeData, isLoading, refetch };
};
// get admin setting data

export const GetAdminAdvertiseData = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["fetch_admin_/api/admin/advertise_data", page, search],
    () => {
      return http.get(`/admin/advertise?page=${page}&email=${search}`);
    }
  );

  const advertiserData = data?.data?.message;
  return { advertiserData, refetch, isLoading };
};

// get admin advertiser single data
export const GetAdminAdvertiseDataSingle = (id) => {
  const { data: editData, isLoading } = useQuery(
    ["etch_admin_/api/admin/advertise_data_single", id],
    () => {
      return http.get(`/admin/advertise/${id}`);
    }
  );
  const advertiserData = editData?.data?.product;
  return { advertiserData, isLoading };
};

// get admin contact data
export const GetAdminContactData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_contact_data",
    () => {
      return http.get("/admin/contact-messages");
    }
  );
  const contactData = data?.data?.data;
  return { contactData, isLoading, refetch };
};

// get admin coupon
export const GetAdminCoupon = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_admin_coupon_data", page, search],
    () => {
      return http.get(`/admin/coupons?page=${page}&search=${search}`);
    }
  );
  const couponData = data?.data?.message;
  return { couponData, isLoading, refetch };
};

// get admin coupon user
export const GetAdminCouponUser = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_coupon_user_data",
    () => {
      return http.get("/admin/coupon-users");
    }
  );
  const couponUserData = data?.data?.message;
  return { couponUserData, isLoading, refetch };
};

// get admin category
export const GetAdminCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_supportboxcategory_data",
    () => {
      return http.get("/admin/supportboxcategory");
    }
  );
  const categoryData = data?.data?.message;
  return { categoryData, isLoading, refetch };
};

// get support problem data
export const GetAdminProblemTopic = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_supportproblem-topic_data",
    () => {
      return http.get("/admin/supportproblem-topic");
    }
  );
  const problemTopicData = data?.data?.message;
  return { problemTopicData, isLoading, refetch };
};

// get all supportbox post
export const GetSupportData = (id) => {
  const {
    data: editData,
    isLoading,
    refetch,
  } = useQuery(
    ["fetch_user_support_box", id],
    () => {
      return http.get(`/supportbox/${id}`);
    },
    {
      refetchInterval: 5000,
    }
  );
  const allSupportData = editData?.data?.message;
  return { allSupportData, isLoading, refetch };
};

// get admin support data
export const GetAdminSupportData = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_admin_support_data", page, search],
    () => {
      return http.get(`/admin/supportbox?page=${page}&search=${search}`);
    }
  );
  const problemTopicData = data?.data?.message;
  return { problemTopicData, isLoading, refetch };
};

//get admin support data
export const GetAdminReplyData = (id) => {
  const {
    data: editData,
    isLoading,
    refetch,
  } = useQuery(
    ["fetch_user_support_box", id],
    () => {
      return http.get(`/admin/supportbox/${id}`);
    },
    {
      refetchInterval: 5000,
    }
  );
  const adminReplyData = editData?.data?.message;
  return { adminReplyData, isLoading, refetch };
};

// get admin subscription
export const GetAdminSubscriptionData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_subscription_data",
    () => {
      return http.get("/admin/subscription");
    }
  );
  const subscriptionData = data?.data?.data;
  return { subscriptionData, isLoading, refetch };
};

// get amdin service category
export const GetAdminServiceCategoryData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_category_data",
    () => {
      return http.get("/admin/servicecategory");
    }
  );
  const serviceCategoryData = data?.data;
  return { serviceCategoryData, isLoading, refetch };
};

// get admin service sub category
export const GetAdminServiceSubCategoryData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_sub_category_data",
    () => {
      return http.get("/admin/service-sub-category");
    }
  );
  const serviceSubCategoryData = data?.data;
  return { serviceSubCategoryData, isLoading, refetch };
};

// get admin dollar set
export const GetAdminDollarSetData = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_sub_category_data",
    () => {
      return http.get("/admin/doller-price");
    }
  );
  const dollarAmountData = data?.data?.message;
  return { dollarAmountData, isLoading, refetch };
};

// get admin vendor service
export const GetAdminVendorServiceData = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_admin_sub_category_data", page, search],
    () => {
      return http.get(`/admin/vendor-services?page=${page}&search=${search}`);
    }
  );
  const vendorServiceData = data?.data?.message;
  return { vendorServiceData, isLoading, refetch };
};

// get admin vendor service query by id
export const GetAdminVendorSinlgeServiceData = (id) => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_sub_category_data",
    () => {
      return http.get(`/admin/vendor-services/${id}`);
    }
  );
  const vendorSingleServiceData = data?.data?.message;
  return { vendorSingleServiceData, isLoading, refetch };
};

// get admin category by id
export const GetAdminCategorySinlgeData = (id) => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_category_single_data",
    () => {
      return http.get(`/admin/servicecategory/${id}`);
    }
  );
  const categorySingleData = data?.data?.message;
  return { categorySingleData, isLoading, refetch };
};

// get admin vendor service query by id
export const GetAdminServiceOrder = (page, search) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_admin_service_order_data", page, search],
    () => {
      return http.get(`/admin/customer-orders?page=${page}&search=${search}`);
    }
  );
  const orderServiceData = data?.data?.message;
  return { orderServiceData, isLoading, refetch };
};

// get admin category by id
export const GetAdminSinlgeService = (id) => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_admin_service_order_single_data",
    () => {
      return http.get(`/admin/customer-orders/${id}`);
    }
  );
  const orderSingleData = data?.data?.message;
  return { orderSingleData, isLoading, refetch };
};
