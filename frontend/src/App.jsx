import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Base_URL } from "./Constant";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import PrivateRoute, {
  AdminPrivateRoute,
} from "./Auth_Middleware/PrivateRoute";
import GlobalLoader from "./Component/Loader/Global_Loader";

// It USer
import HomePageIT from "./pages/IT/homePage/HomePage.jsx";
import TechnologyPageIT from "./pages/IT/technologyPage/TechnologyPage";
import ServicePageIT from "./pages/IT/servicePage/ServicePage";
import NoticePageIT from "./pages/IT/noticePage/NoticePage";
import GlobalLocationsPageIT from "./pages/IT/globalLocationsPage/GlobalLocationsPage";
import CommonITLayout from "./pages/IT/CommonITLayout";
import CompanyIT from "./pages/IT/CompanyPage/Company";
import FAQIT from "./pages/IT/FAQ";
import OrderIT from "./pages/IT/Order/Order";
import OrderFormIT from "./pages/IT/Order/OrderForm";
import ContactUsIT from "./pages/IT/ContactUs/ContactUs_IT";
import SecurityPageIT from "./Component/Security/SecurityPage";
import CommonPage from "./pages/IT/CommonPage";

// Admin Signin
import AdminDSignin from "./Component/AdminCompo/Authentication/Signin/AdminSignIn";
import SignIn from "./Component/Authentication/Signin/SignIn.jsx";
import SignUp from "./Component/Authentication/Signup/SignUp.jsx";
// admin IT
const MainAdminIT = lazy(() => import("./pages/Admin/Admin_Panel_IT/Main"));
const DashboardAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Home/Dashboard")
);
const PendingOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Pending/Pending")
);
const PaymentOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Payment/Payment")
);
const WorkingOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Working/Working")
);
const DeliveryOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Delivery/Delivery")
);
const CancelledOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Cancelled/Cancelled")
);
const CompleteOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/Complete/Complete")
);
const AllOrdersAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/All/All")
);
const TransactionAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Transaction/Transaction")
);
const DesignsAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Designs/Designs")
);
const AddDesignAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Designs/AddDesign")
);
const TemplatesAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Templates/Templates")
);
const AddTemplatesAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Templates/AddTemplates")
);
const UpdateTemplates = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Templates/UpdateTemplates")
);
const ProductCategoryAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Product-Category/ProductCategory")
);
const AddProductCategory = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Product-Category/AddProductCategory")
);
const UpdateProductCategory = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Product-Category/UpdateProductCategory")
);
const ProductsAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Products/Products")
);
const AddProductsAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Products/AddProducts")
);
const UpdateProduct = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Products/UpdateProduct")
);
const TechnologyCategory = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Technology-Category/TechnologyCategory")
);
const AddTechnologyCategory = lazy(() =>
  import(
    "./pages/Admin/Admin_Panel_IT/Technology-Category/AddTechnologyCategory"
  )
);
const UpdateTechnologyCategory = lazy(() =>
  import(
    "./pages/Admin/Admin_Panel_IT/Technology-Category/UpdateTechnologyCategory"
  )
);
const Technology = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Technology/Technology")
);
const AddTechnology = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Technology/AddTechnology")
);
const UpdateTechnology = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Technology/UpdateTechnology")
);
const ServicesAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Services/Services")
);
const AddServicesAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Services/AddServices")
);
const UpdateServices = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Services/UpdateServices")
);
const SecurityAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Security/Security")
);
const AddSecurity = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Security/AddSecurity")
);
const UpdateSecurity = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Security/UpdateSecurity")
);

const Notice = lazy(() => import("./pages/Admin/Admin_Panel_IT/Notice/Notice"));
const AddNotice = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Notice/AddNotice")
);
const UpdateNotice = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Notice/UpdateNotice")
);

const Banner = lazy(() => import("./pages/Admin/Admin_Panel_IT/Banner/Banner"));
const AddBanner = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Banner/AddBanner")
);
const UpdateBanner = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Banner/UpdateBanner")
);

const BottomBanner = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BottomBanner/BottomBanner")
);
const AddBottomBanner = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BottomBanner/AddBottomBanner")
);
const UpdateBottomBanner = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BottomBanner/UpdateBottomBanner")
);

const Readmore = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Readmore/Readmore")
);
const AddReadmore = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Readmore/AddReadmore")
);
const UpdateReadmore = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Readmore/UpdateReadmore")
);

