import { createBrowserRouter } from 'react-router-dom';
import AffiliatesLayout from '../layouts/AffiliatesLayout';
import MainLayout from '../layouts/MainLayout';
import VendorLayout from '../layouts/VendorLayout';
import VendorsSignIn from '../pages/Vendors/VendorsSignIn';
import VendorsSignUp from '../pages/Vendors/VendorsSignUp';
import AdminDashboard from '../pages/admin-dashboard/AdminDashboard';
import Affiliates from '../pages/admin-dashboard/affiliates/AllAffiliates';
import AffiliatesEdit from '../pages/admin-dashboard/affiliates/AffiliatesEdit';
import Brand from '../pages/admin-dashboard/brand/Brand';
import AdminProfile from '../pages/admin-dashboard/profile/AdminProfile';
import Reviews from '../pages/admin-dashboard/review/Reviews';
import VendorEdit from '../pages/admin-dashboard/vendor/VendorEdit';
import AffiliatesDashboard from '../pages/affiliates-dashboard/AffiliatesDashboard';
import AffiliatesSignIn from '../pages/affiliates-dashboard/AffiliatesSignIn';
import AffiliatesSignUp from '../pages/affiliates-dashboard/AffiliatesSignUp';
import AddToCart from '../pages/affiliates-dashboard/cart/AddToCart';
import ActiveDetails from '../pages/affiliates-dashboard/products/ActiveProduct/ActiveDetails';
import PendingDetails from '../pages/affiliates-dashboard/products/PendingProduct/PendingDetails';
import ProductDetailsAll from '../pages/affiliates-dashboard/products/allProducts/ProductDetailsAll';
import AffiliatesProfile from '../pages/affiliates-dashboard/profile/AffiliatesProfile';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-in/SignUp';
import VendorsDashboard from '../pages/vendor-dashboard/VendorsDashboard';
import VendorProductAdd from '../pages/vendor-dashboard/products/VendorProductAdd';
import VendorProductEdit from '../pages/vendor-dashboard/products/VendorProductEdit';
import VendorProductList from '../pages/vendor-dashboard/products/VendorProductList';
import Color from '../pages/vendor-dashboard/utility/color/Color';
import EditColor from '../pages/vendor-dashboard/utility/color/EditColor';
import EditSize from '../pages/vendor-dashboard/utility/size/EditSize';
import Size from '../pages/vendor-dashboard/utility/size/Size';
import AdminAddNewAffiliates from '../pages/admin-dashboard/affiliates/AdminAddNewAffiliates';
import BrandAdd from '../pages/admin-dashboard/brand/BrandAdd';
import BrandEdit from '../pages/admin-dashboard/brand/BrandEdit';
import SubCategory from '../pages/admin-dashboard/category/SubCategory/SubCategory';
import SubCategoryEdit from '../pages/admin-dashboard/category/SubCategory/SubCategoryEdit';
import MainCategory from '../pages/admin-dashboard/category/mainCategory/MainCategory';
import MainCategoryEdit from '../pages/admin-dashboard/category/mainCategory/MainCategoryEdit';
import AdminAddNewVendor from '../pages/admin-dashboard/vendor/AdminAddNewVendor';
import Checkout from '../pages/affiliates-dashboard/checkout/Checkout';
import CheckPermission from './CheckPermission';
import PrivateRoutes from './PrivateRoutes';
import ActiveVendor from '../pages/admin-dashboard/vendor/ActiveVendor';
import PendingVendor from '../pages/admin-dashboard/vendor/PendingVendor';
import ActiveAffiliates from '../pages/admin-dashboard/affiliates/ActiveAffiliates';
import PendingAffiliates from '../pages/admin-dashboard/affiliates/PendingAffiliates';
import View from '../pages/admin-dashboard/view-profile/View';
import AllProductsVendor from '../pages/admin-dashboard/vendor-products/AllProductsVendor';
import ActiveProductsVendor from '../pages/admin-dashboard/vendor-products/ActiveProductsVendor';
import PendingProductsVendor from '../pages/admin-dashboard/vendor-products/PendingProductsVendor';
import AllRequestAffiliate from '../pages/admin-dashboard/affiliates-products/AllRequestAffiliate';
import ActiveRequestAffiliate from '../pages/admin-dashboard/affiliates-products/ActiveRequestAffiliate';
import PendingRequestAffiliate from '../pages/admin-dashboard/affiliates-products/PendingRequestAffiliate';
import VendorBrand from '../pages/vendor-dashboard/brand/VendorBrand';
import VendorBrandAdd from '../pages/vendor-dashboard/brand/VendorBrandAdd';
import VendorBrandEdit from '../pages/vendor-dashboard/brand/VendorBrandEdit';
import VendorActiveProduct from '../pages/vendor-dashboard/products/VendorActiveProduct';
import VendorPendingProduct from '../pages/vendor-dashboard/products/VendorPendingProduct';
import VendorProfileView from '../pages/admin-dashboard/vendor/VendorProfileView';
import AffiliatesProfileView from '../pages/admin-dashboard/affiliates/AfiiliatesProfileView';
import RejectedProductsVendor from '../pages/admin-dashboard/vendor-products/RejectedProductsVendor';
import VendorProductView from '../pages/admin-dashboard/vendor-products/VendorProductView';
import VendorRejectedProduct from '../pages/vendor-dashboard/products/VendorRejectedProduct';
import VendorProductPreview from '../pages/vendor-dashboard/products/VendorProductPreview';
import AffiliateAllRequest from '../pages/vendor-dashboard/affiliate-requested/AffiliateAllRequest';
import AffiliateActiveRequest from '../pages/vendor-dashboard/affiliate-requested/AffiliateActiveRequest';
import AffiliatePendingRequest from '../pages/vendor-dashboard/affiliate-requested/AffiliatePendingRequest';
import AffiliateRejectedRequest from '../pages/vendor-dashboard/affiliate-requested/AffiliateRejectedRequest';
import OrderHistoryAll from '../pages/affiliates-dashboard/orders-history/OrderHistoryAll';
import OrderHistoryPending from '../pages/affiliates-dashboard/orders-history/OrderHistoryPending';
import OrderHistoryProgress from '../pages/affiliates-dashboard/orders-history/OrderHistoryProgress';
import OrderHistoryDelivered from '../pages/affiliates-dashboard/orders-history/OrderHistoryDelivered';
import OrderHistoryCancel from '../pages/affiliates-dashboard/orders-history/OrderHistoryCancel';
import AdminOrderHistoryAll from '../pages/admin-dashboard/orders-history/AdminOrderHistoryAll';
import AdminOrderHistoryPending from '../pages/admin-dashboard/orders-history/AdminOrderHistoryPending';
import AdminOrderHistoryProgress from '../pages/admin-dashboard/orders-history/AdminOrderHistoryProgress';
import AdminOrderHistoryDelivered from '../pages/admin-dashboard/orders-history/AdminOrderHistoryDelivered';
import AdminOrderHistoryCancel from '../pages/admin-dashboard/orders-history/AdminOrderHistoryCancel';
import VendorOrderHistoryCancel from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryCancel';
import VendorOrderHistoryDelivered from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryDelivered';
import VendorOrderHistoryProgress from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryProgress';
import VendorOrderHistoryPending from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryPending';
import VendorOrderHistoryAll from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryAll';
import VendorProfile from '../pages/vendor-dashboard/profile/VendorProfile';
import AllProductAffiliate from '../pages/affiliates-dashboard/products/AllProductAffiliate';
import ActiveProductAffiliate from '../pages/affiliates-dashboard/products/ActiveProductAffiliate';
import PendingProductAffiliate from '../pages/affiliates-dashboard/products/PendingProductAffiliate';
import Vendors from '../pages/admin-dashboard/vendor/AllVendors';
import ViewRequestProduct from '../pages/admin-dashboard/affiliates-products/ViewRequestProduct';
import RejectedRequestAffiliate from '../pages/admin-dashboard/affiliates-products/RejectedRequestAffiliate';
import AffiliateRequestView from '../pages/vendor-dashboard/affiliate-requested/AffiliateRequestView';
import AdminOrderHistoryView from '../pages/admin-dashboard/orders-history/AdminOrderHistoryView';
import VendorOrderHistoryView from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryView';
import AffiliateOrderHistoryView from '../pages/affiliates-dashboard/orders-history/AffiliateOrderHistoryView';
import VendorOrderHistoryHold from '../pages/vendor-dashboard/orders-history/VendorOrderHistoryHold';
import AdminOrderHistoryHold from '../pages/admin-dashboard/orders-history/AdminOrderHistoryHold';
import OrderHistoryHold from '../pages/affiliates-dashboard/orders-history/OrderHistoryHoldAfi';
import PaymentVendorAll from '../pages/admin-dashboard/vendor-payment/PaymentVendorAll';
import PaymentVendorPending from '../pages/admin-dashboard/vendor-payment/PaymentVendorPending';
import PaymentVendorAccept from '../pages/admin-dashboard/vendor-payment/PaymentVendorAccept';
import PaymentAffiliateAll from '../pages/admin-dashboard/affiliate-payment/PaymentAffiliateAll';
import PaymentAffiliatePending from '../pages/admin-dashboard/affiliate-payment/PaymentAffiliatePending';
import PaymentAffiliateCancel from '../pages/admin-dashboard/affiliate-payment/PaymentAffiliateCancel';
import PaymentVendorCancel from '../pages/admin-dashboard/vendor-payment/PaymentVendorCancel';
import PaymentAffiliateClear from '../pages/admin-dashboard/affiliate-payment/PaymentAffiliateClear';
import DepositBalance from '../pages/vendor-dashboard/diposit/DepositBalance';
import CancelDeposit from '../pages/vendor-dashboard/diposit/CancelDeposit';
import AcceptDeposit from '../pages/vendor-dashboard/diposit/AcceptDeposit';
import PendingDeposit from '../pages/vendor-dashboard/diposit/PendingDeposit';
import AffiliateAvailableIncome from '../pages/affiliates-dashboard/income/AffiliateAvailableIncome';
import AffiliatePendingIncome from '../pages/affiliates-dashboard/income/AffiliatePendingIncome';
import AffiliateWithdrawIncome from '../pages/affiliates-dashboard/income/AffiliateWithdrawIncome';
import AllDeposit from '../pages/vendor-dashboard/diposit/AllDeposit';
import AffiliateBalanceHistory from '../pages/affiliates-dashboard/income/AffiliateBalanceHistory';

