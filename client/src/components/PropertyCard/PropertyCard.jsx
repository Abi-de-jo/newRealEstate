import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBath } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdHouse } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import useLikes from "../../hooks/useLikes";
 
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
    return diffInSeconds === 1 ? "1sec ago" : `${diffInSeconds}secs ago`;;
  }
};

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const role = localStorage.getItem("role");
  const { data: likedProperties, isLoading, refetch } = useLikes();

  // Load initial like state from localStorage and check against fetched likes
  useEffect(() => {
    const localLikedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];
    if (likedProperties && !isLoading) {
      const isLikedFromServer = likedProperties.includes(card.id);
      setIsLiked(isLikedFromServer);
      if (isLikedFromServer) {
        console.log(`User liked this property: ${card.id}`);
      } else {
        console.log(`User has not liked this property: ${card.id}`);
      }
      // Update localStorage to match server data
      localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
    } else {
      setIsLiked(localLikedProperties.includes(card.id));
    }
  }, [card.id, likedProperties, isLoading]);

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent parent onClick
  
    const PropertyId = card.id;
    const likedUserEmail = localStorage.getItem("email");
  
    if (isLiked) {
      // If it's already liked, send a request to remove the like
      try {
        await axios.delete(`http://localhost:3000/api/user/dislikes/${PropertyId}`, {
          data: { likedUserEmail }, // Pass user email in request body
        });
  
        console.log("PROPERTY DISLIKED");
      } catch (error) {
        console.error("Error while removing like", error);
      }
    } else {
      // If it's not liked, send a request to add the like
      try {
        await axios.post(`http://localhost:3000/api/user/likes/${PropertyId}`, {
          likedUserEmail,
        });
  
        console.log("PROPERTY LIKED");
      } catch (error) {
        console.error("Error while adding like", error);
      }
    }
  
    // Update the like state
    setIsLiked(!isLiked);
    // Refetch the likes to update the data
    refetch();
  };
  
  return (
    <div
      className="flex flex-col w-full h-[400px] items-start bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer border hover:shadow-xl transition-shadow"
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
        {card.video && (
          <video
            src={card.video}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0 group-hover:opacity-100"
            loop
            autoPlay
            muted // Ensures the video plays automatically without requiring user interaction
            playsInline // Optimizes playback for mobile devices
            style={{
              transitionDelay: `${card.images.length * 1}s`, // Delay based on number of images
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* UpdatedAt Badge */}
        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          {getTimeDifference(card.updatedAt)}
        </span>

        {/* Globe Icon */}
        <span className="absolute bottom-3 left-3 bg-white p-2 rounded-full shadow-md">
          <FiGlobe className="text-gray-600" />
        </span>

        {/* Heart Icon */}
        {role === "user" && (
          <button
            className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-transform duration-300 ${
              isLiked ? "scale-110 text-red-500" : "text-gray-500"
            } hover:scale-125`}
            onClick={handleLikeClick}
          >
            {isLiked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
          </button>
        )}
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
            {card.bathrooms} Bath
          </span>
          <span className="flex items-center">
            <MdHouse className="mr-1" />
            {card.rooms} Room
          </span>
          <span>{card.area} sqft</span>
        </div>
        <div className="text-gray-600 text-sm mt-2">{card.title}</div>
      </div>
    </div>
  );
};

export default PropertyCard;

