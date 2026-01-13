import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import CourseInformationForm from "./AddCourse/CourseInformationForm";
import CourseBuilder from "./AddCourse/CourseBuilder";
import PublishCourse from "./AddCourse/PublishCourse";

const AddCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [courseId, setCourseId] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // Steps data
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  // Course upload tips
  const uploadTips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important notes to all enrolled students at once.",
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate("/dashboard/my-courses")}
        className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-all w-fit"
      >
        <IoChevronBack />
        <span className="text-sm">Back to My Courses</span>
      </button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Stepper */}
          <div className="flex items-center justify-between w-full max-w-[600px]">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold
                      ${
                        step >= s.id
                          ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                          : "border-richblack-600 text-richblack-400 bg-richblack-800"
                      }
                    `}
                  >
                    {s.id}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      step >= s.id ? "text-richblack-5" : "text-richblack-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>

                {/* Dotted Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 border-t-2 border-dashed mx-2 mt-[-20px] ${
                      step > s.id ? "border-yellow-50" : "border-richblack-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content based on Step */}
          {step === 1 && (
            <CourseInformationForm
              setStep={setStep}
              setCourseId={setCourseId}
              setCourseData={setCourseData}
            />
          )}
          {step === 2 && (
            <CourseBuilder
              setStep={setStep}
              courseId={courseId}
              courseData={courseData}
              setCourseData={setCourseData}
            />
          )}
          {step === 3 && (
            <PublishCourse
              setStep={setStep}
              courseId={courseId}
              courseData={courseData}
            />
          )}
        </div>

        {/* Right Side - Tips */}
        <div className="lg:w-[350px] lg:min-w-[350px]">
          <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center gap-2">
              ⚡ Course Upload Tips
            </h3>
            <ul className="flex flex-col gap-3">
              {uploadTips.map((tip, index) => (
                <li
                  key={index}
                  className="text-sm text-richblack-300 flex items-start gap-2"
                >
                  <span className="text-yellow-50 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;