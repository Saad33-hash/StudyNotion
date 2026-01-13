import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../../Services/apiConnector";
import toast from "react-hot-toast";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const CourseInformationForm = ({ setStep, setCourseId, setCourseData }) => {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    price: "",
    category: "",
    benefits: "",
    requirements: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiConnector(
          "GET",
          `${process.env.REACT_APP_BASE_URL}/Courseroutes/getAllCategory`
        );
        if (response.data.success) {
          setCategories(response.data.category || []);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  // Handle tag add
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseTitle.trim()) {
      newErrors.courseTitle = "Course title is required";
    }
    if (!formData.courseDescription.trim()) {
      newErrors.courseDescription = "Course description is required";
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.benefits.trim()) {
      newErrors.benefits = "Benefits are required";
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    }
    if (!thumbnail) {
      newErrors.thumbnail = "Course thumbnail is required";
    }
    if (tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("courseName", formData.courseTitle);
      submitData.append("description", formData.courseDescription);
      submitData.append("Price", formData.price);
      submitData.append("category", formData.category);
      submitData.append("whatYoulearn", formData.benefits);
      submitData.append("thumbnailImage", thumbnail);
      submitData.append("tags", JSON.stringify(tags));
      submitData.append("requirements", formData.requirements);
      submitData.append("status", "Draft");

      const response = await apiConnector(
        "POST",
        `${process.env.REACT_APP_BASE_URL}/Courseroutes/createCourse`,
        submitData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.data.success) {
        toast.success("Course created successfully!");
        setCourseId(response.data.data._id);
        setCourseData(response.data.data);
        setStep(2);
      } else {
        toast.error(response.data.message || "Failed to create course");
      }
    } catch (error) {
      console.log("Error creating course:", error);
      toast.error(error.response?.data?.message || "Failed to create course");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-richblack-800 border border-richblack-700 rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold text-richblack-5 mb-6">
        Course Information
      </h2>

      <div className="flex flex-col gap-5">
        {/* Course Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Course Title <span className="text-pink-300">*</span>
          </label>
          <input
            type="text"
            name="courseTitle"
            placeholder="Enter course title"
            value={formData.courseTitle}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
          />
          {errors.courseTitle && (
            <span className="text-xs text-pink-300">{errors.courseTitle}</span>
          )}
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Course Short Description <span className="text-pink-300">*</span>
          </label>
          <textarea
            rows={4}
            name="courseDescription"
            placeholder="Enter course description"
            value={formData.courseDescription}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
          />
          {errors.courseDescription && (
            <span className="text-xs text-pink-300">
              {errors.courseDescription}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Price <span className="text-pink-300">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-300">
              Rs.
            </span>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
            />
          </div>
          {errors.price && (
            <span className="text-xs text-pink-300">{errors.price}</span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Category <span className="text-pink-300">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 cursor-pointer"
          >
            <option value="">Select a category</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.names}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
          {errors.category && (
            <span className="text-xs text-pink-300">{errors.category}</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Tags <span className="text-pink-300">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags && tags.length > 0
              ? tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-yellow-900 text-yellow-50 rounded text-sm"
                >
                  {tag}
                  <IoClose
                    className="cursor-pointer hover:text-pink-300"
                    onClick={() => removeTag(tag)}
                  />
                </span>
              ))
              : null}
          </div>
          <input
            type="text"
            placeholder="Press Enter to add tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50"
          />
          {errors.tags && (
            <span className="text-xs text-pink-300">{errors.tags}</span>
          )}
        </div>

        {/* Course Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Course Thumbnail <span className="text-pink-300">*</span>
          </label>
          {thumbnailPreview ? (
            <div className="relative">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-2 right-2 p-1 bg-richblack-900/80 rounded-full text-pink-300 hover:text-pink-200"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-richblack-600 rounded-lg cursor-pointer hover:border-richblack-500 transition-all bg-richblack-700">
              <MdOutlineCloudUpload className="text-4xl text-yellow-50" />
              <p className="text-sm text-richblack-300 text-center">
                Drag and drop an image, or{" "}
                <span className="text-yellow-50 font-semibold">Browse</span>
              </p>
              <p className="text-xs text-richblack-400">
                Max 6MB each (12MB for videos)
              </p>
              <ul className="text-xs text-richblack-400 list-disc list-inside">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
          )}
          {errors.thumbnail && (
            <span className="text-xs text-pink-300">{errors.thumbnail}</span>
          )}
        </div>

        {/* Benefits of Course */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Benefits of the Course <span className="text-pink-300">*</span>
          </label>
          <textarea
            rows={4}
            name="benefits"
            placeholder="Enter benefits of the course"
            value={formData.benefits}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
          />
          {errors.benefits && (
            <span className="text-xs text-pink-300">{errors.benefits}</span>
          )}
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-richblack-200">
            Requirements/Instructions <span className="text-pink-300">*</span>
          </label>
          <textarea
            rows={4}
            name="requirements"
            placeholder="Enter requirements or instructions for students"
            value={formData.requirements}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-richblack-700 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50 resize-none"
          />
          {errors.requirements && (
            <span className="text-xs text-pink-300">{errors.requirements}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-all disabled:opacity-50"
          >
            {loading ? "Creating..." : "Next →"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseInformationForm;