import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setlogout } from "../../../Slices/authSlice";
import { setLogoutUser } from "../../../Slices/ProfileSlice";
import toast from "react-hot-toast";

// Icons
import { VscAccount, VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FiPlusCircle } from "react-icons/fi";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const isInstructor = user?.accountType === "Instructor";

  // Student sidebar links
  const studentLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: <VscAccount className="text-lg" />,
    },
    {
      id: 2,
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: <LuBookMarked className="text-lg" />,
    },
    {
      id: 3,
      name: "Wishlist",
      path: "/dashboard/wishlist",
      icon: <MdOutlineShoppingCart className="text-lg" />,
    },
    {
      id: 4,
      name: "Purchase History",
      path: "/dashboard/purchase-history",
      icon: <RiHistoryLine className="text-lg" />,
    },
    {
      id: 5,
      name: "Courses",
      path: "/dashboard/courses",
      icon: <HiOutlineBookOpen className="text-lg" />,
    },
  ];

  // Instructor sidebar links
  const instructorLinks = [
    {
      id: 1,
      name: "My Profile",
      path: "/dashboard/my-profile",
      icon: <VscAccount className="text-lg" />,
    },
  ];

  const instructorCourseLinks = [
    {
      id: 2,
      name: "My Courses",
      path: "/dashboard/my-courses",
      icon: <HiOutlineBookOpen className="text-lg" />,
    },
    {
      id: 3,
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: <FiPlusCircle className="text-lg" />,
    },
  ];

  // Handle logout
  const handleLogout = () => {
    dispatch(setlogout());
    dispatch(setLogoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed lg:relative top-0 left-0 z-50
          h-screen lg:h-auto lg:min-h-[calc(100vh-60px)]
          w-[220px] min-w-[220px]
          bg-richblack-800 border-r border-richblack-700
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sticky inner navigation */}
        <div className="lg:sticky lg:top-0 flex flex-col py-6 h-screen lg:h-[calc(100vh-60px)] overflow-y-auto">
          {/* Close button for mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 text-richblack-200 hover:text-richblack-5"
            onClick={() => setIsMobileOpen(false)}
          >
            <IoClose className="text-2xl" />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3 py-4 ">
            {/* Profile Links */}
            {(isInstructor ? instructorLinks : studentLinks).map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-yellow-800 text-yellow-50 border-l-4 border-yellow-50"
                      : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                  }`
                }
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </NavLink>
            ))}

            {/* Instructor Section */}
            {isInstructor && (
              <>
                {/* Divider with heading */}
                <div className="flex items-center gap-2 px-4 py-4">
                  <div className="h-[1px]  bg-richblack-600" />
                </div>
                <p className="px-4 text-xs text-richblack-400 font-semibold tracking-wider mb-2">
                  INSTRUCTOR
                </p>

                {/* Instructor Course Links */}
                {instructorCourseLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-yellow-800 text-yellow-50 border-l-4 border-yellow-50"
                          : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                      }`
                    }
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                  </NavLink>
                ))}
              </>
            )}
          </nav>

          {/* Divider */}
          <div className="h-[1px] bg-richblack-600 mx-4 my-2" />

          {/* Bottom Links - Settings & Logout */}
          <div className="flex flex-col gap-1 px-3 py-2">
            <NavLink
              to="/dashboard/settings"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-yellow-800 text-yellow-50 border-l-4 border-yellow-50"
                    : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                }`
              }
            >
              <VscSettingsGear className="text-lg" />
              <span className="text-sm font-medium">Settings</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50 transition-all duration-200"
            >
              <VscSignOut className="text-lg" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;