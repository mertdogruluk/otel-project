import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number; // 0 - 5 arası decimal puan
  size?: number; // opsiyonel, yıldız boyutu
}

const Rating: React.FC<RatingProps> = ({ value, size = 16 }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Tam yıldızlar */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-yellow-400 text-yellow-400 mr-1"
        />
      ))}

      {/* Yarım yıldız */}
      {halfStar && (
        <StarHalf
          size={size}
          className="fill-yellow-400 text-yellow-400 mr-1"
        />
      )}

      {/* Boş yıldızlar */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-gray-300 mr-1"
        />
      ))}

      {/* Puan yazısı */}
      <span className="text-sm text-gray-700 ml-1">{value.toFixed(1)}</span>
    </div>
  );
};

export default Rating;
