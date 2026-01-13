import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import CodingSkillText from './CodingSkillText'
import Button from "./Button"
import { FaArrowRight } from 'react-icons/fa'

const BecomeAnInstructor = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row justify-center items-start lg:items-center gap-12 lg:gap-16 p-5 m-5 ml-0 lg:ml-[5%] px-4'>
      {/* Image Section */}
      <div className='relative shadow-[-20px_-20px_0px_0px] shadow-white w-full lg:w-auto'>
        <div className='max-w-full'>
          <img
            src={instructor}
            alt="instructor"
            className='object-contain h-[280px] sm:h-[320px] lg:h-[350px] shadow-richblack-5'
          />
        </div>
      </div>

      {/* Text Section */}
      <div className='flex flex-col gap-4 lg:gap-6 justify-center items-start w-full lg:max-w-[40%]'>
        <div className='text-white text-2xl sm:text-3xl font-light w-full lg:w-[50%]'>
          Become an
          <CodingSkillText text={"instructor"} />
        </div>

        <div className='text-richblack-300 text-sm sm:text-base w-full lg:w-[80%]'>
          Instructors from around the world teach millions of students on
          studyNotion. We provide the tools and skills to teach what you love.
        </div>

        <div className='flex gap-1'>
          <Button isActive={true} linkto={"/signUp"}>
            <div className='flex items-center gap-1'>
              Start teaching Today
              <FaArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BecomeAnInstructor