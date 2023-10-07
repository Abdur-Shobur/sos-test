import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// import SignIn from "../pages/sign-in/SignIn"; // sign in v1
// import SignUp from "../pages/sign-in/SignUp"; // sign in v1
import SignInV2 from '../pages/sign-in/sign-in-v2/SignInV2';
import RegisterV2 from '../pages/sign-in/register-v2/RegisterV2';
import PrivateRoutes from './PrivateRoutes';
import CheckPermission from './CheckPermission';
import MainLayout from '../layouts/MainLayout';
import VendorLayout from '../layouts/VendorLayout';
import AffiliatesLayout from '../layouts/AffiliatesLayout';
import ThreeDots from '../components/loader/ThreeDots';
import NotFound from '../pages/404/NotFound';

// for error chunk
const lazyRetry = function (componentImport) {
	return new Promise((resolve, reject) => {
		const hasRefreshed = JSON.parse(
			window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
		);

		componentImport()
			.then((component) => {
				window.sessionStorage.setItem('retry-lazy-refreshed', 'false');
				resolve(component);
			})
			.catch((error) => {
				if (!hasRefreshed) {
					// not been refreshed yet
					window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
					return window.location.reload(); // refresh the page
				}
				reject(error);
			});
	});
};
const GetVendorOwnService = React.lazy(() =>
	lazyRetry(() =>
		import('../pages/vendor-dashboard/vendor-own-service/GetVendorOwnService')
	)
);

const GetVendorOwnSingleService = lazy(() =>
	import(
		'../pages/vendor-dashboard/vendor-own-service/GetVendorOwnSingleService'
	)
);
const VendorServiceDelivery = lazy(() =>
	import('../pages/vendor-dashboard/vendor-own-service/VendorServiceDelivery')
);
const GetAffiliateOrder = lazy(() =>
	import('../pages/affiliates-dashboard/affiliate-own-order/GetAffiliateOrder')
);
const GetAffiliatesSingleOrder = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliate-own-order/GetAffiliatesSingleOrder'
	)
);
const UserProfile = lazy(() =>
	import('../pages/user-dashboard/user-profile/UserProfile')
);
const UserEdit = lazy(() => import('../pages/admin-dashboard/user/UserEdit'));
const AdminAddNewUser = lazy(() =>
	import('../pages/admin-dashboard/user/AdminAddNewUser')
);
const ActiveUsers = lazy(() =>
	import('../pages/admin-dashboard/user/ActiveUsers')
);
const PendingUsers = lazy(() =>
	import('../pages/admin-dashboard/user/PendingUsers')
);
const UserProfileView = lazy(() =>
	import('../pages/admin-dashboard/user/UserProfileView')
);
const AllUsers = lazy(() => import('../pages/admin-dashboard/user/AllUsers'));
const VendorRecharge = lazy(() =>
	import('../pages/vendor-dashboard/vendor-recharge/VendorRecharge')
);
const UserRecharge = lazy(() =>
	import('../pages/user-dashboard/user-recharge/UserRecharge')
);
const GetAffiliateHistory = lazy(() =>
	import('../pages/affiliates-dashboard/affiliate-history/GetAffiliateHistory')
);
const GetVendorHistory = lazy(() =>
	import('../pages/vendor-dashboard/vendor-history/GetVendorHistory')
);
const GetUserHistory = lazy(() =>
	import('../pages/user-dashboard/user-history/GetUserHistory')
);
const GetUserAdvertiser = lazy(() =>
	import('../pages/user-dashboard/user-advertiser/GetUserAdvertiser')
);
const UserSingleAdvertiser = lazy(() =>
	import('../pages/user-dashboard/user-advertiser/UserSingleAdvertiser')
);
const GetUserSingleOrder = lazy(() =>
	import('../pages/user-dashboard/user-service-order/GetUserSingleOrder')
);
const GetAllServiceOrder = lazy(() =>
	import('../pages/admin-dashboard/Service-order-list/GetAllServiceOrder')
);
const GetSingleServiceOrder = lazy(() =>
	import('../pages/admin-dashboard/Service-order-list/GetSingleServiceOrder')
);
const GetAffiMyService = lazy(() =>
	import('../pages/affiliates-dashboard/my-service/GetAffiMyService')
);
const GetAffiSingleService = lazy(() =>
	import('../pages/affiliates-dashboard/my-service/GetAffiSingleService')
);
const ServiceDelivery = lazy(() =>
	import('../pages/affiliates-dashboard/my-service/ServiceDelivery')
);
const UserLayout = lazy(() => import('../layouts/UserLayout'));
const UserDashboard = lazy(() =>
	import('../pages/user-dashboard/UserDashboard')
);
const UserAllSupport = lazy(() =>
	import('../pages/user-dashboard/user-support/UserAllSupport')
);
const CreateTicket = lazy(() =>
	import('../pages/user-dashboard/user-support/CreateTicket')
);

