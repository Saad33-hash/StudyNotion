import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import Timelineimage from "../../../assets/Images/TimelineImage.png";

const timeLineData = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully commited to the success of company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between max-w-maxContent mx-auto py-10 lg:py-14 px-4 w-full gap-10 lg:gap-16">
      <div className="flex flex-col justify-center items-start w-full lg:w-[45%] ml-0 lg:ml-28">
        {timeLineData.map((element, index) => {
          return (
            <div className="flex justify-center items-start gap-4 sm:gap-6" key={index}>
              <div className="flex justify-center items-center w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] flex-shrink-0">
                <img src={element.logo} alt="logos" />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-center items-start gap-1 pb-6 sm:pb-8">
                  <h1 className="font-semibold text-richblack-800 text-base sm:text-lg">
                    {element.heading}
                  </h1>
                  <p className="text-sm sm:text-base text-richblack-700 leading-relaxed">
                    {element.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative flex flex-col justify-center items-center w-full">
        <div className="relative w-full max-w-[534px]">
          <img
            src={Timelineimage}
            alt="timelineimage"
            className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover shadow-[4px_4px_8px_rgba(0,0,0,0.7)] bg-white"
          />

          <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4 lg:left-1/2 lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[25%] lg:right-auto w-[70%] sm:w-[60%] lg:w-[80%] bg-caribbeangreen-700 py-4 sm:py-5 lg:py-7 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 rounded-md">
            <div className="flex justify-center items-center gap-2 border-b sm:border-b-0 sm:border-r border-caribbeangreen-300 pb-3 sm:pb-0 sm:pr-6 lg:pr-8 w-full sm:w-auto">
              <h1 className="text-white font-bold text-2xl sm:text-3xl">10</h1>
              <div className="flex flex-col font-light text-xs sm:text-sm text-pure-greys-200">
                <span>Years</span>
                <span>Experience</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <h1 className="text-white font-bold text-2xl sm:text-3xl">250</h1>
              <div className="flex flex-col font-light text-xs sm:text-sm text-pure-greys-200">
                <p>Types Of</p>
                <p>Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;