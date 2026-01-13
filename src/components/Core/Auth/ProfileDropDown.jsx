import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setlogout } from "../../../Slices/authSlice"
import { setLogoutUser } from '../../../Slices/ProfileSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const [Click, setClick] = useState(false);

  function dropdown() {
    setClick(!Click)
  }

  function handleLogout() {
    dispatch(setlogout());
    dispatch(setLogoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successfully");
    setClick(false);
    navigate("/");
  }

  return (
    <div className='relative'>
      <div className='cursor-pointer'>
        <img
          src={user?.image}
          alt="user profile"
          className='w-9 h-9 rounded-full object-cover border-2 border-richblack-600 hover:border-yellow-50 transition-all duration-200'
          onClick={dropdown}
        />
      </div>
      {Click && (
        <div className='absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[180px]'>
          {/* Arrow */}
          <div className='absolute right-3 -top-2 h-4 w-4 rotate-45 bg-richblack-800 border-l border-t border-richblack-700'></div>

          {/* Dropdown Menu */}
          <div className='bg-richblack-800 border border-richblack-700 rounded-lg shadow-xl overflow-hidden mt-2'>
            <ul className='py-2'>

              {/* Dashboard */}
              <Link to="/dashboard/my-profile" onClick={() => setClick(false)}>
                <li className='flex items-center gap-x-3 px-4 py-3 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200 cursor-pointer'>
                  <VscDashboard className='text-lg' />
                  <p className='text-sm font-medium'>Dashboard</p>
                </li>
              </Link>

              <div className='h-[1px] bg-richblack-700 my-1'></div>

              {/* Logout */}
              <li
                onClick={handleLogout}
                className='flex items-center gap-x-3 px-4 py-3 text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200 cursor-pointer'
              >
                <VscSignOut className='text-lg' />
                <p className='text-sm font-medium'>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown
