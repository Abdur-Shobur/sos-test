import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-in/SignUp';
import PrivateRoutes from './PrivateRoutes';
import MainLayout from '../layouts/MainLayout';
import VendorLayout from '../layouts/VendorLayout';
import AffiliatesLayout from '../layouts/AffiliatesLayout';
import ThreeDots from '../components/loader/ThreeDots';
import NotFound from '../pages/404/NotFound';

const AllDeposit = lazy(() =>
	import('../pages/vendor-dashboard/diposit/AllDeposit')
);
const AffiliateBalanceHistory = lazy(() =>
	import('../pages/affiliates-dashboard/income/AffiliateBalanceHistory')
);

const AdminDashboard = lazy(() =>
	import('../pages/admin-dashboard/AdminDashboard')
);
const Affiliates = lazy(() =>
	import('../pages/admin-dashboard/affiliates/AllAffiliates')
);
const AffiliatesEdit = lazy(() =>
	import('../pages/admin-dashboard/affiliates/AffiliatesEdit')
);
const Brand = lazy(() => import('../pages/admin-dashboard/brand/Brand'));
const AdminProfile = lazy(() =>
	import('../pages/admin-dashboard/profile/AdminProfile')
);
const Reviews = lazy(() => import('../pages/admin-dashboard/review/Reviews'));
const VendorEdit = lazy(() =>
	import('../pages/admin-dashboard/vendor/VendorEdit')
);
const AffiliatesDashboard = lazy(() =>
	import('../pages/affiliates-dashboard/AffiliatesDashboard')
);

const AddToCart = lazy(() =>
	import('../pages/affiliates-dashboard/cart/AddToCart')
);
const ActiveDetails = lazy(() =>
	import('../pages/affiliates-dashboard/products/ActiveProduct/ActiveDetails')
);
const PendingDetails = lazy(() =>
	import('../pages/affiliates-dashboard/products/PendingProduct/PendingDetails')
);
const ProductDetailsAll = lazy(() =>
	import('../pages/affiliates-dashboard/products/allProducts/ProductDetailsAll')
);
const AffiliatesProfile = lazy(() =>
	import('../pages/affiliates-dashboard/profile/AffiliatesProfile')
);

const VendorsDashboard = lazy(() =>
	import('../pages/vendor-dashboard/VendorsDashboard')
);
const VendorProductAdd = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorProductAdd')
);
const VendorProductEdit = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorProductEdit')
);
const VendorProductList = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorProductList')
);
const Color = lazy(() =>
	import('../pages/vendor-dashboard/utility/color/Color')
);
const EditColor = lazy(() =>
	import('../pages/vendor-dashboard/utility/color/EditColor')
);
const EditSize = lazy(() =>
	import('../pages/vendor-dashboard/utility/size/EditSize')
);
const Size = lazy(() => import('../pages/vendor-dashboard/utility/size/Size'));
const AdminAddNewAffiliates = lazy(() =>
	import('../pages/admin-dashboard/affiliates/AdminAddNewAffiliates')
);
const BrandAdd = lazy(() => import('../pages/admin-dashboard/brand/BrandAdd'));
const BrandEdit = lazy(() =>
	import('../pages/admin-dashboard/brand/BrandEdit')
);
const SubCategory = lazy(() =>
	import('../pages/admin-dashboard/category/SubCategory/SubCategory')
);
const SubCategoryEdit = lazy(() =>
	import('../pages/admin-dashboard/category/SubCategory/SubCategoryEdit')
);
const MainCategory = lazy(() =>
	import('../pages/admin-dashboard/category/mainCategory/MainCategory')
);
const MainCategoryEdit = lazy(() =>
	import('../pages/admin-dashboard/category/mainCategory/MainCategoryEdit')
);
const AdminAddNewVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor/AdminAddNewVendor')
);
const Checkout = lazy(() =>
	import('../pages/affiliates-dashboard/checkout/Checkout')
);
const CheckPermission = lazy(() => import('./CheckPermission'));
// const PrivateRoutes = lazy(() => import('./PrivateRoutes'));
const ActiveVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor/ActiveVendor')
);
const PendingVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor/PendingVendor')
);
const ActiveAffiliates = lazy(() =>
	import('../pages/admin-dashboard/affiliates/ActiveAffiliates')
);
const PendingAffiliates = lazy(() =>
	import('../pages/admin-dashboard/affiliates/PendingAffiliates')
);
const View = lazy(() => import('../pages/admin-dashboard/view-profile/View'));
const AllProductsVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor-products/AllProductsVendor')
);
const ActiveProductsVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor-products/ActiveProductsVendor')
);
const PendingProductsVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor-products/PendingProductsVendor')
);
const AllRequestAffiliate = lazy(() =>
	import('../pages/admin-dashboard/affiliates-products/AllRequestAffiliate')
);
const ActiveRequestAffiliate = lazy(() =>
	import('../pages/admin-dashboard/affiliates-products/ActiveRequestAffiliate')
);
const PendingRequestAffiliate = lazy(() =>
	import('../pages/admin-dashboard/affiliates-products/PendingRequestAffiliate')
);
const VendorBrand = lazy(() =>
	import('../pages/vendor-dashboard/brand/VendorBrand')
);
const VendorBrandAdd = lazy(() =>
	import('../pages/vendor-dashboard/brand/VendorBrandAdd')
);
const VendorBrandEdit = lazy(() =>
	import('../pages/vendor-dashboard/brand/VendorBrandEdit')
);
const VendorActiveProduct = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorActiveProduct')
);
const VendorPendingProduct = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorPendingProduct')
);
const VendorProfileView = lazy(() =>
	import('../pages/admin-dashboard/vendor/VendorProfileView')
);
const AffiliatesProfileView = lazy(() =>
	import('../pages/admin-dashboard/affiliates/AfiiliatesProfileView')
);
const RejectedProductsVendor = lazy(() =>
	import('../pages/admin-dashboard/vendor-products/RejectedProductsVendor')
);
const VendorProductView = lazy(() =>
	import('../pages/admin-dashboard/vendor-products/VendorProductView')
);
const VendorRejectedProduct = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorRejectedProduct')
);
const VendorProductPreview = lazy(() =>
	import('../pages/vendor-dashboard/products/VendorProductPreview')
);
const AffiliateAllRequest = lazy(() =>
	import('../pages/vendor-dashboard/affiliate-requested/AffiliateAllRequest')
);
const AffiliateActiveRequest = lazy(() =>
	import('../pages/vendor-dashboard/affiliate-requested/AffiliateActiveRequest')
);
const AffiliatePendingRequest = lazy(() =>
	import(
		'../pages/vendor-dashboard/affiliate-requested/AffiliatePendingRequest'
	)
);
const AffiliateRejectedRequest = lazy(() =>
	import(
		'../pages/vendor-dashboard/affiliate-requested/AffiliateRejectedRequest'
	)
);
const OrderHistoryAll = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryAll')
);
const OrderHistoryPending = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryPending')
);
const OrderHistoryProgress = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryProgress')
);
const OrderHistoryDelivered = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryDelivered')
);
const OrderHistoryCancel = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryCancel')
);
const AdminOrderHistoryAll = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryAll')
);
const AdminOrderHistoryPending = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryPending')
);
const AdminOrderHistoryProgress = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryProgress')
);
const AdminOrderHistoryDelivered = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryDelivered')
);
const AdminOrderHistoryCancel = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryCancel')
);
const VendorOrderHistoryCancel = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryCancel')
);
const VendorOrderHistoryDelivered = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryDelivered')
);
const VendorOrderHistoryProgress = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryProgress')
);
const VendorOrderHistoryPending = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryPending')
);
const VendorOrderHistoryAll = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryAll')
);
const VendorProfile = lazy(() =>
	import('../pages/vendor-dashboard/profile/VendorProfile')
);
const AllProductAffiliate = lazy(() =>
	import('../pages/affiliates-dashboard/products/AllProductAffiliate')
);
const ActiveProductAffiliate = lazy(() =>
	import('../pages/affiliates-dashboard/products/ActiveProductAffiliate')
);
const PendingProductAffiliate = lazy(() =>
	import('../pages/affiliates-dashboard/products/PendingProductAffiliate')
);
const Vendors = lazy(() =>
	import('../pages/admin-dashboard/vendor/AllVendors')
);
const ViewRequestProduct = lazy(() =>
	import('../pages/admin-dashboard/affiliates-products/ViewRequestProduct')
);
const RejectedRequestAffiliate = lazy(() =>
	import(
		'../pages/admin-dashboard/affiliates-products/RejectedRequestAffiliate'
	)
);
const AffiliateRequestView = lazy(() =>
	import('../pages/vendor-dashboard/affiliate-requested/AffiliateRequestView')
);
const AdminOrderHistoryView = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryView')
);
const VendorOrderHistoryView = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryView')
);
const AffiliateOrderHistoryView = lazy(() =>
	import(
		'../pages/affiliates-dashboard/orders-history/AffiliateOrderHistoryView'
	)
);
const VendorOrderHistoryHold = lazy(() =>
	import('../pages/vendor-dashboard/orders-history/VendorOrderHistoryHold')
);
const AdminOrderHistoryHold = lazy(() =>
	import('../pages/admin-dashboard/orders-history/AdminOrderHistoryHold')
);
const OrderHistoryHold = lazy(() =>
	import('../pages/affiliates-dashboard/orders-history/OrderHistoryHoldAfi')
);
const PaymentVendorAll = lazy(() =>
	import('../pages/admin-dashboard/vendor-payment/PaymentVendorAll')
);
const PaymentVendorPending = lazy(() =>
	import('../pages/admin-dashboard/vendor-payment/PaymentVendorPending')
);
const PaymentVendorAccept = lazy(() =>
	import('../pages/admin-dashboard/vendor-payment/PaymentVendorAccept')
);
const PaymentAffiliateAll = lazy(() =>
	import('../pages/admin-dashboard/affiliate-payment/PaymentAffiliateAll')
);
const PaymentAffiliatePending = lazy(() =>
	import('../pages/admin-dashboard/affiliate-payment/PaymentAffiliatePending')
);
const PaymentAffiliateCancel = lazy(() =>
	import('../pages/admin-dashboard/affiliate-payment/PaymentAffiliateCancel')
);
const PaymentVendorCancel = lazy(() =>
	import('../pages/admin-dashboard/vendor-payment/PaymentVendorCancel')
);
const PaymentAffiliateClear = lazy(() =>
	import('../pages/admin-dashboard/affiliate-payment/PaymentAffiliateClear')
);
const DepositBalance = lazy(() =>
	import('../pages/vendor-dashboard/diposit/DepositBalance')
);
const CancelDeposit = lazy(() =>
	import('../pages/vendor-dashboard/diposit/CancelDeposit')
);
const AcceptDeposit = lazy(() =>
	import('../pages/vendor-dashboard/diposit/AcceptDeposit')
);
const PendingDeposit = lazy(() =>
	import('../pages/vendor-dashboard/diposit/PendingDeposit')
);
const AffiliateAvailableIncome = lazy(() =>
	import('../pages/affiliates-dashboard/income/AffiliateAvailableIncome')
);
const AffiliatePendingIncome = lazy(() =>
	import('../pages/affiliates-dashboard/income/AffiliatePendingIncome')
);
const AffiliateWithdrawIncome = lazy(() =>
	import('../pages/affiliates-dashboard/income/AffiliateWithdrawIncome')
);