const MyOrder = lazy(() =>
	import('../pages/user-dashboard/user-service-order/MyOrder')
);

const UserSingleSupport = lazy(() =>
	import('../pages/user-dashboard/user-support/UserSingleSupport')
);
const GetSingleOrder = lazy(() =>
	import('../pages/vendor-dashboard/vendor-order/GetSingleOrder')
);
const GetAffiAdvertiser = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-advertiser/GetAffiAdvertiser'
	)
);
const AffiliateAdvertiserSingleView = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-advertiser/AffiliateAdvertiserSingleView'
	)
);
const GetServiceOrder = lazy(() =>
	import('../pages/vendor-dashboard/vendor-order/GetServiceOrder')
);
const VendorCheckout = lazy(() =>
	import('../pages/vendor-dashboard/renew/checkout/VendorCheckout')
);
const VendorAdvertiserView = lazy(() =>
	import('../pages/vendor-dashboard/vendor-advertiser/VendorAdvertiserView')
);
const GetVendorAdvertiser = lazy(() =>
	import('../pages/vendor-dashboard/vendor-advertiser/GetVendorAdvertiser')
);
const AffiCheckout = lazy(() =>
	import('../pages/affiliates-dashboard/affi-renew/checkout/AffiCheckout')
);
const AffiRenew = lazy(() =>
	import('../pages/affiliates-dashboard/affi-renew/AffiRenew')
);
const Renew = lazy(() => import('../pages/vendor-dashboard/renew/Renew'));
const GetAffiliatesService = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-create-service/GetAffiliatesService'
	)
);
const CreateAffiliatesServices = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-create-service/CreateAffiliatesServices'
	)
);
const AffiliatesServiceUpdate = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-create-service/AffiliatesServiceUpdate'
	)
);
const SubscriptionUpdate = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Subscription/SubscriptionUpdate'
	)
);
const GetVendorSingleService = lazy(() =>
	import('../pages/admin-dashboard/vendor-service/GetVendorSingleService')
);
const GetVendorCoupon = lazy(() =>
	import('../pages/vendor-dashboard/vendor-all-coupon/GetVendorCoupon')
);
const AdvertiserDelivary = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/AdvertiserDelivary'
	)
);
const GetAffiliatesCoupon = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-all-coupon/GetAffiliatesCoupon'
	)
);
const AdminGetVendorService = lazy(() =>
	import('../pages/admin-dashboard/vendor-service/AdminGetVendorService')
);
const CreateVendorService = lazy(() =>
	import('../pages/vendor-dashboard/vendor-service/CreateVendorService')
);
const VendorServiceUpdate = lazy(() =>
	import('../pages/vendor-dashboard/vendor-service/VendorServiceUpdate')
);
const CreateSubCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/service-sub-category/CreateSubCategory'
	)
);
const GetAdminDollarSet = lazy(() =>
	import('../pages/admin-dashboard/dollar-set/GetAdminDollarSet')
);
const GetServiceSubCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/service-sub-category/GetServiceSubCategory'
	)
);
const CreateServiceCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/service-category/CreateServiceCategory'
	)
);
const GetServiceCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/service-category/GetServiceCategory'
	)
);
const GetVendorService = lazy(() =>
	import('../pages/vendor-dashboard/vendor-service/GetVendorService')
);
const GetSubscription = lazy(() =>
	import('../pages/admin-dashboard/update-content/Subscription/GetSubscription')
);
const AffiliatesCreateSupport = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-support/AffiliatesCreateSupport'
	)
);
const AffiliatesAllSupport = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-support/AffiliatesAllSupport'
	)
);
const AffiliatesSingleSupport = lazy(() =>
	import(
		'../pages/affiliates-dashboard/affiliates-support/AffiliatesSingleSupport'
	)
);
const CreateAdminSupport = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Admin-support/CreateAdminSupport'
	)
);
const AdminAllSupport = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Admin-support/AdminAllSupport'
	)
);
const AdminSingleSupport = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Admin-support/AdminSingleSupport'
	)
);
const CreateSupport = lazy(() =>
	import('../pages/vendor-dashboard/Vendorsupport/CreateSupport')
);
const AllSupport = lazy(() =>
	import('../pages/vendor-dashboard/Vendorsupport/AllSupport')
);
const VendorSingleSupport = lazy(() =>
	import('../pages/vendor-dashboard/Vendorsupport/VendorSingleSupport')
);
const CreateCoupon = lazy(() =>
	import('../pages/admin-dashboard/update-content/AdminCoupon/CreateCoupon')
);
const SupportBoxCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Support-box-cateogry/SupportBoxCategory'
	)
);
const CreateCategory = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Support-box-cateogry/CreateCategory'
	)
);
const SupportProblemTopic = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Support-problem-topic/SupportProblemTopic'
	)
);
const CreateSupportTopic = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Support-problem-topic/CreateSupportTopic'
	)
);
const AdminCoupon = lazy(() =>
	import('../pages/admin-dashboard/update-content/AdminCoupon/AdminCoupon')
);
const GetAdvertiser = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/GetAdvertiser'
	)
);
const GetContactMessage = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/ContactMessage/GetContactMessage'
	)
);
const AdvertiserUpdate = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/AdvertiserUpdate'
	)
);
const AdvertiserStore = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/AdvertiserStore'
	)
);
const SingleVewAdvertiser = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/GetAdvertiser/SingleVewAdvertiser'
	)
);
const CreateCompanions = lazy(() =>
	import('../pages/admin-dashboard/update-content/CreateCompanions')
);
const GetMissions = lazy(() =>
	import('../pages/admin-dashboard/update-content/Missions/GetMissions')
);
const GetFAQ = lazy(() =>
	import('../pages/admin-dashboard/update-content/FAQ/GetFAQ')
);
const Testimonial = lazy(() =>
	import('../pages/admin-dashboard/update-content/Testimonial/Testimonial')
);
const CreateTestimonial = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Testimonial/CreateTestimonial'
	)
);
const CreateFAQ = lazy(() =>
	import('../pages/admin-dashboard/update-content/FAQ/CreateFAQ')
);
const CreateMissions = lazy(() =>
	import('../pages/admin-dashboard/update-content/Missions/CreateMissions')
);
const GetMembers = lazy(() =>
	import('../pages/admin-dashboard/update-content/Members/GetMembers')
);
const CreateMember = lazy(() =>
	import('../pages/admin-dashboard/update-content/Members/CreateMember')
);
const GetService = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Service/GetService'
	)
);
const CreateService = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Service/CreateService'
	)
);
const GetOrganization = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Organization/GetOrganization'
	)
);
const CreateOrganization = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Organization/CreateOrganization'
	)
);
const GetItService = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/ItService/GetItService'
	)
);
const CreateItService = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/ItService/CreateItService'
	)
);
const OrganizationTwo = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/OrganizationTwo/OrganizationTwo'
	)
);
const CreateOrganizationTwo = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/OrganizationTwo/CreateOrganizationTwo'
	)
);
const GetPartner = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Partners/GetPartner'
	)
);
const CreatePartner = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Partners/CreatePartner'
	)
);
const GetFooter = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Footer/GetFooter'
	)
);
const CreateFooter = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/Service-Home/Footer/CreateFooter'
	)
);
const ServiceContentUpdate = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/ServiceUpdate/ServiceContentUpdate'
	)
);
const AdvertiseContentUpdate = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/AdvertiseContent/AdvertiseContentUpdate'
	)
);
const HomeContent = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/HomeUpdateContent/HomeContent'
	)
);
const AboutUpdateContent = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/About-update-content/AboutUpdateContent'
	)
);
const GeneralContentUpdate = lazy(() =>
	import(
		'../pages/admin-dashboard/update-content/GeneralContentUpdate/GeneralContentUpdate'
	)
);
const UpdateCompanions = lazy(() =>
	import('../pages/admin-dashboard/update-content/UpdateCompanions')
);
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
// const CheckPermission = lazy(() => import("./CheckPermission"));
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
const RejectedProductAffiliate = lazy(() =>
	import('../pages/affiliates-dashboard/products/RejectedProductAffiliate')
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

const route1 = createBrowserRouter([
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
				path: '/admin/profile',
				element: <AdminProfile />,
			},
			{
				path: '/admin/update-companions',
				element: <UpdateCompanions />,
			},
			{
				path: '/admin/create-companions',
				element: <CreateCompanions />,
			},
			{
				path: '/admin/missions',
				element: <GetMissions />,
			},
			{
				path: '/admin/create-mission',
				element: <CreateMissions />,
			},
			{
				path: '/admin/faq',
				element: <GetFAQ />,
			},
			{
				path: '/admin/testimonial',
				element: <Testimonial />,
			},
			{
				path: '/admin/create-testimonial',
				element: <CreateTestimonial />,
			},
			{
				path: '/admin/create-faq',
				element: <CreateFAQ />,
			},
			{
				path: '/admin/members',
				element: <GetMembers />,
			},
			{
				path: '/admin/create-member',
				element: <CreateMember />,
			},
			{
				path: '/admin/service',
				element: <GetService />,
			},
			{
				path: '/admin/create-service',
				element: <CreateService />,
			},
			{
				path: '/admin/organization',
				element: <GetOrganization />,
			},
			{
				path: '/admin/create-organization',
				element: <CreateOrganization />,
			},
			{
				path: '/admin/it-service',
				element: <GetItService />,
			},
			{
				path: '/admin/create-itService',
				element: <CreateItService />,
			},
			{
				path: '/admin/organization-two',
				element: <OrganizationTwo />,
			},
			{
				path: '/admin/create-organization-two',
				element: <CreateOrganizationTwo />,
			},
			{
				path: '/admin/partner',
				element: <GetPartner />,
			},
			{
				path: '/admin/create-partner',
				element: <CreatePartner />,
			},
			{
				path: '/admin/footer',
				element: <GetFooter />,
			},
			{
				path: '/admin/create-footer',
				element: <CreateFooter />,
			},
			{
				path: '/admin/update-home-content',
				element: <HomeContent />,
			},
			{
				path: '/admin/update-about-content',
				element: <AboutUpdateContent />,
			},
			{
				path: '/admin/update-general-content',
				element: <GeneralContentUpdate />,
			},
			{
				path: '/admin/update-service-content',
				element: <ServiceContentUpdate />,
			},
			{
				path: '/admin/update-advertise-content',
				element: <AdvertiseContentUpdate />,
			},
			{
				path: '/admin/advertise-content',
				element: <GetAdvertiser />,
			},
			{
				path: '/admin/advertise-content-view/:id',
				element: <SingleVewAdvertiser />,
			},
			{
				path: '/admin/advertise-store',
				element: <AdvertiserStore />,
			},
			{
				path: '/admin/advertiser-update/:id',
				element: <AdvertiserUpdate />,
			},
			{
				path: '/admin/advertiser-content/delivery/:id',
				element: <AdvertiserDelivary />,
			},
			{
				path: '/admin/contact-message',
				element: <GetContactMessage />,
			},
			{
				path: '/admin/support-cateogory',
				element: <SupportBoxCategory />,
			},
			{
				path: '/admin/create-cateogory',
				element: <CreateCategory />,
			},
			{
				path: '/admin/support-problem-topic',
				element: <SupportProblemTopic />,
			},
			{
				path: '/admin/create-problem-topic',
				element: <CreateSupportTopic />,
			},
			{
				path: '/admin/all-coupon',
				element: <AdminCoupon />,
			},
			{
				path: '/admin/create-coupon',
				element: <CreateCoupon />,
			},
			{
				path: '/admin/create-support',
				element: <CreateAdminSupport />,
			},
			{
				path: '/admin/all-support',
				element: <AdminAllSupport />,
			},
			{
				path: '/admin/single-support/:id',
				element: <AdminSingleSupport />,
			},
			{
				path: '/admin/subscription',
				element: <GetSubscription />,
			},
			{
				path: '/admin/subscription/:id',
				element: <SubscriptionUpdate />,
			},
			{
				path: '/admin/service-category',
				element: <GetServiceCategory />,
			},
			{
				path: '/admin/create-service-category',
				element: <CreateServiceCategory />,
			},
			{
				path: '/admin/service-sub-category',
				element: <GetServiceSubCategory />,
			},
			{
				path: '/admin/create-service-sub-category',
				element: <CreateSubCategory />,
			},
			{
				path: '/admin/dollar-set',
				element: <GetAdminDollarSet />,
			},
			{
				path: '/admin/vendor-service',
				element: <AdminGetVendorService />,
			},
			{
				path: '/admin/vendor-service/:id',
				element: <GetVendorSingleService />,
			},
			{
				path: '/admin/service-order',
				element: <GetAllServiceOrder />,
			},
			{
				path: '/admin/service-order/:id',
				element: <GetSingleServiceOrder />,
			},
			{
				path: '/admin/all-users',
				element: <AllUsers />,
			},
			{
				path: '/admin/add-new-user',
				element: <AdminAddNewUser />,
			},
			{
				path: '/admin/active-users',
				element: <ActiveUsers />,
			},
			{
				path: '/admin/pending-users',
				element: <PendingUsers />,
			},
			{
				path: '/admin/user-profile-view/:id',
				element: <UserProfileView />,
			},
			{
				path: '/admin/edit-user/:id',
				element: <UserEdit />,
			},
		],
	},

	// admin  sing in sing up
	{
		path: '/sign-in',
		element: <SignInV2 />,
	},
	{
		path: '/sign-up',
		element: <RegisterV2 />,
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
			{
				path: '/vendors-dashboard/create-support',
				element: <CreateSupport />,
			},
			{
				path: '/vendors-dashboard/all-support-ticket',
				element: <AllSupport />,
			},
			{
				path: '/vendors-dashboard/single-support-ticket/:id',
				element: <VendorSingleSupport />,
			},
			{
				path: '/vendors-dashboard/all-services',
				element: <GetVendorService />,
			},
			{
				path: '/vendors-dashboard/create-services',
				element: <CreateVendorService />,
			},
			{
				path: '/vendors-dashboard/update-service/:id',
				element: <VendorServiceUpdate />,
			},
			{
				path: '/vendor/coupon',
				element: <GetVendorCoupon />,
			},
			{
				path: '/vendor/renew',
				element: <Renew />,
			},
			{
				path: '/vendor/renew/:id',
				element: <VendorCheckout />,
			},
			{
				path: '/vendor/advertiser',
				element: <GetVendorAdvertiser />,
			},
			{
				path: '/vendor/advertise-content-view/:id',
				element: <VendorAdvertiserView />,
			},
			{
				path: '/vendor/order',
				element: <GetServiceOrder />,
			},
			{
				path: '/vendor/order/:id',
				element: <GetSingleOrder />,
			},
			{
				path: '/vendors-dashboard/history',
				element: <GetVendorHistory />,
			},
			{
				path: '/vendors-dashboard/recharge',
				element: <VendorRecharge />,
			},
			{
				path: '/vendors-dashboard/service-order',
				element: <GetVendorOwnService />,
			},
			{
				path: '/vendors-dashboard/single-order/:id',
				element: <GetVendorOwnSingleService />,
			},
			{
				path: '/vendor-dashboard/my-service/delivery/:id',
				element: <VendorServiceDelivery />,
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
				path: '/affiliates-dashboard/rejected-product',
				element: <RejectedProductAffiliate />,
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
			{
				path: '/affiliates-dashboard/create-support',
				element: <AffiliatesCreateSupport />,
			},
			{
				path: '/affiliates-dashboard/all-support',
				element: <AffiliatesAllSupport />,
			},
			{
				path: '/affiliates-dashboard/single-support/:id',
				element: <AffiliatesSingleSupport />,
			},
			{
				path: '/affiliates-dashboard/coupon',
				element: <GetAffiliatesCoupon />,
			},
			{
				path: '/affiliates-dashboard/all-service',
				element: <GetAffiliatesService />,
			},
			{
				path: '/affiliates-dashboard/create-service',
				element: <CreateAffiliatesServices />,
			},
			{
				path: '/affiliates-dashboard/update-service/:id',
				element: <AffiliatesServiceUpdate />,
			},
			{
				path: '/affiliates-dashboard/renew',
				element: <AffiRenew />,
			},
			{
				path: '/affiliates-dashboard/renew/checkout/:id',
				element: <AffiCheckout />,
			},
			{
				path: '/affiliates-dashboard/advertiser',
				element: <GetAffiAdvertiser />,
			},
			{
				path: '/affiliates-dashboard/advertise-content-view/:id',
				element: <AffiliateAdvertiserSingleView />,
			},
			{
				path: '/affiliates-dashboard/my-service',
				element: <GetAffiMyService />,
			},
			{
				path: '/affiliates-dashboard/my-service/:id',
				element: <GetAffiSingleService />,
			},
			{
				path: '/affiliates-dashboard/my-service/delivery/:id',
				element: <ServiceDelivery />,
			},
			{
				path: '/affiliates-dashboard/history',
				element: <GetAffiliateHistory />,
			},
			{
				path: '/affiliates-dashboard/my-order',
				element: <GetAffiliateOrder />,
			},
			{
				path: '/affiliates-dashboard/my-order/:id',
				element: <GetAffiliatesSingleOrder />,
			},
		],
	},

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
					<CheckPermission roleID="4">
						<UserLayout />
					</CheckPermission>
				</PrivateRoutes>
			</React.Suspense>
		),
		children: [
			{
				path: '/user-dashboard',
				element: <UserDashboard />,
			},
			{
				path: '/user/all-support',
				element: <UserAllSupport />,
			},
			{
				path: '/user/support/:id',
				element: <UserSingleSupport />,
			},
			{
				path: '/user/create-ticket',
				element: <CreateTicket />,
			},
			{
				path: '/user/orders',
				element: <MyOrder />,
			},
			{
				path: '/user/order/:id',
				element: <GetUserSingleOrder />,
			},
			{
				path: '/user/advertiser',
				element: <GetUserAdvertiser />,
			},
			{
				path: '/user/advertiser/:id',
				element: <UserSingleAdvertiser />,
			},
			{
				path: '/user/history',
				element: <GetUserHistory />,
			},
			{
				path: '/user/recharge',
				element: <UserRecharge />,
			},
			{
				path: '/user-dashboard/profile',
				element: <UserProfile />,
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

export default route1;