const route = createBrowserRouter([
	// admin  sing in sing up
	{
		path: '/',
		element: (
			<PrivateRoutes>
				<CheckPermission roleID="1">
					<MainLayout />
				</CheckPermission>
			</PrivateRoutes>
		),
		children: [
			{
				path: '/',
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
		path: '/vendors-dashboard',
		element: (
			<PrivateRoutes>
				<CheckPermission roleID="2">
					<VendorLayout />
				</CheckPermission>
			</PrivateRoutes>
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

	// vendor sing in sing up
	{
		path: '/vendors/sign-in',
		element: (
			// <VendorLoginPageProtected>
			<VendorsSignIn />
			// </VendorLoginPageProtected>
		),
	},
	{
		path: '/vendors/sign-up',
		element: <VendorsSignUp />,
	},

	// affiliates layout
	{
		path: '/affiliates-dashboard',
		element: (
			<PrivateRoutes>
				<CheckPermission roleID="3">
					<AffiliatesLayout />
				</CheckPermission>
			</PrivateRoutes>
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

	// affiliates sing in sing up
	{
		path: '/affiliates/sign-in',
		element: (
			// <AffiliatorLoginPageProtected>
			<AffiliatesSignIn />
			// </AffiliatorLoginPageProtected>
		),
	},
	{
		path: '/affiliates/sign-up',
		element: <AffiliatesSignUp />,
	},
]);

export default route;
