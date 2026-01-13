import React from 'react'
import { FaFacebook, FaInstagramSquare, FaGoogle, FaYoutube, FaHeart } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links';
import { Link } from 'react-router-dom';

const Fotter = ({img}) => {
  return (
    <div className='bg-richblack-800 w-full'>
      {/* Main Footer Content */}
      <div className='w-full max-w-maxContent mx-auto px-4 py-12'>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-5 border-b border-richblack-700'>
          
          {/* Left Section - Company, Resources, Support, Plans, Community */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6">
            
            {/* Column 1 - Company & Social Icons */}
            <div className='flex flex-col gap-3'>
              <img src={img} alt="studynotionlogo" className='h-8 w-auto object-contain mb-2' />
              
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[0].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[0].links.map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.link} 
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className='flex gap-3 mt-3 text-richblack-400'>
                <FaFacebook className='text-lg hover:text-richblack-50 cursor-pointer transition-colors duration-200' />
                <FaGoogle className='text-lg hover:text-richblack-50 cursor-pointer transition-colors duration-200' />
                <FaYoutube className='text-lg hover:text-richblack-50 cursor-pointer transition-colors duration-200' />
                <FaInstagramSquare className='text-lg hover:text-richblack-50 cursor-pointer transition-colors duration-200' />
              </div>
            </div>

            {/* Column 2 - Resources & Support */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[1].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[1].links.map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.link} 
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className='mt-8'>
                <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                  {FooterLink2[2].title}
                </h3>
                <div className='flex flex-col gap-2 mt-3'>
                  {FooterLink2[2].links.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.link}
                      className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3 - Plans & Community */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[3].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[3].links.map((link, index) => (
                  <Link
                    to={link.link}
                    key={index}
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className='mt-8'>
                <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                  {FooterLink2[4].title}
                </h3>
                <div className='flex flex-col gap-2 mt-3'>
                  {FooterLink2[4].links.map((link, index) => (
                    <Link
                      to={link.link}
                      key={index}
                      className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Subjects, Languages, Career Building */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-6">
            
            {/* Column 4 - Subjects */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[5].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[5].links.map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.link} 
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 5 - Languages */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[6].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[6].links.map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.link} 
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 6 - Career Building */}
            <div className='flex flex-col gap-3'>
              <h3 className='text-richblack-50 font-semibold text-base leading-6'>
                {FooterLink2[7].title}
              </h3>
              <div className='flex flex-col gap-2'>
                {FooterLink2[7].links.map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.link} 
                    className="text-richblack-400 text-sm leading-6 hover:text-richblack-50 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer - Privacy & Copyright */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 pb-4'>
          <div className='flex flex-wrap gap-3 sm:gap-6 text-richblack-400 text-sm'>
            <Link to="/privacy-policy" className='hover:text-richblack-50 transition-colors duration-200'>
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className='hover:text-richblack-50 transition-colors duration-200'>
              Cookie Policy
            </Link>
            <Link to="/terms" className='hover:text-richblack-50 transition-colors duration-200'>
              Terms
            </Link>
          </div>

          <div className='text-richblack-400 text-sm flex items-center gap-1'>
            Made with <FaHeart className='text-pink-500' /> by Saad Tariq © 2025 Studynotion
          </div>
        </div>

      </div>
    </div>
  )
}

export default Fotter