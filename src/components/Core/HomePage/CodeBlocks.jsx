import React from 'react'
import Button from "../HomePage/Button"
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({ 
    position, 
    heading, 
    subheading, 
    btn1, 
    btn2, 
    codeblock, 
    gradient, 
    codecolor 
}) => {
  return (
    <div className={`flex ${position} w-full max-w-maxContent mx-auto justify-between items-center gap-10 lg:gap-20 py-10 px-4`}>
      
    
      <div className='w-full lg:w-[45%] flex flex-col gap-4'>
        {heading}
        
        <div className='text-richblack-300 text-base font-medium leading-relaxed'>
          {subheading}
        </div>
        
        <div className='flex flex-wrap gap-6 mt-6'>
          <Button isActive={btn1.isActive} linkto={btn1.linkto}>
            <div className='flex gap-2 items-center'>
              {btn1.btntext}
              <FaArrowRight className='text-sm' />
            </div>
          </Button>
          
          <Button isActive={btn2.isActive} linkto={btn2.linkto}>
            {btn2.btntext}
          </Button>
        </div>
      </div>

      
      <div className='relative flex w-full lg:w-[48%] h-fit'>
        
      
        <div className={`absolute -top-4 -left-4 w-full h-full ${gradient} opacity-20 blur-3xl rounded-xl pointer-events-none`}></div>
        
       
        <div className='relative flex w-full bg-gradient-to-br from-richblack-800 to-richblack-900 bg-opacity-60 backdrop-blur-sm border border-richblack-700 rounded-lg overflow-hidden shadow-[0_0_30px_0_rgba(0,0,0,0.5)]'>
          

          <div className='flex flex-col text-center py-4 px-2 text-richblack-400 font-mono font-bold text-sm select-none bg-richblack-900 bg-opacity-40 border-r border-richblack-700 min-w-[45px]'>
            <p className='leading-[1.6rem]'>1</p>
            <p className='leading-[1.6rem]'>2</p>
            <p className='leading-[1.6rem]'>3</p>
            <p className='leading-[1.6rem]'>4</p>
            <p className='leading-[1.6rem]'>5</p>
            <p className='leading-[1.6rem]'>6</p>
            <p className='leading-[1.6rem]'>7</p>
            <p className='leading-[1.6rem]'>8</p>
            <p className='leading-[1.6rem]'>9</p>
            <p className='leading-[1.6rem]'>10</p>
            <p className='leading-[1.6rem]'>11</p>
          </div>
          
          {/* Code Content */}
          <div className={`w-full py-4 px-4 ${codecolor} font-mono text-sm font-medium overflow-x-auto`}>
            <TypeAnimation
              sequence={[codeblock.trim(), 5000, ""]}
              wrapper="pre"
              style={{
                whiteSpace: "pre-line",
                display: "block",
                lineHeight: "1.6rem"
              }}
              omitDeletionAnimation={true}
              repeat={Infinity}
              cursor={true}
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CodeBlocks