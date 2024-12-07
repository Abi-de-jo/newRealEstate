import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";

const ResCard = ({ card }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check if the property is liked on mount
  useEffect(() => {
    const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];
    setIsLiked(likedProperties.includes(card.id));
  }, [card.id]);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === card.images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [card.images.length]);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];

    if (isLiked) {
      const updatedLikes = likedProperties.filter((id) => id !== card.id);
      localStorage.setItem("likedProperties", JSON.stringify(updatedLikes));
    } else {
      likedProperties.push(card.id);
      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
    }

    setIsLiked(!isLiked);
  };

  if (!isVisible) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-red-500";
      case "agentsAchieve":
        return "bg-yellow-500";
      case "agentDraft":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className="flex flex-col items-start cursor-pointer bg-white rounded-lg shadow-lg shadow-gray-400/50 transform transition-all duration-300 hover:shadow-md hover:translate-y-1"
      onClick={() => navigate(`../residencies/${card.id}`)}
    >
      {/* Carousel Section */}
      <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md ${getStatusColor(card.status)}`}
        >
          {card.status || "Unknown"}
        </div>

        <img
          src={card.images[currentImage]}
          alt={card.title || "Property"}
          className="w-full h-full object-cover"
        />
        {card.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === 0 ? card.images.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev === card.images.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Top Actions */}
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            className="rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
            onClick={handleLikeClick}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "text-red-500 fill-current" : ""}`} />
          </button>
          <button
            className="rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between w-full px-3 py-2">
        {card.discount ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through">${card.price}</span>
            <span className="text-orange-500 text-lg font-semibold">${card.discount}</span>
          </div>
        ) : (
          <span className="text-black text-lg font-semibold">
            <span className="text-orange-500">$</span>
            {card.price || "N/A"}
          </span>
        )}
      </div>

      {/* Title and Address */}
      <div className="px-3 mt-2 flex flex-col gap-1">
        <span className="text-base font-bold">{truncate(card.title || "Untitled Property", { length: 25 })}</span>
        <p className="text-sm text-gray-500">
          {truncate(card.address || "Address not available", { length: 30 })}
        </p>
      </div>

      {/* Facilities Section */}
      <div className="flex gap-2 px-3 mt-2 flex-wrap">
        {card.bathrooms && (
          <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
            <FaShower size={16} className="text-blue-500" />
            <span className="text-xs text-gray-700">{card.bathrooms} Bath</span>
          </div>
        )}
        {card.parking && (
          <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
            <AiTwotoneCar size={16} className="text-blue-500" />
            <span className="text-xs text-gray-700">{card.parking} Park</span>
          </div>
        )}
        {card.rooms && (
          <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
            <MdMeetingRoom size={16} className="text-blue-500" />
            <span className="text-xs text-gray-700">{card.rooms} Room</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResCard;
