import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../../Services/apiConnector";
import toast from "react-hot-toast";

const PublishCourse = ({ setStep, courseId, courseData }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle publish
  const handlePublish = async () => {
    if (!isPublic) {
      toast.error("Please check the checkbox to publish");
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnector(
        "PUT",
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/updateCourseStatus`,
        {
          courseId: courseId,
          status: "Published",
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Course published successfully!");
        navigate("/dashboard/my-courses");
      } else {
        toast.error(response.data.message || "Failed to publish course");
      }
    } catch (error) {
      console.log("Error publishing course:", error);
      toast.error("Failed to publish course");
    }
    setLoading(false);
  };

  // Save as draft
  const handleSaveAsDraft = () => {
    toast.success("Course saved as draft");
    navigate("/dashboard/my-courses");
  };

  return (
    <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-richblack-5 mb-6">
        Publish Settings
      </h2>

      {/* Course Preview */}
      <div className="bg-richblack-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-richblack-5 mb-3">
          {courseData?.courseName || "Your Course"}
        </h3>
        <p className="text-sm text-richblack-300 mb-4">
          {courseData?.description || "Course description"}
        </p>
        <div className="flex items-center gap-4 text-sm text-richblack-400">
          <span>
            Price: Rs. {courseData?.Price?.toLocaleString("en-IN") || "0"}
          </span>
          <span>|</span>
          <span>
            {courseData?.courseContent?.length || 0} Sections
          </span>
        </div>
      </div>

      {/* Publish Checkbox */}
      <div className="flex items-start gap-3 mb-8">
        <input
          type="checkbox"
          id="publish-checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-yellow-50 cursor-pointer"
        />
        <label
          htmlFor="publish-checkbox"
          className="text-richblack-200 cursor-pointer"
        >
          Make this course public and available for students to enroll
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 bg-richblack-700 text-richblack-5 font-semibold rounded-lg hover:bg-richblack-600 transition-all"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleSaveAsDraft}
            className="px-6 py-3 bg-richblack-600 text-richblack-5 font-semibold rounded-lg hover:bg-richblack-500 transition-all"
          >
            Save as Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;