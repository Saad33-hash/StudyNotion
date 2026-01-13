import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../Services/operation/catalogAPI";
import CourseSlider from "../components/Core/Catalog/CourseSlider";
import CourseCard from "../components/Core/Catalog/CourseCard";
import Footer from "../components/Common/Fotter";

const CatalogePage = () => {
  const { categoryId } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");

  useEffect(() => {
    const fetchCatalogData = async () => {
      if (!categoryId) {
        return;
      }

      setLoading(true);
      try {
        const result = await getCatalogPageData(categoryId);

        if (result?.success) {
          setCatalogPageData(result.data);
        }
      } catch (error) {
        console.log("Error fetching catalog page data:", error);
      }
      setLoading(false);
    };

    fetchCatalogData();
  }, [categoryId]);

  // Loading state with yellow spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-richblack-200 text-sm">Loading courses...</p>
        </div>
      </div>
    );
  }

  // No data found
  if (!catalogPageData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-richblack-900">
        <p className="text-2xl text-richblack-5">Category not found</p>
      </div>
    );
  }

  return (
    <div className="bg-richblack-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-richblack-800 border-b border-richblack-700">
        <div className="mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 px-4 py-12 max-w-maxContent">
          
          {/* Left Side - Title & Description */}
          <div className="flex flex-col gap-4 lg:w-[65%]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-richblack-300">
              <span className="hover:text-richblack-50 cursor-pointer transition-colors duration-200">
                Home
              </span>
              <span>/</span>
              <span className="hover:text-richblack-50 cursor-pointer transition-colors duration-200">
                Catalog
              </span>
              <span>/</span>
              <span className="text-yellow-50 font-medium">
                {catalogPageData?.selectedCategory?.names}
              </span>
            </nav>

            {/* Category Title */}
            <h1 className="text-4xl font-bold text-richblack-5">
              {catalogPageData?.selectedCategory?.names}
            </h1>

            {/* Category Description */}
            <p className="text-base text-richblack-200 leading-relaxed max-w-[600px]">
              {catalogPageData?.selectedCategory?.description}
            </p>
          </div>

          {/* Right Side - Related Resources */}
          <div className="lg:w-[30%]">
            <h2 className="text-lg font-bold text-richblack-5 mb-4">
              Related Resources
            </h2>
            <div className="flex flex-col gap-2 content-center ml-4">
              <li className="text-richblack-100">Documentation</li>
              <li className="text-richblack-100">Cheat Sheets</li>
              <li className="text-richblack-100">Articles</li>
              <li className="text-richblack-100">Community</li>
              <li className="text-richblack-100">Projects</li>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        {/* Section 1: Courses to get you started */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-2">
            Courses to get you started
          </h2>

          {/* Tabs */}
          <div className="flex gap-x-4 border-b border-richblack-600 mb-6">
            <button
              className={`py-2 px-1 text-sm transition-all duration-200 ${
                activeTab === "popular"
                  ? "text-yellow-50 border-b-2 border-yellow-50"
                  : "text-richblack-200 hover:text-richblack-50"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Most Popular
            </button>
            <button
              className={`py-2 px-1 text-sm transition-all duration-200 ${
                activeTab === "new"
                  ? "text-yellow-50 border-b-2 border-yellow-50"
                  : "text-richblack-200 hover:text-richblack-50"
              }`}
              onClick={() => setActiveTab("new")}
            >
              New
            </button>
          </div>

          {/* Course Slider */}
          <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
        </div>

        {/* Section 2: Top Courses in Category + Other Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-6">
            Top courses in {catalogPageData?.selectedCategory?.names} and{" "}
            {catalogPageData?.otherCategories?.[0]?.names || "More"}
          </h2>

          <CourseSlider
            Courses={catalogPageData?.otherCategories
              ?.flatMap((cat) => cat.course)
              ?.slice(0, 10)}
          />
        </div>

        {/* Section 3: Frequently Bought Together */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-6">
            Frequently Bought Together
          </h2>

          {/* Grid Layout for Top Selling */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.getTopSellingCourse?.length > 0 ? (
              catalogPageData?.getTopSellingCourse
                ?.slice(0, 6)
                .map((course, index) => (
                  <CourseCard
                    course={course}
                    key={index}
                    Height={"h-[200px]"}
                  />
                ))
            ) : (
              <p className="text-richblack-5 col-span-full">
                No courses available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CatalogePage;