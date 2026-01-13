import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../Services/apiConnector";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";

const CourseBuilder = ({ setStep, courseId, courseData, setCourseData }) => {
  const { token } = useSelector((state) => state.auth);

  const [sections, setSections] = useState(courseData?.courseContent || []);
  const [sectionName, setSectionName] = useState("");
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Add/Edit Section Modal State
  const [showAddLecture, setShowAddLecture] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    duration: "",
    video: null,
  });
  const [lectureLoading, setLectureLoading] = useState(false);

  // Toggle section expand
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Create Section
  const handleCreateSection = async () => {
    if (!sectionName.trim()) {
      toast.error("Section name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/sectionandsubsection/createSection`,
        {
          sectionName: sectionName,
          courseId: courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Section created successfully");
        const updatedCourse = response.data.updatedSection;
        setSections(updatedCourse.courseContent);
        setCourseData(updatedCourse);
        setSectionName("");
      }
    } catch (error) {
      console.log("Error creating section:", error);
      toast.error("Failed to create section");
    }
    setLoading(false);
  };

  // Update Section
  const handleUpdateSection = async (sectionId) => {
    if (!editSectionName.trim()) {
      toast.error("Section name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnector(
        "PUT",
        `${process.env.REACT_APP_BASE_URL}/sectionandsubsection/updateSection`,
        {
          sectionName: editSectionName,
          sectionId: sectionId,
          courseId: courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Section updated successfully");
        const updatedSections = sections.map((sec) =>
          sec._id === sectionId ? { ...sec, sectionName: editSectionName } : sec
        );
        setSections(updatedSections);
        setEditingSectionId(null);
        setEditSectionName("");
      }
    } catch (error) {
      console.log("Error updating section:", error);
      toast.error("Failed to update section");
    }
    setLoading(false);
  };

  // Delete Section
  const handleDeleteSection = async (sectionId) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "DELETE",
        `${process.env.REACT_APP_BASE_URL}/sectionandsubsection/deleteSection/${sectionId}/${courseId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Section deleted successfully");
        setSections(sections.filter((sec) => sec._id !== sectionId));
      }
    } catch (error) {
      console.log("Error deleting section:", error);
      toast.error("Failed to delete section");
    }
    setLoading(false);
  };

  // Add Lecture
  const handleAddLecture = async () => {
    if (!lectureData.title.trim()) {
      toast.error("Lecture title is required");
      return;
    }
    if (!lectureData.description.trim()) {
      toast.error("Lecture description is required");
      return;
    }
    if (!lectureData.duration.trim()) {
      toast.error("Lecture duration is required");
      return;
    }
    if (!lectureData.video) {
      toast.error("Please upload a video");
      return;
    }

    setLectureLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("description", lectureData.description);
      formData.append("duration", lectureData.duration);
      formData.append("videourl", lectureData.video);
      formData.append("sectionId", currentSectionId);

      const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/sectionandsubsection/createsubSection`,
        formData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.data.success) {
        toast.success("Lecture added successfully");
        // Controller returns section with subSection IDs only (not populated)
        // So we manually add the new lecture to our state
        const newLecture = {
          _id: response.data.data.subSection[response.data.data.subSection.length - 1],
          title: lectureData.title,
          description: lectureData.description,
          duration: lectureData.duration,
        };
        const updatedSections = sections.map((sec) => {
          if (sec._id === currentSectionId) {
            return {
              ...sec,
              subSection: [...(sec.subSection || []), newLecture],
            };
          }
          return sec;
        });
        setSections(updatedSections);
        setShowAddLecture(false);
        setLectureData({ title: "", description: "", duration: "", video: null });
        setCurrentSectionId(null);
      }
    } catch (error) {
      console.log("Error adding lecture:", error);
      toast.error("Failed to add lecture");
    }
    setLectureLoading(false);
  };

  // Delete Lecture
  const handleDeleteLecture = async (sectionId, subSectionId) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${process.env.REACT_APP_BASE_URL}/sectionandsubsection/deletesubSection`,
        {
          subSectionId: subSectionId,
          sectionId: sectionId,
          courseId: courseId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Lecture deleted successfully");
        const updatedSections = sections.map((sec) => {
          if (sec._id === sectionId) {
            return {
              ...sec,
              subSection: sec.subSection.filter((sub) => sub._id !== subSectionId),
            };
          }
          return sec;
        });
        setSections(updatedSections);
      }
    } catch (error) {
      console.log("Error deleting lecture:", error);
      toast.error("Failed to delete lecture");
    }
  };

  return (
    <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-richblack-5 mb-6">
        Course Builder
      </h2>

      {/* Add Section Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a section to build your course"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
        />
        <button
          onClick={handleCreateSection}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-yellow-50 text-yellow-50 font-semibold rounded-lg hover:bg-yellow-900 transition-all disabled:opacity-50"
        >
          <FiPlus />
          Create Section
        </button>
      </div>

      {/* Sections List */}
      <div className="flex flex-col gap-4 mb-6">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-richblack-400">
            No sections added yet. Create a section to get started.
          </div>
        ) : (
          sections.map((section) => (
            <div
              key={section._id}
              className="bg-richblack-700 rounded-lg border border-richblack-600 overflow-hidden"
            >
              {/* Section Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection(section._id)}
              >
                <div className="flex items-center gap-3">
                  {expandedSections[section._id] ? (
                    <IoChevronUp className="text-richblack-300" />
                  ) : (
                    <IoChevronDown className="text-richblack-300" />
                  )}
                  {editingSectionId === section._id ? (
                    <input
                      type="text"
                      value={editSectionName}
                      onChange={(e) => setEditSectionName(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 bg-richblack-800 text-richblack-5 border border-richblack-500 rounded"
                    />
                  ) : (
                    <span className="text-richblack-5 font-medium">
                      {section.sectionName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingSectionId === section._id ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateSection(section._id);
                        }}
                        className="text-caribbeangreen-300 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSectionId(null);
                        }}
                        className="text-richblack-400 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSectionId(section._id);
                          setEditSectionName(section.sectionName);
                        }}
                        className="p-1 text-richblack-300 hover:text-yellow-50"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(section._id);
                        }}
                        className="p-1 text-richblack-300 hover:text-pink-300"
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Section Content (Lectures) */}
              {expandedSections[section._id] && (
                <div className="border-t border-richblack-600 p-4">
                  {/* Lectures List */}
                  {section.subSection?.length > 0 ? (
                    <div className="flex flex-col gap-2 mb-4">
                      {section.subSection.map((lecture) => (
                        <div
                          key={lecture._id}
                          className="flex items-center justify-between p-3 bg-richblack-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <MdOutlineVideoLibrary className="text-richblack-300" />
                            <span className="text-richblack-100 text-sm">
                              {lecture.title}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteLecture(section._id, lecture._id)
                            }
                            className="p-1 text-richblack-400 hover:text-pink-300"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-richblack-400 text-sm mb-4">
                      No lectures in this section
                    </p>
                  )}

                  {/* Add Lecture Button */}
                  <button
                    onClick={() => {
                      setCurrentSectionId(section._id);
                      setShowAddLecture(true);
                    }}
                    className="flex items-center gap-2 text-yellow-50 text-sm hover:text-yellow-100"
                  >
                    <FiPlus />
                    Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-3 bg-richblack-700 text-richblack-5 font-semibold rounded-lg hover:bg-richblack-600 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={sections.length === 0}
          className="px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Add Lecture Modal */}
      {showAddLecture && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-xl border border-richblack-700 w-full max-w-md shadow-xl">
            <div className="p-6 border-b border-richblack-700">
              <h3 className="text-lg font-semibold text-richblack-5">
                Add Lecture
              </h3>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Lecture Title */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-200">
                  Lecture Title <span className="text-pink-300">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter lecture title"
                  value={lectureData.title}
                  onChange={(e) =>
                    setLectureData({ ...lectureData, title: e.target.value })
                  }
                  className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                />
              </div>

              {/* Lecture Description */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-200">
                  Lecture Description <span className="text-pink-300">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter lecture description"
                  value={lectureData.description}
                  onChange={(e) =>
                    setLectureData({
                      ...lectureData,
                      description: e.target.value,
                    })
                  }
                  className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
                />
              </div>

              {/* Lecture Duration */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-200">
                  Duration <span className="text-pink-300">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:30 or 15 mins"
                  value={lectureData.duration}
                  onChange={(e) =>
                    setLectureData({ ...lectureData, duration: e.target.value })
                  }
                  className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                />
              </div>

              {/* Video Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-richblack-200">
                  Lecture Video <span className="text-pink-300">*</span>
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setLectureData({ ...lectureData, video: e.target.files[0] })
                  }
                  className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-yellow-900 file:text-yellow-50 file:cursor-pointer"
                />
                {lectureData.video && (
                  <span className="text-xs text-caribbeangreen-300">
                    {lectureData.video.name}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-richblack-700 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddLecture(false);
                  setLectureData({ title: "", description: "", duration: "", video: null });
                  setCurrentSectionId(null);
                }}
                className="px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLecture}
                disabled={lectureLoading}
                className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all disabled:opacity-50"
              >
                {lectureLoading ? "Adding..." : "Add Lecture"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBuilder;