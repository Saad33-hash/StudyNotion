import React, { useState } from 'react'
import CodingSkillText  from './CodingSkillText'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'

const TagsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
 
const PowerOfCode = () => {
const [currentTag,setCurrentTag]=useState(HomePageExplore[0].tag)
const [Courses,setCurrentCourse]=useState(HomePageExplore[0].courses);
const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

const setMyCard=(value)=>{
    setCurrentTag(value);
    {/* now wil get te courses */}
    const result=HomePageExplore.filter((course)=>course.tag === value);
    setCurrentCourse(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
}

  return (
   <div className="flex flex-col justify-center items-center gap-3 px-4 sm:px-6 md:px-10">

  {/* Heading */}
  <div className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
    Unlock the 
    <CodingSkillText text={"Power of Code"} />
  </div>

  {/* Subheading */}
  <div className="text-richblack-300 text-sm sm:text-base text-center sm:text-left">
    <p>Learn to Build anything You Can Imagine</p>
  </div>

  {/* Tabs Section (Hidden on small screens) */}
  <section className="hidden sm:flex lg:flex-row flex-wrap gap-2 bg-richblack-600 rounded-lg p-3 mt-6 justify-center sm:justify-start">
    {TagsName.map((element, index) => (
      <div
        key={index}
        onClick={() => setMyCard(element)}
        className={`text-[14px] sm:text-[16px] flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
          ${
            currentTag === element
              ? "bg-richblack-900 text-richblack-5 font-medium"
              : "text-richblack-200 hover:bg-richblue-900 hover:text-richblack-5"
          }`}
      >
        {element}
      </div>
    ))}
  </section>

  {/* Courses Section */}
  <section
    className="relative w-full flex flex-col sm:flex-col lg:flex-row gap-6 lg:gap-10 
               justify-center items-center sm:items-center  
               mt-10 lg:mt-12 lg:translate-y-[150px] z-10"
  >
    {Courses.map((element, index) => (
      <CourseCard
        key={index}
        cardData={element}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard}
      />
    ))}
  </section>
</div>

  )
}

export default PowerOfCode
