import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LogIn from "./components/Core/Auth/LogIn";
import Home from "./pages/Home";
import VerifyEmailafterSign from "./components/Core/Auth/VerifyEmailafterSign";
import FormSigningIn from "./components/Core/Auth/FormSigningIn";
import NavBar from "./components/Common/NavBar";
import ForgotPassword from "./components/Core/Auth/ForgotPassword";
import ResendEmail from "./components/Core/Auth/ResendEmail";
import UpdatePssword from "./components/Core/Auth/UpdatePssword";
import ResetComplete from "./components/Core/Auth/ResetComplete";
import ContactPage from "./pages/ContactPage";
import AboutUS from "./components/Common/About/AboutUS";
import CatalogePage from "./pages/CatalogePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseViewer from "./pages/CourseViewer";

// Dashboard imports
import Dashboard from "./pages/Dashboard";
import Myprofile from "./components/Core/Dashboard/Myprofile";
import EnrolledCourses from "./components/Core/Dashboard/EnrolledCourses";
import Wishlist from "./components/Core/Dashboard/Wishlist";
import Checkout from "./components/Core/Dashboard/Checkout";
import PurchaseHistory from "./components/Core/Dashboard/PurchaseHistory";
import Settings from "./components/Core/Dashboard/Settings";
import Courses from "./components/Core/Dashboard/Courses";
import MyCourses from "./components/Core/Dashboard/MyCourses";
import AddCourse from "./components/Core/Dashboard/AddCourse";

function App() {
  const location = useLocation();
  
  // Hide NavBar on CourseViewer page
  const hideNavBar = location.pathname.startsWith("/view-course");

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {!hideNavBar && <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={<FormSigningIn />} />
        <Route path="logIn" element={<LogIn />} />
        <Route path="/verifyemail" element={<VerifyEmailafterSign />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resendEmail" element={<ResendEmail />} />
        <Route path="/update-password/:token" element={<UpdatePssword />} />
        <Route path="/resetComplete" element={<ResetComplete />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/catalog/:categoryId" element={<CatalogePage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

        {/* Course Viewer - Full screen */}
        <Route path="/view-course/:courseId" element={<CourseViewer />} />

        {/* Dashboard Routes - Nested */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Myprofile />} />
          <Route path="my-profile" element={<Myprofile />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="courses" element={<Courses />} />
           <Route path="my-courses" element={<MyCourses />} />
             <Route path="add-course" element={<AddCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;