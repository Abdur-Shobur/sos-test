import { useQuery } from 'react-query';
import { http } from '../../components/action/axiosInstance';

export const AffiliateProfileAPI = () => {
	const { data, isLoading, refetch, isError } = useQuery(
		'fetch_affiliator_profile_data',
		() => {
			return http.get(`/affiliator/profile`);
		},
		{
			staleTime: 500,
		}
	);
	const res = data?.data;
	const user = data?.data?.user;
	return { user, isLoading, refetch, res };
};

export const VendorProductViewByAffiliate = (id) => {
	const { data, isLoading } = useQuery(['get_details_product_data', id], () => {
		return http.get(`/single/product/${id}`);
	});
	const product = data?.data?.product;
	return { product, isLoading };
};

export const OrderViewAffiliateProduct = (id) => {
	const { data, isLoading } = useQuery(
		['get_details_affiliator/order/_view__data', id],
		() => {
			return http.get(`/affiliator/order/view/${id}`);
		}
	);
	const product = data?.data?.message;
	return { product, isLoading };
};

export const GetCart = () => {
	const { data, refetch } = useQuery(['get_add_to_cart_data'], () => {
		return http.get(`/cart`);
	});
	const product = data?.data?.cart;
	return { product, refetch };
};

export const GetCartItemByID = (id) => {
	const { data, isLoading } = useQuery(
		['get_checkout_product_single_data', id],
		() => {
			return http.get(`/affiliator/cat/${id}`);
		}
	);
	const cartData = data?.data;
	return { cartData, isLoading };
};

export const GetAvailableIncome = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_affiliator_balance_history_success', page, search],
		() => {
			return http.get(
				`/affiliator/balance/history/success?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetBalanceHistory = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_affiliator_balance_history', page, search],
		() => {
			return http.get(
				`/affiliator/balance/history?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetBalanceHistoryPending = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_affiliator_balance_history_pending', page, search],
		() => {
			return http.get(
				`/affiliator/balance/history/pending?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};

export const AffiliatorGetAdminBank = () => {
	const { data, refetch, isLoading, isFetching } = useQuery(
		['get_admin_bank_in_/affiliator'],
		() => {
			return http.get(`/affiliator/banks`);
		}
	);
	const banks = data?.data?.message;
	return { banks, isFetching, isLoading, refetch };
};

export const GetAllWithdraw = (page, url) => {
	const { data: w, refetch } = useQuery(
		['/affiliator/all-withdraw', page, url],
		() => {
			return http.get(`${url}?page=${page}`);
		}
	);

	const allRequest = w?.data?.message;
	return { allRequest, refetch };
};

export const GetOrderHistoryAll = (page, search) => {
	const { data, isLoading, refetch } = useQuery(
		['get_affiliator_all_orders', page, search],
		() => {
			return http.get(`/affiliator/all-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading, refetch };
};
export const GetOrderHistoryCancel = (page, search) => {
	const { data, isLoading } = useQuery(
		['OrderHistoryCancelAffiliator', page, search],
		() => {
			return http.get(
				`/affiliator/cancel-orders?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading };
};
export const GetOrderHistoryDelivered = (page, search) => {
	const { data, isLoading } = useQuery(
		['get_affiliator_delivered_orders', page, search],
		() => {
			return http.get(
				`/affiliator/delivered-orders?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading };
};
export const GetOrderHistoryHold = (page, search) => {
	const { data, isLoading } = useQuery(
		['get_affiliator_hold_orders', page, search],
		() => {
			return http.get(`/affiliator/hold-orders?page=${page}&search=${search}`);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading };
};
export const GetOrderHistoryPending = (page, search) => {
	const { data, isLoading } = useQuery(
		['get_affiliator_pending_orders', page, search],
		() => {
			return http.get(
				`/affiliator/pending-orders?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading };
};
export const GetOrderHistoryProgress = (page, search) => {
	const { data, isLoading } = useQuery(
		['get_affiliator_progress_orders', page, search],
		() => {
			return http.get(
				`/affiliator/progress-orders?page=${page}&search=${search}`
			);
		}
	);

	const getData = data?.data?.message;
	return { getData, isLoading };
};
export const GetActiveProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_/affiliator/request/active/product_data', page, search],
		() => {
			return http.get(
				`/affiliator/request/active/product?page=${page}&search=${search}`
			);
		}
	);

	const products = data?.data?.active;
	return { products, isLoading, refetch };
};
export const GetAllProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_/affiliator/products_data', page, search],
		() => {
			return http.get(`/affiliator/products?page=${page}&search=${search}`);
		}
	);

	const products = data?.data?.product;
	return { products, isLoading, refetch };
};
export const GetPendingProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_/affiliator/request/pending/product_data', page, search],
		() => {
			return http.get(
				`/affiliator/request/pending/product?page=${page}&search=${search}`
			);
		}
	);

	const products = data?.data?.pending;
	return { products, isLoading, refetch };
};
export const GetRejectedProduct = (page, search) => {
	const { data, refetch, isLoading } = useQuery(
		['fetch_/affiliator/request/rejected/product_data', page, search],
		() => {
			return http.get(
				`/affiliator/request/reject/product?page=${page}&search=${search}`
			);
		}
	);

	const products = data?.data?.pending;
	return { products, isLoading, refetch };
};

export const GetAffiliateDashboardData = () => {
	const { data, isLoading } = useQuery('/affiliator/dashboard-datas', () => {
		return http.get(`/affiliator/dashboard-datas`);
	});

	const dashboard = data?.data;
	return { dashboard, isLoading };
};
export const GetAffiliateOrderVsRevenueChart = () => {
	const { data, isLoading } = useQuery('/affiliator/order-vs-comission', () => {
		return http.get(`/affiliator/order-vs-comission`);
	});

	const chartData = data?.data;
	return { chartData, isLoading };
};