const route = createBrowserRouter([
	// admin  sing in sing up
	{
		path: '/',
		element: (
			<React.Suspense
				fallback={
					<div className="d-flex justify-content-center align-items-center h-100 w-100">
						<ThreeDots />
					</div>
				}
			>
				<PrivateRoutes>
					<CheckPermission roleID="1">
						<MainLayout />
					</CheckPermission>
				</PrivateRoutes>
			</React.Suspense>
		),
		children: [
			{
				path: '/admin-dashboard',
				element: <AdminDashboard />,
			},
			{
				path: '/admin/view/:id',
				element: <View />,
			},
			{
				path: '/admin/vendors/all-vendors',
				element: <Vendors />,
			},
			{
				path: '/admin/vendors/add-new',
				element: <AdminAddNewVendor />,
			},
			{
				path: '/admin/vendors/active-vendor',
				element: <ActiveVendor />,
			},
			{
				path: '/admin/vendors/pending-vendor',
				element: <PendingVendor />,
			},
			{
				path: '/admin/edit-vendors/:id',
				element: <VendorEdit />,
			},
			{
				path: '/admin/vendor-profile-view/:id',
				element: <VendorProfileView />,
			},
			{
				path: '/admin/all-affiliates',
				element: <Affiliates />,
			},
			{
				path: '/admin/add-new-affiliates',
				element: <AdminAddNewAffiliates />,
			},
			{
				path: '/admin/active-affiliates',
				element: <ActiveAffiliates />,
			},
			{
				path: '/admin/pending-affiliates',
				element: <PendingAffiliates />,
			},
			{
				path: '/admin/edit-affiliates/:id',
				element: <AffiliatesEdit />,
			},
			{
				path: '/admin/affiliates-profile-view/:id',
				element: <AffiliatesProfileView />,
			},
			{
				path: '/admin/main-category',
				element: <MainCategory />,
			},
			{
				path: '/admin/edit-main-category/:id',
				element: <MainCategoryEdit />,
			},
			{
				path: '/admin/sub-category',
				element: <SubCategory />,
			},
			{
				path: '/admin/edit-sub-category/:id',
				element: <SubCategoryEdit />,
			},

			{
				path: '/admin/vendor-product-list',
				element: <AllProductsVendor />,
			},
			{
				path: '/admin/vendor-active-product',
				element: <ActiveProductsVendor />,
			},
			{
				path: '/admin/vendor-pending-product',
				element: <PendingProductsVendor />,
			},
			{
				path: '/admin/vendor-rejected-product',
				element: <RejectedProductsVendor />,
			},
			{
				path: '/admin/vendor-product-preview/:id',
				element: <VendorProductView />,
			},
			{
				path: '/admin/affiliate-product-request',
				element: <AllRequestAffiliate />,
			},
			{
				path: '/admin/affiliate-active-request',
				element: <ActiveRequestAffiliate />,
			},
			{
				path: '/admin/affiliate-pending-request',
				element: <PendingRequestAffiliate />,
			},
			{
				path: '/admin/affiliate-rejected-request',
				element: <RejectedRequestAffiliate />,
			},
			{
				path: '/admin/affiliate-view-request-product/:id',
				element: <ViewRequestProduct />,
			},

			{
				path: '/admin/orders-history-all',
				element: <AdminOrderHistoryAll />,
			},
			{
				path: '/admin/orders-history-pending',
				element: <AdminOrderHistoryPending />,
			},
			{
				path: '/admin/orders-history-progress',
				element: <AdminOrderHistoryProgress />,
			},
			{
				path: '/admin/orders-history-delivered',
				element: <AdminOrderHistoryDelivered />,
			},
			{
				path: '/admin/orders-history-cancel',
				element: <AdminOrderHistoryCancel />,
			},
			{
				path: '/admin/orders-history-hold',
				element: <AdminOrderHistoryHold />,
			},
			{
				path: '/admin/orders-history-view/:id',
				element: <AdminOrderHistoryView />,
			},
			{
				path: '/admin/vendor-payment-all',
				element: <PaymentVendorAll />,
			},
			{
				path: '/admin/vendor-payment-accept',
				element: <PaymentVendorAccept />,
			},

			{
				path: '/admin/vendor-payment-pending',
				element: <PaymentVendorPending />,
			},
			{
				path: '/admin/vendor-payment-cancel',
				element: <PaymentVendorCancel />,
			},
			{
				path: '/admin/affiliate-payment-all',
				element: <PaymentAffiliateAll />,
			},
			{
				path: '/admin/affiliate-payment-clear',
				element: <PaymentAffiliateClear />,
			},
			{
				path: '/admin/affiliate-payment-pending',
				element: <PaymentAffiliatePending />,
			},
			{
				path: '/admin/affiliate-payment-cancel',
				element: <PaymentAffiliateCancel />,
			},

			{
				path: '/review-list',
				element: <Reviews />,
			},
			{
				path: '/admin/brand-list',
				element: <Brand />,
			},
			{
				path: '/admin/brand-list/add',
				element: <BrandAdd />,
			},
			{
				path: '/admin/brand-list/edit/:id',
				element: <BrandEdit />,
			},
			{
				path: 'profile',
				element: <AdminProfile />,
			},
		],
	},

	// admin  sing in sing up
	{
		path: '/sign-in',
		element: <SignIn />,
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},

	// vendor routes

	{
		path: '/',
		element: (
			<React.Suspense
				fallback={
					<div className="d-flex justify-content-center align-items-center h-100 w-100">
						<ThreeDots />
					</div>
				}
			>
				<PrivateRoutes>
					<CheckPermission roleID="2">
						<VendorLayout />
					</CheckPermission>
				</PrivateRoutes>
			</React.Suspense>
		),
		children: [
			{
				path: '/vendors-dashboard',
				element: <VendorsDashboard />,
			},
			{
				path: '/vendors-dashboard/product-add',
				element: <VendorProductAdd />,
			},
			{
				path: '/vendors-dashboard/product-edit/:id',
				element: <VendorProductEdit />,
			},
			{
				path: '/vendors-dashboard/product-list/all',
				element: <VendorProductList />,
			},
			{
				path: '/vendors-dashboard/product-list/active',
				element: <VendorActiveProduct />,
			},
			{
				path: '/vendors-dashboard/product-list/pending',
				element: <VendorPendingProduct />,
			},
			{
				path: '/vendors-dashboard/product-list/rejected',
				element: <VendorRejectedProduct />,
			},
			{
				path: '/vendors-dashboard/product-list/:id',
				element: <VendorProductPreview />,
			},
			{
				path: '/vendors-dashboard/affiliate-all-requested',
				element: <AffiliateAllRequest />,
			},
			{
				path: '/vendors-dashboard/affiliate-active-requested',
				element: <AffiliateActiveRequest />,
			},
			{
				path: '/vendors-dashboard/affiliate-pending-requested',
				element: <AffiliatePendingRequest />,
			},
			{
				path: '/vendors-dashboard/affiliate-rejected-requested',
				element: <AffiliateRejectedRequest />,
			},
			{
				path: '/vendors-dashboard/affiliate-requested-view-product/:id',
				element: <AffiliateRequestView />,
			},
			{
				path: '/vendors-dashboard/orders-history-all',
				element: <VendorOrderHistoryAll />,
			},
			{
				path: '/vendors-dashboard/orders-history-pending',
				element: <VendorOrderHistoryPending />,
			},
			{
				path: '/vendors-dashboard/orders-history-progress',
				element: <VendorOrderHistoryProgress />,
			},
			{
				path: '/vendors-dashboard/orders-history-delivered',
				element: <VendorOrderHistoryDelivered />,
			},
			{
				path: '/vendors-dashboard/orders-history-cancel',
				element: <VendorOrderHistoryCancel />,
			},
			{
				path: '/vendors-dashboard/orders-history-hold',
				element: <VendorOrderHistoryHold />,
			},
			{
				path: '/vendors-dashboard/orders-history-view/:id',
				element: <VendorOrderHistoryView />,
			},
			{
				path: '/vendors-dashboard/balance-deposit',
				element: <DepositBalance />,
			},
			{
				path: '/vendors-dashboard/all-deposit',
				element: <AllDeposit />,
			},
			{
				path: '/vendors-dashboard/cancel-deposit',
				element: <CancelDeposit />,
			},
			{
				path: '/vendors-dashboard/accept-deposit',
				element: <AcceptDeposit />,
			},
			{
				path: '/vendors-dashboard/pending-deposit',
				element: <PendingDeposit />,
			},
			{
				path: '/vendors-dashboard/profile',
				element: <VendorProfile />,
			},
			{
				path: '/vendors-dashboard/size',
				element: <Size />,
			},
			{
				path: '/vendors-dashboard/edit-size/:id',
				element: <EditSize />,
			},
			{
				path: '/vendors-dashboard/color',
				element: <Color />,
			},
			{
				path: '/vendors-dashboard/edit-color/:id',
				element: <EditColor />,
			},
			{
				path: '/vendors-dashboard/brand',
				element: <VendorBrand />,
			},
			{
				path: '/vendors-dashboard/add',
				element: <VendorBrandAdd />,
			},
			{
				path: '/vendors-dashboard/edit/:id',
				element: <VendorBrandEdit />,
			},
		],
	},

	// affiliates layout
	{
		path: '/',
		element: (
			<React.Suspense
				fallback={
					<div className="d-flex justify-content-center align-items-center h-100 w-100">
						<ThreeDots />
					</div>
				}
			>
				<PrivateRoutes>
					<CheckPermission roleID="3">
						<AffiliatesLayout />
					</CheckPermission>
				</PrivateRoutes>
			</React.Suspense>
		),
		children: [
			{
				path: '/affiliates-dashboard',
				element: <AffiliatesDashboard />,
			},
			{
				path: '/affiliates-dashboard/all-product',
				element: <AllProductAffiliate />,
			},
			{
				path: '/affiliates-dashboard/all-product-details/:id',
				element: <ProductDetailsAll />,
			},
			{
				path: '/affiliates-dashboard/active-product-details/:id',
				element: <ActiveDetails />,
			},
			{
				path: '/affiliates-dashboard/pending-product-details/:id',
				element: <PendingDetails />,
			},
			{
				path: '/affiliates-dashboard/active-product',
				element: <ActiveProductAffiliate />,
			},
			{
				path: '/affiliates-dashboard/pending-product',
				element: <PendingProductAffiliate />,
			},

			{
				path: '/affiliates-dashboard/orders-history-all',
				element: <OrderHistoryAll />,
			},
			{
				path: '/affiliates-dashboard/orders-history-pending',
				element: <OrderHistoryPending />,
			},
			{
				path: '/affiliates-dashboard/orders-history-progress',
				element: <OrderHistoryProgress />,
			},
			{
				path: '/affiliates-dashboard/orders-history-delivered',
				element: <OrderHistoryDelivered />,
			},
			{
				path: '/affiliates-dashboard/orders-history-cancel',
				element: <OrderHistoryCancel />,
			},
			{
				path: '/affiliates-dashboard/orders-history-hold',
				element: <OrderHistoryHold />,
			},
			{
				path: '/affiliates-dashboard/orders-history-view/:id',
				element: <AffiliateOrderHistoryView />,
			},
			{
				path: '/affiliates-dashboard/available-balance',
				element: <AffiliateAvailableIncome />,
			},
			{
				path: '/affiliates-dashboard/pending-balance',
				element: <AffiliatePendingIncome />,
			},
			{
				path: '/affiliates-dashboard/withdraw-balance',
				element: <AffiliateWithdrawIncome />,
			},
			{
				path: '/affiliates-dashboard/balance-history',
				element: <AffiliateBalanceHistory />,
			},

			{
				path: '/affiliates-dashboard/add-to-cart',
				element: <AddToCart />,
			},
			{
				path: '/affiliates-dashboard/checkout/:id',
				element: <Checkout />,
			},
			{
				path: '/affiliates-dashboard/profile',
				element: <AffiliatesProfile />,
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

export default route;
