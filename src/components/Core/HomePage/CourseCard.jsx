import React from 'react'

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
   <div
  onClick={() => setCurrentCard(cardData.heading)}
  className={`
    relative flex flex-col gap-4 
    w-full sm:w-[80%] md:w-[45%] lg:w-[25%]
    p-2  cursor-pointer transition-all duration-300
    ${
      currentCard === cardData.heading
        ? "bg-richblack-5 text-richblack-800 border border-richblue-300 shadow-[6px_6px_0px_#FACC15]"
        : "bg-richblack-900 text-richblack-300 hover:bg-richblack-800 hover:scale-[1.02]"
    }
  `}
>
 
  <div className="font-bold text-lg lg:text-xl text-richblack-50 mb-1">
    {cardData.heading}
  </div>

  
  <div className="text-sm lg:text-base text-richblack-300 flex-grow">
    {cardData.description}
  </div>

  <div className="flex justify-between items-center mt-3 pt-3 border-t border-dotted border-richblue-500">
    <p className="text-richblue-300 text-sm font-semibold">{cardData.level}</p>
    <p className="text-richblue-300 text-sm font-semibold">
      {cardData.lessionNumber} Lessons
    </p>
  </div>
</div>

  )
}

export default CourseCard
