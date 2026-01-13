import React from 'react'
import CodingSkillText from './CodingSkillText'
import know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import Button from './Button'

const LearningAnyLanguageSection = () => {
  return (
    <div className='flex flex-col justify-center items-start lg:items-center gap-5 mt-16 lg:mt-28 pb-16 px-4'>
      
      <div className='font-semibold text-2xl sm:text-3xl text-richblack-800 text-left lg:text-center'>
        Your swiss knife for 
        <CodingSkillText text={"learning any language"}/>
      </div>

      <div className='max-w-full lg:max-w-[42%] text-left lg:text-center text-sm sm:text-base text-richblack-700'>
        Using spin making multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center w-full lg:ml-[5px]'>
        <img 
          src={know_your_progress} 
          alt="knowyourprogress"  
          className='object-contain h-[280px] sm:h-[350px] lg:h-[400px] lg:-mr-32 -rotate-3 lg:rotate-0' 
        />
        <img 
          src={compare_with_others} 
          alt="comparewithother"  
          className='object-contain h-[280px] sm:h-[350px] lg:h-[500px] -mt-10 lg:mt-0'
        />
        <img 
          src={Plan_your_lessons} 
          alt="planyourlessons" 
          className='object-contain h-[280px] sm:h-[350px] lg:h-[450px] lg:-ml-36 -mt-10 lg:mt-0 rotate-3 lg:rotate-0' 
        />
      </div>

      <div className="self-center">
        <Button isActive={true} linkto={"/signUp"}>
          <div>
            Learn More
          </div>
        </Button>
      </div>
    </div>
  )
}

export default LearningAnyLanguageSection