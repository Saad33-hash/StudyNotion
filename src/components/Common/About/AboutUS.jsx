import React from "react";
import OurFoundingStory from "./OurFoundingStory";
import CodingSkillText from "../../Core/HomePage/CodingSkillText";
import aboutus1 from "../../../assets/Images/aboutus1.webp";
import aboutus2 from "../../../assets/Images/aboutus2.webp";
import aboutus3 from "../../../assets/Images/aboutus3.webp";
import vision from "../../../assets/Images/FoundingStory.png";
import OurVision from "./OurVision";
import Button from "../../Core/HomePage/Button";
import ContactUs from "./ContactUs"
import Fotter from "../Fotter"
import ReviewSlider from "../ReviewSlider"
const AboutUS = () => {
  return (
    <div className="w-full bg-richblack-900">
      {/*about us */}
      <div className="flex flex-col gap-4 justify-center items-center bg-richblack-700 w-full py-16 px-4">
        <p className="text-sm text-richblack-300 font-semibold px-6 py-2 rounded-full">
          About us
        </p>

        <div className="text-3xl md:text-4xl text-richblack-5 font-bold text-center max-w-[900px]">
          <p>Driving Innovation in Online Education for a</p>
          <CodingSkillText text={"Brighter Future"} className="text-center" />
        </div>

        <div className="text-richblack-300 text-center max-w-[800px] font-semibold text-base leading-relaxed mt-4 mb-32">
          <p>
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>
      </div>

      {/*three image along iwth text */}
      <div className="bg-richblack-900 w-full relative border-b-2 border-richblack-700">
        {/* Images Section */}
        <div className="flex gap-4 md:gap-6 absolute left-1/2 -translate-x-1/2 -top-32 w-[90%] max-w-[1200px] justify-center px-4">
          <img
            src={aboutus1}
            alt="Student learning online"
            className="w-[30%] h-auto rounded-lg shadow-lg border border-richblack-700"
          />
          <img
            src={aboutus2}
            alt="Student studying"
            className="w-[30%] h-auto rounded-lg shadow-lg border border-richblack-700"
          />
          <img
            src={aboutus3}
            alt="Student writing notes"
            className="w-[30%] h-auto rounded-lg shadow-lg border border-richblack-700"
          />
        </div>

        {/* Quote Section */}
        <div className="flex justify-center items-center pt-48 pb-20 px-4 `">
          <div className="text-2xl md:text-3xl text-center text-richblack-100 max-w-[1000px] leading-relaxed font-semibold">
            <p>
              <span className="text-richblack-500 text-3xl leading-none">
                "
              </span>
              We are passionate about revolutionizing the way we learn. Our
              innovative platform{" "}
              <CodingSkillText text={"combines technology"} />,{" "}
              <CodingSkillText text={"expertise"} />, and community to create an{" "}
              <CodingSkillText text={"unparalleled educational experience"} />.
              <span className="text-richblack-500 text-3xl leading-none">
                "
              </span>
            </p>
          </div>
        </div>
      </div>

      {/*section2 - Founding Story */}
      <div className="w-full bg-richblack-900 py-20">
        <div className="w-11/12 max-w-maxContent mx-auto">
          {/* First Row - Founding Story */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-14 lg:gap-20 xl:gap-36 mb-20 lg:mb-32">
            {/* Text Content */}
            <div className="flex flex-col gap-4 max-w-[550px] lg:max-w-[450px] w-full">
              <h2 className="text-3xl font-semibold text-start mb-2">
                <OurFoundingStory text="Our Founding Story" />
              </h2>

              <p className="text-richblack-300 text-base font-medium leading-relaxed">
                Our e-learning platform was born out of shared vision and
                passion for transforming education. It all begins with a group
                of educators, technologists, and lifelong learners who
                recognized the need for accessible, flexible, and high quality
                learning opportunities in a rapidly evolving digital world.
              </p>

              <p className="text-richblack-300 text-base font-medium leading-relaxed">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-auto max-w-[550px] lg:max-w-[450px]">
              <img
                src={vision}
                alt="Our founding vision"
                className="w-full h-auto rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          {/* Second Row - Vision & Mission */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-14 lg:gap-20 xl:gap-36">
            {/* Our Vision */}
            <div className="flex flex-col gap-4 max-w-[550px] lg:max-w-[450px] w-full">
              <h2 className="text-3xl font-semibold text-start mb-2">
                <OurVision text="Our Vision" />
              </h2>

              <p className="text-richblack-300 text-base font-medium leading-relaxed">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col gap-4 max-w-[550px] lg:max-w-[450px] w-full">
              <h2 className="text-3xl font-semibold text-start mb-2">
                <CodingSkillText text="Our Mission" />
              </h2>

              <p className="text-richblack-300 text-base font-medium leading-relaxed">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3:stats*/}
      <div className="flex flex-wrap justify-center md:justify-evenly items-center gap-2 sm:gap-6 md:gap-2 p-6 sm:p-6 md:p-5 bg-richblack-800">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-4 justify-center items-center mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 min-w-[120px] sm:min-w-[140px]">
          <p className="text-2xl sm:text-3xl md:text-3xl text-richblack-50 font-bold">
            5K
          </p>
          <p className="text-sm sm:text-base md:text-base text-richblack-500 font-semibold text-center">
            Active Students
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center items-center mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 min-w-[120px] sm:min-w-[140px]">
          <p className="text-2xl sm:text-3xl md:text-3xl text-richblack-50 font-bold">
            10+
          </p>
          <p className="text-sm sm:text-base md:text-base text-richblack-500 font-semibold text-center">
            Mentors
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center items-center mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 min-w-[120px] sm:min-w-[140px]">
          <p className="text-2xl sm:text-3xl md:text-3xl text-richblack-50 font-bold">
            200+
          </p>
          <p className="text-sm sm:text-base md:text-base text-richblack-500 font-semibold text-center">
            Courses
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center items-center mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 min-w-[120px] sm:min-w-[140px]">
          <p className="text-2xl sm:text-3xl md:text-3xl text-richblack-50 font-bold">
            50+
          </p>
          <p className="text-sm sm:text-base md:text-base text-richblack-500 font-semibold text-center">
            Awards
          </p>
        </div>
      </div>

      {/* section 4 */}

      <div className="flex flex-col justify-center items-center bg-richblack-900 p-5 m-auto mt-10  content-center">
        {/* upper three divs */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          <div className="flex flex-col gap-y-2 w-full md:w-auto">
            <p className="text-gray-50 font-bold text-3xl">
              World-Class Learning for{" "}
            </p>
            <p className="text-3xl font-bold">
              <CodingSkillText text="Anyone, Anywhere" />
            </p>
            <p className="text-richblack-300 text-base max-w-[500px] mb-3">
              StudyNotion partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to indivuals and organizations worldwide.
            </p>

            <div className="w-fit">
              <Button isActive={true}>Learn More</Button>
            </div>
          </div>

          <div className="flex flex-col justify-start items-center gap-y-3 bg-richblack-600 w-full md:max-w-[300px] p-5">
            <p className="font-semibold text-2xl text-richblack-5">
              Curriculum Based on Industry Needs
            </p>
            <p className="text-pure-greys-100 text-base">
              Save time and money! The Belajar curriculum is made to be easier
              to understand and in line with industry needs
            </p>
          </div>

          <div className="flex flex-col justify-start items-center gap-y-3 bg-richblack-800 w-full md:max-w-[300px] h-[210px] p-5">
            <div className="flex w-full md:w-[200px] text-start md:mr-14">
              <p className="font-semibold text-2xl text-richblack-5 ">
                Our Learning Methods
              </p>
            </div>

            <p className="text-pure-greys-100 text-base">
              The learning process uses the namelt online and offline.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          <div className="flex flex-col justify-start items-center gap-y-3 w-full md:w-[200px] h-[210px] p-5  md:flex">
          </div>



          <div className="flex flex-col justify-start items-center gap-y-3 bg-richblack-600 w-full md:max-w-[300px] h-[210px] p-5">
            <div className="flex w-full md:w-[200px] text-start md:mr-14">
              <p className="font-semibold text-2xl text-richblack-5 text-start md:mr-14 ">Certifications</p>
            </div>

            <p className="text-pure-greys-100 text-base mt-5">You will get a certificate that can be used as a Certifications during job hunting.</p>

          </div>



          <div className="flex flex-col justify-start items-center gap-y-3 bg-richblack-800 w-full md:max-w-[300px] h-[210px] p-5">
            <div className="flex w-full md:w-[200px] flex-col md:mr-14">

              <p className="font-semibold text-2xl text-richblack-5 ">Rating</p>
              <p className="font-semibold text-2xl text-richblack-5 text-start ">"Auto-grading"</p>

            </div>

            <p className="text-pure-greys-100 text-base">You will immediately get feedback during the learning process without having to wait for an answer or response fromthe mentor.</p>

          </div>


          <div className="flex flex-col justify-start items-center gap-y-3 bg-richblack-800 w-full md:max-w-[300px] h-[210px] p-5">
            <div className="flex flex-col w-full md:w-[200px] text-start md:mr-14">
              <p className="font-semibold text-2xl text-richblack-5 ">Ready to</p>
              <p className="font-semibold text-2xl text-richblack-5 ">Work</p>
            </div>

            <p className="text-pure-greys-100 text-base">Connected with over 150+ hiring partners, you will have the oppourtunity to find a job after graduating from our program</p>

          </div>
        </div>
      </div>


      {/* section 5 */}

      <div className="flex justify-center items-center flex-col gap-y-5 m-auto mt-10 p-5">

        <div className="flex justify-center items-center flex-col gap-y-2 ">
          <h1 className="text-richblack-5 font-bold text-3xl">Get in Touch</h1>
          <p className="text-richblack-200 text-base">We'd love to here for you. Please fill out this form</p>
        </div>

        <ContactUs />

        <ReviewSlider />

        <Fotter />


      </div>




    </div>
  );
};

export default AboutUS;
