import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBath } from "react-icons/fa";
import { MdOutlineBed, MdOutlineSquareFoot } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";

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
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
  } else {
    return diffInSeconds === 1 ? "1 second ago" : `${diffInSeconds} seconds ago`;
  }
};

const NewCard = ({ card }) => {
  const navigate = useNavigate();
  const [timeDifference, setTimeDifference] = useState(getTimeDifference(card.updatedAt));

  // Update the time difference every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(getTimeDifference(card.updatedAt));
    }, 60000); // Update every 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [card.updatedAt]);

  return (
    <div
      className="flex flex-col w-full h-[350px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
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
         
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{card.title}</h2>
        <p className="text-green-600 text-sm">{card.propertyType}</p>
        <div className="text-2xl font-bold text-gray-900 mt-2">${card.price}</div>
        <div className="flex items-center text-gray-600 text-sm mt-2 space-x-4">
          <span className="flex items-center">
            <MdOutlineBed className="text-gray-500 mr-1" />
            {card.rooms} Beds
          </span>
          <span className="flex items-center">
            <FaBath className="text-gray-500 mr-1" />
            {card.bathrooms} Baths
          </span>
          <span className="flex items-center">
            <MdOutlineSquareFoot className="text-gray-500 mr-1" />
            {card.area} Sqft
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