const Account = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Account/Account")
);
const AddAccount = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Account/AddAccount")
);
const UpdateAccount = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Account/UpdateAccount")
);

const Payment = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Payment/PaymentMethod")
);
const AddPayment = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Payment/AddPaymentMethod")
);
const UpdatePayment = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Payment/UpdatePaymentMethod")
);

const AddHeader = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Header/AddHeader")
);
const Header = lazy(() => import("./pages/Admin/Admin_Panel_IT/Header/Header"));
const UpdateHeader = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Header/UpdateHeader")
);

const UpdateGlobalLocation = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/GlobalLocation/UpdateGlobalLocation")
);
const GlobalLocation = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/GlobalLocation/GlobalLocation")
);
const AddGlobalLocation = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/GlobalLocation/AddGlobalLocation")
);

const HeadOffice = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/HeadOffice/HeadOffice")
);
const AddHeadOffice = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/HeadOffice/AddHeadOffice")
);
const UpdateHeadOffice = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/HeadOffice/UpdateHeadOffice")
);

const Contact = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Contact/Contact")
);
const NewsLetter = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/NewsLetter/NewsLetter")
);
const UserList = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/UserList/UserList")
);

const CompanyAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Company/Company")
);
const AddMemberAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Company/AddMember")
);
const UpdateMember = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Company/UpdateMember")
);

const PaymentAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/payment/Payment_Icon")
);
const AddPaymentAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/payment/AddPayment_Icon")
);
const UpdatePaymentAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/payment/UpdatePayment_Icon")
);

const FooterSection = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/FooterSection/FooterSection")
);
const AddFooterSection = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/FooterSection/AddFooterSection")
);

const UpdateFooterSection = lazy(() =>
  import(
    "./pages/Admin/Admin_Panel_IT/Footer/FooterSection/UpdateFooterSection"
  )
);
const FooterItem = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/FooterItem/FooterItem")
);
const AddFooterItem = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/FooterItem/AddFooterItem")
);
const UpdateFooterItem = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/FooterItem/UpdateFooterItem")
);
const UpdateSocialLinks = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/Links/UpdateSocialLinks")
);
const AddSocialLinks = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/Links/AddSocialLinks")
);
const SocialLinksAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/Links/SocialLinks")
);
const FooterAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/Footer")
);
const WorkingAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Working")
);
const CompleteAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Complete")
);
const DeliveryAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Delivery")
);
const PagesAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Footer/Pages/Pages")
);
const SettingsAdminIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/Settings/Settings")
);
const ListBrandIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BrandLogo/ListBrand")
);
const UpdateBrandIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BrandLogo/UpdateBrand")
);
const AddNewBrandIT = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/BrandLogo/AddNewBrand")
);
const UpdateOrder = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/UpdateOrder/UpdateOrder")
);
const UploadOrder = lazy(() =>
  import("./pages/Admin/Admin_Panel_IT/orders/UpdateOrder/UploadOrder")
);
// import SecurityPageAdminIT from './Component/Security/SecurityPage';

//import SecurityPageIT from './Component/Security/SecurityPage';

// Profile
const ProfileIT = lazy(() => import("./pages/ProfilePage/IT/ProfilePageIT"));
const SelfOrderDetails = lazy(() =>
  import("./pages/ProfilePage/SelfOrderDetails")
);
// const  Profile  = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const PersonalProfile = lazy(() =>
  import("./pages/ProfilePage/PersonalProfile")
);
const ProfileInfo = lazy(() => import("./pages/ProfilePage/ProfileInfo"));
const Setting = lazy(() => import("./pages/ProfilePage/Setting"));
const OrderHistoryIT = lazy(() => import("./pages/ProfilePage/IT/Order"));
const ProfileDashboardIT = lazy(() =>
  import("./pages/ProfilePage/IT/ProfileDashboard")
);
const UserTransactionIT = lazy(() =>
  import("./pages/ProfilePage/IT/Transaction")
);
const PaymentPageIT = lazy(() => import("./pages/ProfilePage/IT/PaymentPage"));
const OrderHistoryCivil = lazy(() => import("./pages/ProfilePage/Civil/Order"));
const ProfileDashboardCivil = lazy(() =>
  import("./pages/ProfilePage/Civil/ProfileDashboard")
);
const UserTransactionCivil = lazy(() =>
  import("./pages/ProfilePage/Civil/Transaction")
);
const PaymentPageCivil = lazy(() =>
  import("./pages/ProfilePage/Civil/PaymentPage")
);
const Education = lazy(() => import("./pages/ProfilePage/Education"));
const CompanyAndContact = lazy(() =>
  import("./pages/ProfilePage/Company_and_Contact")
);
const Address = lazy(() => import("./pages/ProfilePage/Address"));
const AuthCodeConfirmation = lazy(() =>
  import("./Component/Authentication/AuthCodeConfirmation")
);
const ForgetPassword = lazy(() =>
  import("./Component/Authentication/ForgetPassword")
);

