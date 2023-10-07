import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const VendorProfileAPI = () => {
	const { data, isLoading, refetch } = useQuery(
		'fetch_vendor_profile_data',
		() => {
			return http.get(`/vendor/profile`);
		},
		{
			staleTime: 500,
		}
	);

	const user = data?.data?.user;
	const res = data?.data;
	return { user, isLoading, refetch, res };
};

export const AffiliateRequestProductView = (id) => {
	const { data, isLoading, refetch } = useQuery(
		['/affiliator/request/product/view/{id}', id],
		() => {
			return http.get(`/affiliator/request/product/view/${id}`);
		}
	);
	const product = data?.data?.product;
	return { product, isLoading, refetch };
};
export const AffiliateActiveRequestProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_affiliator_request_product_active', page, search],
		() => {
			return http.get(
				`/affiliator/request/product/active?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const AffiliateAllRequestProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_affiliator_request_product_all', page, search],
		() => {
			return http.get(
				`/affiliator/request/product/all?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const AffiliatePendingRequestProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_affiliator_request_product_pending', page, search],
		() => {
			return http.get(
				`/affiliator/request/product/pending?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const AffiliateRejectedRequestProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_affiliator_request_product_rejected', page, search],
		() => {
			return http.get(
				`/affiliator/request/product/rejected?page=${page}&search=${search}`
			);
		}
	);
	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const GetActiveDeposit = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_vendor_all_history_active', page, search],
		() => {
			return http.get(
				`/vendor/payment/history/success?page=${page}&search=${search}`
			);
		}
	);
	const history = data?.data?.message;
	return { history, isLoading, refetch };
};
export const GetAllDeposit = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_vendor_all_history', page, search],
		() => {
			return http.get(`/vendor/payment/history?page=${page}&search=${search}`);
		}
	);
	const history = data?.data?.message;
	return { history, isLoading, refetch };
};
export const GetCancelDeposit = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_vendor_all_history_cancel', page, search],
		() => {
			return http.get(
				`/vendor/payment/history/cancel?page=${page}&search=${search}`
			);
		}
	);
	const history = data?.data?.message;
	return { history, isLoading, refetch };
};
export const GetPendingDeposit = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['get_vendor_all_history_pending', page, search],
		() => {
			return http.get(
				`/vendor/payment/history/pending?page=${page}&search=${search}`
			);
		}
	);
	const history = data?.data?.message;
	return { history, isLoading, refetch };
};

export const GetVendorBank = () => {
	const { data, refetch, isLoading } = useQuery(
		['get_admin_bank_in_vendor'],
		() => {
			return http.get(`/vendor/banks`);
		}
	);

	const banks = data?.data?.message;
	return { banks, refetch, isLoading };
};

// order history
export const GetOrderHistoryAll = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_all_orders', page, search],
		() => {
			return http.get(`/vendor/all-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryCancel = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_cancel_orders', page, search],
		() => {
			return http.get(`/vendor/cancel-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryDelivered = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_delivered_orders', page, search],
		() => {
			return http.get(`/vendor/delivered-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryHold = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_hold_orders', page, search],
		() => {
			return http.get(`/vendor/hold-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryPending = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_pending_orders', page, search],
		() => {
			return http.get(`/vendor/pending-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryProgress = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_vendor_progress_orders', page, search],
		() => {
			return http.get(`/vendor/progress-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};

export const GetOrderHistoryViewByID = (id) => {
	const { data, isLoading } = useQuery(
		['get_details_vendor/order_view__data', id],
		() => {
			return http.get(`/vendor/order/view/${id}`);
		}
	);
	const product = data?.data?.message;
	return { product, isLoading };
};

export const GetVendorProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_vendor_product_data', page, search],
		() => {
			return http.get(`/vendor/product?page=${page}&search=${search}`);
		}
	);

	const products = data?.data?.product;
	return { products, isLoading, refetch };
};

export const GetVendorProductActive = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_vendor_active_product_data', page, search],
		() => {
			return http.get(`/vendor/product/active?page=${page}&search=${search}`);
		}
	);

	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const GetVendorProductPending = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_vendor_pending_product_data', page, search],
		() => {
			return http.get(`/vendor/product/pending?page=${page}&search=${search}`);
		}
	);

	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const GetVendorDashboardData = () => {
	const { data, isLoading } = useQuery('/vendor/dashboard-datas', () => {
		return http.get(`/vendor/dashboard-datas`);
	});

	const dashboard = data?.data;
	return { dashboard, isLoading };
};

export const GetVendorOrderVsRevenueChart = () => {
	const { data, isLoading, refetch } = useQuery(
		`/vendor/order-vs-revenue`,
		() => {
			return http.get(`/vendor/order-vs-revenue`);
		}
	);
	const chartData = data?.data;
	return { chartData, isLoading, refetch };
};
export const GetVendorTopSellingProduct = () => {
	const { data, isLoading, refetch } = useQuery(`/vendor/top-ten-items`, () => {
		return http.get(`/vendor/top-ten-items`);
	});
	const product = data?.data?.message;
	return { product, isLoading, refetch };
};
