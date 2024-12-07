import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBath } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdHouse } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Helper function to calculate time difference
const getTimeDifference = (updatedAt) => {
  const now = new Date();
  const updatedTime = new Date(updatedAt);
  const diffInMs = now - updatedTime;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours >= 24) {
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "1hr ago" : `${diffInHours}hrs ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? "1min ago" : `${diffInMinutes}mins ago`;
  } else {
    return diffInSeconds === 1 ? "1sec ago" : `${diffInSeconds}secs ago`;
  }
};

const DiscountCard = ({ card }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // Load initial like state from localStorage
  useEffect(() => {
    const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];
    setIsLiked(likedProperties.includes(card.id));
  }, [card.id]);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent parent onClick

    const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];

    if (isLiked) {
      // Remove from liked properties
      const updatedLikes = likedProperties.filter((id) => id !== card.id);
      localStorage.setItem("likedProperties", JSON.stringify(updatedLikes));
    } else {
      // Add to liked properties
      likedProperties.push(card.id);
      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
    }

    setIsLiked(!isLiked); // Toggle like state
  };

  // Filter out properties older than 2 days
  const updatedTime = new Date(card.updatedAt);
  const now = new Date();
  const diffInHours = (now - updatedTime) / (1000 * 60 * 60);
  if (diffInHours > 48) {
    return null; // Do not render this card
  }

  return (
    <div
      className="flex flex-col w-full h-[350px] items-start bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer border hover:shadow-xl transition-shadow"
      onClick={() => navigate(`/properties/${card.id}`)}
    >
      {/* Image Section with Overlay */}
      <div className="relative w-full h-72 overflow-hidden group">
        {card.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="property"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 1}s`, // Stagger fade-in effect
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* "New" Badge */}
        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          {getTimeDifference(card.updatedAt)}
        </span>

        {/* Globe Icon */}
        <span className="absolute bottom-3 left-3 bg-white p-2 rounded-full shadow-md">
          <FiGlobe className="text-gray-600" />
        </span>

        {/* Heart Icon */}
        <button
          className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-transform duration-300 ${
            isLiked ? "scale-110 text-red-500" : "text-gray-500"
          } hover:scale-125`}
          onClick={handleLikeClick}
        >
          {isLiked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
        </button>
      </div>

      {/* Property Details */}
      <div className="p-4 w-full">
        <span className="text-green-600 text-sm font-medium">{card.propertyType}</span>
        <div className="flex items-center space-x-2 mt-1">
          {card.discount ? (
            <>
              <span className="text-gray-500 line-through text-lg">${card.price}</span>
              <span className="text-orange-600 text-xl font-bold">
                ${card.discount}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">${card.price}</span>
          )}
        </div>        
        <div className="flex items-center text-gray-700 text-sm mt-2 space-x-3">
          <span className="flex items-center">
            <FaBath className="mr-1" />
            <span className="text-black">{card.bathrooms}</span> Bath
          </span>
          <span className="flex items-center">
            <MdHouse className="mr-1" />
            <span className="text-black">{card.rooms}</span> Bed
          </span>
          <span>
            <span className="text-black">{card.area}</span> Sqft
          </span>
        </div>
        <div className="text-gray-600 text-sm mt-2">{card.title}</div>
      </div>
    </div>
  );
};

export default DiscountCard;