function App() {
  const [footerLinkList, setfooterLinkList] = useState([]);
  const [serviceLinkListIT, setserviceLinkListIT] = useState([]);
  const [ReadmoreIT, setReadmoreIT] = useState([]);
  const [technologyLinkList, settechnologyLinkList] = useState([]);
  const [BrandLogo, setBrandLogo] = useState("");

  // get Footer Link
  // for it
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(Base_URL + "/api/footer/footer-items/").then((res) => {
        setfooterLinkList(res.data);
      });
    };
    fetchData();
  }, []);

  // service Link IT
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(Base_URL + "/api/it/service-link/").then((res) => {
        setserviceLinkListIT(res.data);
      });
    };
    fetchData();
  }, []);

  // service Link IT
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(Base_URL + "/api/it/readmore-link/").then((res) => {
        setReadmoreIT(res.data);
      });
    };
    fetchData();
  }, []);

  // Technology Link
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(Base_URL + "/api/it/technology-link/").then((res) => {
        settechnologyLinkList(res.data);
      });
    };
    fetchData();
  }, []);

  // for brand logo
  useEffect(() => {
    axios.get(Base_URL + "/api/header/brands-logos/").then((response) => {
      setBrandLogo(response.data);
    });
  }, []);

  return (
    <div>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<SignIn path="" />} />
          <Route path="/signup" element={<SignUp path="" />} />

          {/* IT Page Routing Start */}
          <Route path="/" element={<CommonITLayout BrandLogo={BrandLogo} />}>
            <Route index element={<div className="h-[500px]"></div>} />
            <Route path="home" element={<HomePageIT />} />
            <Route path="technology" element={<TechnologyPageIT />} />
            <Route path="services" element={<ServicePageIT />} />
            <Route path="notice" element={<NoticePageIT />} />

            <Route path="security" element={<SecurityPageIT />} />

            <Route path="order-page" element={<OrderIT />} />
            <Route
              path="order-page/order-form-page/:id"
              element={<OrderFormIT />}
            />

            <Route
              path="global-locations"
              element={<GlobalLocationsPageIT />}
            />
            <Route path="contact" element={<ContactUsIT />} />
            <Route path="company" element={<CompanyIT />} />
            <Route path="faq" element={<FAQIT />} />

            <Route path="login" element={<SignIn path="/it" />} />
            <Route path="signup" element={<SignUp path="/it" />} />
            <Route
              path="auth-code-confirmation"
              element={<AuthCodeConfirmation path="/it" />}
            />
            <Route
              path="forget-password"
              element={<ForgetPassword path="/it" />}
            />

            {/* dynamic footer link */}
            {footerLinkList.length !== 0 &&
              footerLinkList?.map((data, i) => {
                return (
                  data?.link.startsWith("/it/") === true &&
                  "/it/global-locations" !== data?.link && (
                    <Route
                      key={i}
                      path={data?.link.slice(4)}
                      element={
                        <CommonPage
                          title={data?.name}
                          description={data?.description}
                        />
                      }
                    />
                  )
                );
              })}

            {/* dynamic service link */}
            {serviceLinkListIT.length !== 0 &&
              serviceLinkListIT?.map((data, i) => {
                return (
                  <Route
                    key={i}
                    path={data?.path.slice(1)}
                    element={
                      <CommonPage
                        title={data?.name}
                        description={data?.description}
                      />
                    }
                  />
                );
              })}
            {/* dynamic ReadmoreIT link */}
            {ReadmoreIT.length !== 0 &&
              ReadmoreIT?.map((data, i) => {
                return (
                  <Route
                    key={i}
                    path={data?.path.slice(1)}
                    element={
                      <CommonPage
                        title={data?.title}
                        description={data?.description}
                      />
                    }
                  />
                );
              })}

            {/* dynamic Technology link */}
            {technologyLinkList.length !== 0 &&
              technologyLinkList?.map((data, i) => {
                return (
                  <Route
                    key={i}
                    path={data?.path.slice(1)}
                    element={
                      <CommonPage
                        title={data?.name}
                        description={data?.description}
                      />
                    }
                  />
                );
              })}

            {/* Profile */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="profile" element={<ProfileIT />}>
                <Route index element={<PersonalProfile parent="it" />} />
                <Route path="education" element={<Education parent="it" />} />
                <Route path="address" element={<Address parent="it" />} />
                <Route
                  path="company-and-contact"
                  element={<CompanyAndContact parent="it" />}
                />
                <Route
                  path="dashboard"
                  element={<ProfileDashboardIT parent="it" />}
                />
                <Route path="order" element={<OrderHistoryIT parent="it" />} />
                <Route
                  path="self-order-detail"
                  element={<SelfOrderDetails parent="it" />}
                />
                <Route
                  path="make-payment"
                  element={<PaymentPageIT parent="it" />}
                />
                <Route
                  path="profileInfo"
                  element={<ProfileInfo parent="it" />}
                />
                <Route path="setting" element={<Setting parent="it" />} />
                <Route
                  path="transaction"
                  element={<UserTransactionIT parent="it" />}
                />
              </Route>
            </Route>

            {/* <Route path="global-locations" element={<GlobalLocation/>} />}  /> */}

            {/* <Route path="/technology" element={<TechnologyPage />} /> */}
            {/* <Route path=":id" element={<Book />} /> */}
          </Route>
          {/* IT Page Routing End */}

          {/* admin Page Routing Start */}
          <Route path="/admin">
            <Route path="login" element={<AdminDSignin />} />

            {/* Donate  admin */}
            <Route path="" element={<AdminPrivateRoute />}>
              <Route path="" element={<MainAdminIT />} />
            </Route>

            {/* IT  Admin*/}
            <Route path="" element={<AdminPrivateRoute />}>
              <Route path="it" element={<MainAdminIT />}>
                <Route index element={<DashboardAdminIT />} />
                <Route path="all-orders" element={<AllOrdersAdminIT />} />
                <Route
                  path="pending-orders"
                  element={<PendingOrdersAdminIT />}
                />
                <Route
                  path="payment-orders"
                  element={<PaymentOrdersAdminIT />}
                />
                <Route
                  path="working-orders"
                  element={<WorkingOrdersAdminIT />}
                />
                <Route
                  path="complete-orders"
                  element={<CompleteOrdersAdminIT />}
                />
                <Route
                  path="delivery-orders"
                  element={<DeliveryOrdersAdminIT />}
                />
                <Route
                  path="cancelled-orders"
                  element={<CancelledOrdersAdminIT />}
                />
                <Route path="update-order" element={<UpdateOrder />} />
                <Route path="upload-order" element={<UploadOrder />} />

                <Route path="transaction" element={<TransactionAdminIT />} />
                <Route path="design" element={<DesignsAdminIT />} />
                <Route path="addDesign" element={<AddDesignAdminIT />} />
                <Route path="templates" element={<TemplatesAdminIT />} />
                <Route path="addTemplates" element={<AddTemplatesAdminIT />} />
                <Route
                  path="update-template/:id"
                  element={<UpdateTemplates />}
                />
                <Route
                  path="product-category"
                  element={<ProductCategoryAdminIT />}
                />
                <Route
                  path="add-product-category"
                  element={<AddProductCategory />}
                />
                <Route
                  path="update-product-category/:id"
                  element={<UpdateProductCategory />}
                />
                <Route path="products" element={<ProductsAdminIT />} />
                <Route path="addProducts" element={<AddProductsAdminIT />} />
                <Route path="update-product/:id" element={<UpdateProduct />} />
                <Route path="technology" element={<Technology />} />
                <Route path="add-technology" element={<AddTechnology />} />
                <Route
                  path="update-technology/:id"
                  element={<UpdateTechnology />}
                />
                <Route
                  path="technology-category"
                  element={<TechnologyCategory />}
                />
                <Route
                  path="add-technology-category"
                  element={<AddTechnologyCategory />}
                />
                <Route
                  path="update-technology-category/:id"
                  element={<UpdateTechnologyCategory />}
                />
                <Route path="services" element={<ServicesAdminIT />} />
                <Route path="addServices" element={<AddServicesAdminIT />} />
                <Route path="update-service/:id" element={<UpdateServices />} />

                <Route path="security" element={<SecurityAdminIT />} />
                <Route path="addSecurity" element={<AddSecurity />} />
                <Route
                  path="update-security/:id"
                  element={<UpdateSecurity />}
                />

                <Route path="notice" element={<Notice />} />
                <Route path="add-notice" element={<AddNotice />} />
                <Route path="update-notice/:id" element={<UpdateNotice />} />

                <Route path="banner" element={<Banner />} />
                <Route path="add-banner" element={<AddBanner />} />
                <Route path="update-banner/:id" element={<UpdateBanner />} />

                <Route path="bottom-banner" element={<BottomBanner />} />
                <Route path="add-bottom-banner" element={<AddBottomBanner />} />
                <Route
                  path="update-bottom-banner/:id"
                  element={<UpdateBottomBanner />}
                />

                <Route path="readmore" element={<Readmore />} />
                <Route path="add-readmore" element={<AddReadmore />} />
                <Route
                  path="update-readmore/:id"
                  element={<UpdateReadmore />}
                />

                <Route path="account" element={<Account />} />
                <Route path="add-account" element={<AddAccount />} />
                <Route path="update-account/:id" element={<UpdateAccount />} />

                <Route path="payment-method" element={<Payment />} />
                <Route path="add-payment-method" element={<AddPayment />} />
                <Route
                  path="update-payment-method/:id"
                  element={<UpdatePayment />}
                />

                <Route path="header" element={<Header />} />
                <Route path="add-header" element={<AddHeader />} />
                <Route path="update-header/:id" element={<UpdateHeader />} />

                <Route path="global-location" element={<GlobalLocation />} />
                <Route
                  path="add-global-location"
                  element={<AddGlobalLocation />}
                />
                <Route
                  path="update-global-location/:id"
                  element={<UpdateGlobalLocation />}
                />

                <Route path="head-office" element={<HeadOffice />} />
                <Route path="add-head-office" element={<AddHeadOffice />} />
                <Route
                  path="update-head-office/:id"
                  element={<UpdateHeadOffice />}
                />

                <Route path="contact" element={<Contact />} />
                <Route path="news-letter" element={<NewsLetter />} />
                <Route path="user-list" element={<UserList />} />

                <Route path="company" element={<CompanyAdminIT />} />
                <Route path="addMember" element={<AddMemberAdminIT />} />
                <Route path="update-company/:id" element={<UpdateMember />} />
                <Route path="footer" element={<FooterAdminIT />} />
                <Route path="payment" element={<PaymentAdminIT />} />
                <Route path="addPayment" element={<AddPaymentAdminIT />} />
                <Route
                  path="update-payment/:id"
                  element={<UpdatePaymentAdminIT />}
                />
                <Route path="working" element={<WorkingAdminIT />} />
                <Route path="complete" element={<CompleteAdminIT />} />
                <Route path="delivery" element={<DeliveryAdminIT />} />
                <Route path="social-icon" element={<SocialLinksAdminIT />} />
                <Route path="addSocialLinks" element={<AddSocialLinks />} />
                <Route
                  path="update-socialLinks/:id"
                  element={<UpdateSocialLinks />}
                />
                <Route path="footer-section" element={<FooterSection />} />
                <Route
                  path="add-footer-section"
                  element={<AddFooterSection />}
                />
                <Route
                  path="update-footer-section/:id"
                  element={<UpdateFooterSection />}
                />
                <Route path="footer-item" element={<FooterItem />} />
                <Route path="add-footer-item" element={<AddFooterItem />} />
                <Route
                  path="update-footer-item/:id"
                  element={<UpdateFooterItem />}
                />

                <Route path="brand-item" element={<ListBrandIT />} />
                <Route path="add-brand-item" element={<AddNewBrandIT />} />
                <Route
                  path="update-brand-item/:id"
                  element={<UpdateBrandIT />}
                />

                <Route path="socialLinks" element={<SocialLinksAdminIT />} />
                <Route path="pages" element={<PagesAdminIT />} />
                <Route path="settings" element={<SettingsAdminIT />} />
              </Route>
            </Route>
            {/* admin Page Routing End */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Toaster */}
      <Toaster
        className="mt-6"
        position="top-center"
        toastOptions={{
          className: "",
          duration: 4000,
          style: { background: "#152b2c", color: "#fff" },
          success: {
            duration: 3500,
            theme: { primary: "green", secondary: "black" },
          },
        }}
      />
    </div>
  );
}

export default App;
