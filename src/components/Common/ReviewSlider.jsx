import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch reviews from API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/Courseroutes/getAllReview`
                );
                const result = await response.json();

                if (result.success && result.data) {
                    setReviews(result.data);
                }
            } catch (error) {
                console.log("Error fetching reviews:", error);
            }
            setLoading(false);
        };

        fetchReviews();
    }, []);

    // Don't render if no reviews
    if (loading) {
        return (
            <div className="w-full py-12 bg-richblack-900">
                <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-yellow-50 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (reviews.length === 0) {
        return null;
    }

    // Duplicate reviews for seamless infinite scroll
    const duplicatedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <div className="w-full py-12 bg-richblack-900 overflow-hidden">
            {/* Section Title */}
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-richblack-5 text-center">
                    Reviews from other learners
                </h2>
                <div className="w-20 h-1 bg-yellow-50 mt-3 rounded-full"></div>
            </div>

            {/* Slider Container */}
            <div className="relative w-full">
                {/* Gradient Overlays for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-richblack-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-richblack-900 to-transparent z-10 pointer-events-none"></div>

                {/* Sliding Track */}
                <div className="flex gap-4 md:gap-6 animate-slide-left">
                    {duplicatedReviews.map((review, index) => (
                        <ReviewCard key={`${review._id}-${index}`} review={review} />
                    ))}
                </div>
            </div>

            {/* CSS Animation */}
            <style>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .animate-slide-left {
          animation: slideLeft 30s linear infinite;
        }
        
        .animate-slide-left:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

// Individual Review Card Component
const ReviewCard = ({ review }) => {
    const { user, course, rating, reviews: reviewText } = review;

    // Generate star rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`text-sm ${i <= rating ? "text-yellow-50" : "text-richblack-600"
                        }`}
                />
            );
        }
        return stars;
    };

    // Truncate review text
    const truncateText = (text, maxLength = 100) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <div className="flex-shrink-0 w-[280px] md:w-[320px] bg-richblack-800 rounded-xl p-5 border border-richblack-700 hover:border-richblack-600 transition-all duration-300 hover:shadow-lg hover:shadow-richblack-900/50">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
                {/* Avatar */}
                <img
                    src={
                        user?.image ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName || "U"}${user?.lastName || ""}&size=128`
                    }
                    alt={`${user?.firstName || "User"}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-richblack-600"
                />

                {/* Name & Course */}
                <div className="flex flex-col min-w-0">
                    <h4 className="text-richblack-5 font-semibold text-sm truncate">
                        {user?.firstName || "Anonymous"} {user?.lastName || ""}
                    </h4>
                    <p className="text-richblack-400 text-xs truncate">
                        {course?.courseName || "Course"}
                    </p>
                </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-3">
                {renderStars()}
                <span className="text-yellow-50 text-sm font-semibold ml-2">
                    {rating}.0
                </span>
            </div>

            {/* Review Text */}
            <p className="text-richblack-300 text-sm leading-relaxed min-h-[60px]">
                "{truncateText(reviewText, 120)}"
            </p>
        </div>
    );
};

export default ReviewSlider;
