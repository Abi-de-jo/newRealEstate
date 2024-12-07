import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBath } from "react-icons/fa";
import { FiHeart, FiGlobe } from "react-icons/fi";
import { MdHouse } from "react-icons/md";

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
    const remainingSeconds = diffInSeconds % 60;
    return remainingSeconds === 0
      ? `${diffInMinutes}mins ago`
      : `${diffInMinutes}mins ${remainingSeconds}secs ago`;
  } else {
    return diffInSeconds === 1 ? "1sec ago" : `${diffInSeconds}secs ago`;
  }
};

const NewCard = ({ card }) => {
  const navigate = useNavigate();
  const [timeDifference, setTimeDifference] = useState(getTimeDifference(card.updatedAt));

  // Update the time difference every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(getTimeDifference(card.updatedAt));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [card.updatedAt]);

  return (
    <div
      className="flex flex-col w-full h-[350px] items-start bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer border hover:shadow-xl transition-shadow"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      {/* Image Section with Overlay and Automatic Fade Animation on Hover */}
      <div className="relative w-full h-72 overflow-hidden group">
        {card.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="property"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === 0
                ? "opacity-100 group-hover:opacity-0" // Default image visible, fades out on hover
                : "opacity-0 group-hover:opacity-100" // Other images fade in on hover
            }`}
            style={{
              transitionDelay: `${index * 1}s`, // Stagger fade-in effect based on index
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* UpdatedAt Badge */}
        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          {timeDifference}
        </span>

        {/* "New" Badge */}
        {card.isNew && (
          <span className="absolute top-10 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            New - {card.type}
          </span>
        )}

        {/* Globe Icon */}
        <span className="absolute bottom-3 left-3 bg-white p-2 rounded-full shadow-md">
          <FiGlobe className="text-gray-600" />
        </span>

        {/* Heart Icon */}
        <button
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-500"
          onClick={(e) => e.stopPropagation()}
        >
          <FiHeart size={18} />
        </button>
      </div>

      {/* Property Details */}
      <div className="p-4 w-full">
        <span className="text-green-600 text-sm font-medium">
          {card.propertyType}
        </span>
        <div className="text-2xl font-bold text-gray-900 mt-1">
          ${card.price}
        </div>
        <div className="flex items-center text-gray-700 text-sm mt-2 space-x-3">
          <span className="flex items-center">
            <FaBath className="mr-1" />
            <span className="text-black">{card.bathrooms} &nbsp;</span> Bath
          </span>
          <span className="flex items-center">
            <MdHouse className="mr-1" />
            <span className="text-black">{card.rooms} &nbsp;</span> Bed
          </span>
          <span className="text-black">{card.area} &nbsp;</span> Sqft
        </div>
        <div className="text-gray-600 text-sm mt-2">{card.title}</div>
      </div>
    </div>
  );
};

export default NewCard;
