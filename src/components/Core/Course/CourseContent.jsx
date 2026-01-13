import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";

const CourseAccordionBar = ({ section, isActive, handleActive }) => {
  return (
    <div className="border border-richblack-600 bg-richblack-700 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div
        onClick={() => handleActive(section._id)}
        className="flex items-center justify-between px-6 py-4 cursor-pointer bg-richblack-700 hover:bg-richblack-600 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <AiOutlineDown
            className={`text-richblack-300 transition-transform duration-300 ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
          />
          <p className="text-richblack-5 font-medium">{section?.sectionName}</p>
        </div>
        <p className="text-sm text-yellow-50">
          {section?.subSection?.length || 0} lecture(s)
        </p>
      </div>

      {/* Subsections - Collapsible Content */}
      <div
        className={`transition-all duration-300 ${
          isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {section?.subSection?.map((subSec, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-3 bg-richblack-900 border-t border-richblack-600"
          >
            <div className="flex items-center gap-3">
              <HiOutlineVideoCamera className="text-richblack-300" />
              <p className="text-richblack-100 text-sm">{subSec?.title}</p>
            </div>
            <p className="text-sm text-richblack-300">{subSec?.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseContent = ({ courseContent }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [collapseAll, setCollapseAll] = useState(false);

  // Calculate total lectures and duration
  const totalLectures = courseContent?.reduce(
    (acc, section) => acc + (section?.subSection?.length || 0),
    0
  );

  const handleActive = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleCollapseAll = () => {
    setCollapseAll(!collapseAll);
    setActiveSection(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Course Content Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-richblack-5">Course Content</h2>

        {/* Stats and Collapse Button */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-4 text-sm text-richblack-300">
            <span>{courseContent?.length || 0} section(s)</span>
            <span>•</span>
            <span>{totalLectures} lecture(s)</span>
          </div>
          <button
            onClick={handleCollapseAll}
            className="text-yellow-50 text-sm hover:underline"
          >
            Collapse all sections
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="flex flex-col gap-2">
        {courseContent?.map((section, index) => (
          <CourseAccordionBar
            key={index}
            section={section}
            isActive={!collapseAll && activeSection === section._id}
            handleActive={handleActive}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseContent;