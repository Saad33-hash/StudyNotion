import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ Review_Count, Star_Size = 16 }) => {
  const rating = parseFloat(Review_Count) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={`full-${index}`}
          size={Star_Size}
          className="text-yellow-100"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <FaStarHalfAlt size={Star_Size} className="text-yellow-100" />
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          size={Star_Size}
          className="text-yellow-100"
        />
      ))}
    </div>
  );
};

export default RatingStars;