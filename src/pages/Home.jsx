import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import CodingSkillText from '../components/Core/HomePage/CodingSkillText';
import Button from '../components/Core/HomePage/Button';
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/Core/HomePage/CodeBlocks"
import Fotter from "../components/Common/Fotter"
import LogoFullLight from "../assets/Logo/LogoFullLight.png"
import TimeLineSection from '../components/Core/HomePage/TimeLineSection';
import LearningAnyLanguageSection from "../components/Core/HomePage/LearningAnyLanguageSection"
import BecomeAnInstructor from '../components/Core/HomePage/BecomeAnInstructor';
import ReviewOtherLearner from "../components/Core/HomePage/ReviewOtherLearner"
import PowerOfCode from '../components/Core/HomePage/PowerOfCode';
import ReviewSlider from '../components/Common/ReviewSlider';
const Home = () => {
  return (

    <div>

      {/* section1 */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-3 py-12'>

        {/* Become an Instructor Button */}
        <Link to={"/signUp"}>
          <div className='group mx-auto rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 hover:shadow-none shadow-[0_1px_0_0_rgba(255,255,255,0.18)]'>
            <div className='flex flex-row items-center gap-2 rounded-full px-6 py-[6px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p className='text-sm'>Become an Instructor</p>
              <FaArrowRight className='text-sm' />
            </div>
          </div>
        </Link>

        {/* Main Heading */}
        <div className='text-center text-4xl font-semibold mt-4'>
          Empower Your Future with <CodingSkillText text={"Coding Skills"} />
        </div>

        {/* Subheading Description */}
        <div className='mt-4 w-[70%] text-center text-base font-medium text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-row gap-7 mt-8'>
          <Button isActive={true} linkto={"/signUp"}>
            Learn More
          </Button>
          <Button isActive={false} linkto={"/logIn"}>
            Book a Demo
          </Button>
        </div>

        {/* video */}
        <div className='mx-auto my-12 w-11/12 max-w-maxContent'>
          <div className='relative'>
            {/* Blue gradient shadow on top-left */}
            <div className='absolute -top-4 -left-4 w-full h-[500px] bg-gradient-to-br from-blue-400/40 to-caribbeangreen-200/40 rounded-lg -z-10'></div>

            <video
              className='relative w-full h-[500px] object-cover rounded-lg shadow-[20px_20px_0px_0px] shadow-white z-10'
              muted
              loop
              autoPlay
            >
              <source src={banner} type='video/mp4' />
            </video>
          </div>
        </div>


        {/*text and code block */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-center gap-10 w-11/12 mx-auto max-w-maxContent my-20 relative`}
        >
          <CodeBlocks
            position="flex-col lg:flex-row"
            heading={
              <div className="text-3xl sm:text-3xl lg:text-3xl font-semibold text-center lg:text-left lg:max-w-[90%]">
                Unlock your
                <CodingSkillText text={" Coding potential "} />
                with our online courses.
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            btn1={{
              btntext: "Try it Yourself",
              isActive: true,
              linkto: "/signUp",
            }}
            btn2={{
              btntext: "Learn more",
              isActive: false,
              linkto: "/logIn",
            }}
            codeblock={`
<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>
</body>
</html>
`}
            codecolor={"text-brown-100"}
            gradient={"bg-yellow-50"}
          />
        </div>



        <div
          className={`flex flex-col lg:flex-row-reverse justify-between items-center w-11/12 mx-auto my-20 relative`}
        >
          <CodeBlocks
            position="flex-col lg:flex-row-reverse"
            heading={
              <div className="text-1xl sm:text-3xl lg:text-3xl font-semibold text-center lg:text-left">
                Start
                <CodingSkillText text={" Coding in seconds "} />
              </div>
            }
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            btn1={{
              btntext: "Continue learning",
              isActive: true,
              linkto: "/LogIn",
            }}
            btn2={{
              btntext: "Learn more",
              isActive: false,
              linkto: "/SignUp",
            }}
            codeblock={`
<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>
</body>
</html>
`}
            codecolor="text-brown-100"
            gradient="bg-yellow-50"
          />
        </div>



        <div className='flex flex-col justify-center items-center gap-3  '>
          <PowerOfCode></PowerOfCode>
        </div>



      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-300">
        {/* Two buttons */}
        <div className="bg-backgroundimg h-[200px] sm:h-[250px] w-full">
          <div className="flex flex-col max-w-maxContent justify-between items-center mx-auto gap-5 px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mt-24 sm:mt-40">
              <Button isActive={true} linkto={"signUp"}>
                <div className="flex gap-1 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>

              <Button isActive={false} linkto={"/signUp"}>
                <div>Learn more</div>
              </Button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-11 mt-10 sm:mt-16 px-4 text-richblack-300">
          {/* Left - Heading */}
          <div className="text-2xl sm:text-3xl max-w-full lg:max-w-[28%] text-left text-richblack-600">
            Get the Skills you need for a{" "}
            <CodingSkillText text={"job that is in demand."} className="font-bold" />
          </div>

          {/* Right - Description */}
          <div className="max-w-full lg:max-w-[32%] flex justify-center items-start flex-col gap-6 lg:gap-9 text-left">
            <div className="text-richblack-800 text-sm font-light">
              The modern StudyNotion is the dictates its own terms. Today, to be a
              competitive specialist requires more than professional skills.
            </div>

            <div>
              <Button isActive={true}>Learn More</Button>
            </div>
          </div>
        </div>

        <TimeLineSection />

        <LearningAnyLanguageSection />
      </div>



      {/*section3  */}
      <div className='w-full flex justify-center items-center gap-10 p-5 bg-richblack-900 mt-14'>
        <BecomeAnInstructor></BecomeAnInstructor>

        <ReviewOtherLearner></ReviewOtherLearner>
      </div>





      {/*section 4 */}

      <ReviewSlider />

      <Fotter img={LogoFullLight} />




    </div>







  )
}

export default Home
