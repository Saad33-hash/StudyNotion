import React from 'react'
import chat from "../assets/Logo/chat.png"
import call from "../assets/Logo/phone-call.png"
import ContactUs from '../components/Common/About/ContactUs'
import world from "../assets/Logo/earth-globe.png"
import Fotter from "../components/Common/Fotter"
import ReviewSlider from "../components/Common/ReviewSlider"

const ContactPage = () => {
  return (
    <div className='flex flex-col justify-center w-full p-5 m-auto'>
      <div className='flex flex-col lg:flex-row justify-center gap-5 lg:gap-20 p-5 m-auto'>
        <div className='flex flex-col justify-center items-start gap-y-3 p-5 bg-richblack-800 h-auto lg:h-[300px] w-full lg:w-[350px] rounded-2xl mt-5 lg:mt-20'>
          <div className='flex gap-3 items-start justify-center'>
            <img className='h-[20px] w-[20px] text-richblack-25 bg-richblack-25' src={chat} alt="chatimage" />
            <div className='flex flex-col'>
              <h1 className='text-richblack-5 font-bold text-1xl'>Chat on us</h1>
              <p className='text-richblack-200 text-base'>Our friendly team is here to help</p>
            </div>
          </div>

          {/* second image */}
          <div className='flex gap-3 items-start justify-center'>
            <img className='h-[20px] w-[20px] text-richblack-25 bg-richblack-25' src={world} alt="worldimage" />
            <div className='flex flex-col'>
              <h1 className='text-richblack-5 font-bold text-1xl'>Vist Us</h1>
              <p className='text-richblack-200 text-base'>Come and say hello at our office HQ.</p>
              <p className='text-richblack-200 text-base'>Here is the location/address</p>
            </div>
          </div>

          {/* third image */}
          <div className='flex gap-3 items-start justify-center'>
            <img className='h-[20px] w-[20px] text-richblack-25 bg-richblack-25' src={call} alt="chatimage" />
            <div className='flex flex-col'>
              <h1 className='text-richblack-5 font-bold'>Call us</h1>
              <p className='text-richblack-200 text-base'>Mon - Fri from 8am to 5pm</p>
              <p className='text-richblack-200 text-base'>+123 456 7890</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-y-3 justify-center items-start border border-richblack-600 mt-5 lg:mt-28 p-5 m-auto rounded-lg w-full lg:w-auto'>
          <div className='flex flex-col justify-center items-start ml-0 lg:ml-4'>
            <p className='text-2xl font-bold text-richblack-5'>Got a idea? We've got the skills</p>
            <p className='text-2xl font-bold text-richblack-5'>Let's team up</p>
            <p className='text-richblack-200 text-base'>Tell us more about yourself and what you have got in mind</p>
          </div>
          <ContactUs />
        </div>
      </div>

      {/* Review Slider */}
      <ReviewSlider />

      <div className='mt-20'>
        <Fotter />
      </div>
    </div>
  )
}

export default ContactPage