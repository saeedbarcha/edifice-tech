import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

// import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import "./themes.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./screens/privateRoute/PrivateRoute";
import AdminRoute from "./screens/privateRoute/AdminRoute";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/product/ProductScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ProfileScreen from "./screens/auth/ProfileScreen";
import ProductListScreen from "./screens/admin/product/ProductListScreen";
import ProductEditScreen from "./screens/admin/product/ProductEditScreen";
import UserListScreen from "./screens/admin/users/UserListScreen";
import UserEditScreen from "./screens/admin/users/UserEditScreen";
import PolicyScreen from "./screens/policy/PolicyScreen";
import AboutScreen from "./screens/about/AboutScreen"
import ContactScreen from "./screens/contact/ContactScreen";
import TeamMemberProfile from "./screens/auth/TeamMemberProfile";
import CreateBlogScreen from "./screens/admin/blog/CreateBlogScreen";
import AllBlogsScreen from "./screens/blog/AllBlogsScreen";
import BlogDetailsScreen from "./screens/blog/BlogDetailsScreen";
import BlogListScreen from "./screens/admin/blog/BlogListScreen";
import BlogEditScreen from "./screens/admin/blog/BlogEditScreen";
import AdminDashboard from "./screens/admin/adminDashboard/AdminDashboard";
import GalleryList from "./screens/admin/gallery/GalleryList";
import ServiceDetails from "./screens/services/ServiceDetails";
import CourseListScreen from "./screens/admin/course/CourseListScreen";
import CourseDetails from "./screens/courses/CourseDetails";
import CreateCourseScreen from "./screens/admin/course/CreateCourseScreen";
import AdmissionBatchListScreen from "./screens/admin/admissionBatch/AdmissionBatchListScreen";
import AdmissionBatchDetailScreen from "./screens/admin/admissionBatch/AdmissionBatchDetailScreen";
import CreateAdmissionBatchScreen from "./screens/admin/admissionBatch/CreateAdmissionBatchScreen";
import EditCoursesScreen from "./screens/admin/course/EditCoursesScreen";
import EditAdmissionBatchScreen from "./screens/admin/admissionBatch/EditAdmissionBatchScreen";
import EnrollAdmissionBatchScreen from "./screens/admission/EnrollAdmissionBatchScreen";
import MyEnrollments from "./screens/auth/profileComponents/myEnrollments/MyEnrollments";
import EnrollmentList from "./screens/admin/enrollment/EnrollmentList";
import CreateServiceScreen from "./screens/admin/service/CreateServiceScreen";
import ServiceListScreen from "./screens/admin/service/ServiceListScreen";
import EditSerciveScreen from "./screens/admin/service/EditSerciveScreen";
import FaqsListScreen from "./screens/admin/faq/FaqsListScreen";
import CreateFaqsScreen from "./screens/admin/faq/CreateFaqsScreen";
import EditFaqsScreen from "./screens/admin/faq/EditFaqsScreen";
import AllCoursesScreen from "./screens/courses/AllCoursesScreen";
import AllGallery from "./screens/gallery/AllGallery";
import AllServices from "./screens/services/AllServices";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/course/:keyword?/page/:pageNumber?" element={<AllCoursesScreen />} />
      <Route path="/gallery/:keyword?/page/:pageNumber?" element={<AllGallery />} />
      <Route path="/service/:keyword?/page/:pageNumber?" element={<AllServices />} />
      
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/policy" element={<PolicyScreen />} />
      <Route path="/member/:id" element={<TeamMemberProfile />} />
      <Route path="/blogs" element={<AllBlogsScreen />} />
      <Route path="/admissionbatch/:id" element={<AdmissionBatchDetailScreen />} />
      <Route path="/activeadmissionbatch/:id" element={<EnrollAdmissionBatchScreen />} />
      <Route path="/blogs/:id" element={<BlogDetailsScreen />} />
      <Route path="/services/:id" element={<ServiceDetails />} />
      <Route path="/course/:id" element={<CourseDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/my-enrollments/:id" element={<MyEnrollments />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/createblog" element={<CreateBlogScreen />} />
        <Route path="/admin/createservice" element={<CreateServiceScreen />} />
        {/* <Route path="/admin/service-List" element={<ServiceListScreen />} /> */}
        <Route path="/admin/service-List/page/1" element={<ServiceListScreen />} />




        <Route path="/admin/bloglist" element={<BlogListScreen />} />
        <Route path="/admin/gallerylist" element={<GalleryList />} />
        <Route path="/admin/courselist" element={<CourseListScreen />} />
        <Route path="/admin/createcourse" element={<CreateCourseScreen />} />
        <Route path="/admin/createadmissionbatch" element={<CreateAdmissionBatchScreen />} />
        <Route path="/admin/create-faqs" element={<CreateFaqsScreen />} />

        <Route path="/admin/enrollment-List" element={<EnrollmentList />} />
        <Route path="/admin/faqs-List" element={<FaqsListScreen />} />




        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/blog/:id/edit" element={<BlogEditScreen />} />
        <Route path="/admin/course/:id/edit" element={<EditCoursesScreen />} />
        <Route path="/admin/service/:id/edit" element={<EditSerciveScreen />} />
        <Route path="/admin/faqs/:id/edit" element={<EditFaqsScreen />} />


        <Route path="/admin/admissionbatchlist" element={<AdmissionBatchListScreen />} />
        <Route path="/admin/admission-batch/:id/edit" element={<EditAdmissionBatchScreen />} />


        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();