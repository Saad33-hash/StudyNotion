import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/LogoFullLight.png"
import { NavbarLinks } from "../../data/navbar-links"
import { Link, useLocation, matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from "../Core/Auth/ProfileDropDown"
import { apiConnector } from '../../Services/apiConnector'
import { categories } from '../../Services/apis'
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fectchSubLink = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.category || [])
    } catch (error) {
      console.log("Could not fetch any data", error);
    }
  }

  useEffect(() => {
    fectchSubLink();
  }, [])

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className='bg-richblack-700 border-b-2 border-richblack-800'>
      <div className='flex justify-between items-center p-4 w-full max-w-maxContent mx-auto'>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="studyNotion logo" className='h-[30px]' loading='lazy' />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:block'>
          <ul className='flex gap-6 justify-center'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-1 group">
                    <p className="text-richblack-400 cursor-pointer">
                      {link.title}
                    </p>
                    <FaAngleDown className="text-richblack-400" />

                    {/* Dropdown Menu */}
                    <div className="absolute left-1/2 top-[120%] -translate-x-1/2 bg-richblack-5 text-richblack-900 rounded-md shadow-md flex flex-col gap-2 p-3 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible lg:w-[220px] z-50">
                      <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rounded rotate-45 bg-richblack-5'></div>
                      <div>
                        {subLinks?.length > 0 ? (
                          subLinks?.map((subLink, index) => (
                            <Link key={index} to={`/catalog/${subLink._id}`} className='flex flex-col gap-2 hover:bg-richblack-50 p-2 rounded'>
                              {subLink.names}
                            </Link>
                          ))
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-400"} hover:text-richblack-25 transition-all`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Section */}
        <div className='hidden md:flex items-center gap-x-4'>
          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className='relative'>
              <CiShoppingCart className='text-2xl text-richblack-100' />
              {totalItems > 0 && (
                <span className='absolute -top-1 -right-1 bg-yellow-50 text-richblack-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Login/Signup Buttons */}
          {token === null && (
            <>
              <Link to="/login">
                <button className='text-richblack-100 border border-richblack-600 px-3 py-1.5 rounded-md hover:bg-richblack-800 transition-all'>
                  Log in
                </button>
              </Link>
              <Link to="/signUp">
                <button className='bg-yellow-50 text-richblack-900 px-3 py-1.5 rounded-md hover:bg-yellow-100 transition-all'>
                  Sign up
                </button>
              </Link>
            </>
          )}

          {/* Profile Dropdown */}
          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-4 md:hidden'>
          {/* Cart for Mobile */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className='relative'>
              <CiShoppingCart className='text-2xl text-richblack-100' />
              {totalItems > 0 && (
                <span className='absolute -top-1 -right-1 bg-yellow-50 text-richblack-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Profile for Mobile */}
          {token !== null && <ProfileDropDown />}

          {/* Hamburger Icon */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <AiOutlineClose className='text-2xl text-richblack-100' />
            ) : (
              <AiOutlineMenu className='text-2xl text-richblack-100' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-richblack-800 border-t border-richblack-700'>
          <div className='flex flex-col p-4 gap-4'>
            {/* Nav Links */}
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <div className='flex flex-col gap-2'>
                    <p className='text-richblack-400 font-medium'>{link.title}</p>
                    <div className='pl-4 flex flex-col gap-2'>
                      {subLinks.length > 0 ? (
                        subLinks?.map((subLink, idx) => (
                          <Link
                            key={idx}
                            to={`/catalog/${subLink._id}`}
                            className='text-richblack-100 hover:text-yellow-50'
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subLink.names}
                          </Link>
                        ))
                      ) : (
                        <p className='text-richblack-300'>Loading...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-100"} hover:text-yellow-50`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}

            {/* Login/Signup for Mobile */}
            {token === null && (
              <div className='flex flex-col gap-3 pt-4 border-t border-richblack-700'>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full text-richblack-100 border border-richblack-600 px-3 py-2 rounded-md hover:bg-richblack-700 transition-all'>
                    Log in
                  </button>
                </Link>
                <Link to="/signUp" onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full bg-yellow-50 text-richblack-900 px-3 py-2 rounded-md hover:bg-yellow-100 transition-all'>
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar