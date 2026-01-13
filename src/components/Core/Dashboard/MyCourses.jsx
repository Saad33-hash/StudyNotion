import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../../Services/apiConnector";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Fetch instructor courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await apiConnector(
          "GET",
          `${process.env.REACT_APP_BASE_URL}/Courseroutes/getInstructorCourses`,
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        if (response.data.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.log("Error fetching courses:", error);
        toast.error("Failed to fetch courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, [token]);

  // Calculate total duration of course
  const getTotalDuration = (courseContent) => {
    if (!courseContent || courseContent.length === 0) return "0m";

    let totalMinutes = 0;
    courseContent.forEach((section) => {
      section?.subSection?.forEach((subSec) => {
        // Parse duration like "19:30" or just minutes
        const duration = subSec?.duration || "0";
        if (duration.includes(":")) {
          const [mins, secs] = duration.split(":");
          totalMinutes += parseInt(mins) + parseInt(secs) / 60;
        } else {
          totalMinutes += parseInt(duration);
        }
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle delete click
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!courseToDelete) return;

    setDeleteLoading(courseToDelete._id);
    try {
      const response = await apiConnector(
        "DELETE",
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/deleteCourse/${courseToDelete._id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        toast.success("Course deleted successfully");
        setCourses(courses.filter((c) => c._id !== courseToDelete._id));
      } else {
        toast.error(response.data.message || "Failed to delete course");
      }
    } catch (error) {
      console.log("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
    setDeleteLoading(null);
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header with Breadcrumb and New Course Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Breadcrumb */}
        <div>
          <nav className="flex items-center gap-2 text-sm text-richblack-300 mb-2">
            <span
              onClick={() => navigate("/")}
              className="hover:text-richblack-50 cursor-pointer"
            >
              Home
            </span>
            <span>/</span>
            <span
              onClick={() => navigate("/dashboard/my-profile")}
              className="hover:text-richblack-50 cursor-pointer"
            >
              Dashboard
            </span>
            <span>/</span>
            <span className="text-yellow-50">My Courses</span>
          </nav>
          <h1 className="text-2xl font-bold text-richblack-5">My Courses</h1>
        </div>

        {/* New Course Button */}
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-2 px-5 py-2.5 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all"
        >
          <FiPlus className="text-lg" />
          New Course
        </button>
      </div>

      {/* Courses Table */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-richblack-800 rounded-xl border border-richblack-700">
          <p className="text-xl text-richblack-300">No courses created yet</p>
          <p className="text-sm text-richblack-400">
            Start by creating your first course
          </p>
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="flex items-center gap-2 px-5 py-2.5 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all mt-2"
          >
            <FiPlus className="text-lg" />
            Create Course
          </button>
        </div>
      ) : (
        <div className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-richblack-700 text-richblack-200 text-sm font-medium">
            <div className="col-span-6">COURSES</div>
            <div className="col-span-2">DURATION</div>
            <div className="col-span-2">PRICE</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {/* Course Rows */}
          <div className="divide-y divide-richblack-700">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 hover:bg-richblack-750 transition-all"
              >
                {/* Course Info */}
                <div className="col-span-6 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-[120px] h-[80px] rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Course Details */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-richblack-5 font-semibold line-clamp-1">
                      {course.courseName}
                    </h3>
                    <p className="text-richblack-300 text-sm line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      {/* Status */}
                      <div
                        className={`flex items-center gap-1 text-xs ${course.status === "Published"
                            ? "text-yellow-50"
                            : "text-pink-300"
                          }`}
                      >
                        {course.status === "Published" ? (
                          <BsCheckCircle className="text-sm" />
                        ) : (
                          <BsCircle className="text-sm" />
                        )}
                        <span>{course.status || "Draft"}</span>
                      </div>
                      {/* Separator */}
                      <span className="text-richblack-500">|</span>
                      {/* Created Date */}
                      <span className="text-richblack-400 text-xs">
                        {formatDate(course.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-2 flex items-center md:justify-start">
                  <div className="md:hidden text-richblack-400 text-sm mr-2">
                    Duration:
                  </div>
                  <div className="flex items-center gap-1 text-richblack-100">
                    <HiOutlineClock className="text-richblack-300" />
                    <span>{getTotalDuration(course.courseContent)}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 flex items-center md:justify-start">
                  <div className="md:hidden text-richblack-400 text-sm mr-2">
                    Price:
                  </div>
                  <span className="text-richblack-5 font-semibold">
                    Rs. {course.Price?.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="p-2 rounded-lg bg-richblack-700 text-richblack-200 hover:bg-richblack-600 hover:text-yellow-50 transition-all"
                    title="Edit Course"
                  >
                    <FiEdit2 className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course)}
                    disabled={deleteLoading === course._id}
                    className="p-2 rounded-lg bg-richblack-700 text-richblack-200 hover:bg-pink-700 hover:text-pink-50 transition-all disabled:opacity-50"
                    title="Delete Course"
                  >
                    {deleteLoading === course._id ? (
                      <div className="w-[18px] h-[18px] border-2 border-t-transparent border-pink-50 rounded-full animate-spin"></div>
                    ) : (
                      <FiTrash2 className="text-lg" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-richblack-800 rounded-xl border border-richblack-700 w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-richblack-700">
              <h2 className="text-xl font-semibold text-richblack-5">
                Delete Course
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-richblack-200">
                Are you sure you want to delete{" "}
                <span className="text-richblack-5 font-semibold">
                  "{courseToDelete?.courseName}"
                </span>
                ?
              </p>
              <p className="text-richblack-400 text-sm mt-2">
                This will also remove the course from all enrolled students.
                This action cannot be undone.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-richblack-700 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCourseToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-richblack-700 text-richblack-5 hover:bg-richblack-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-all disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;