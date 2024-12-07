import React from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from 'lodash';
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md"; // Room Icon
import { AiTwotoneCar } from "react-icons/ai"; // Car Icon
import Heart from "../Heart/Heart";

const UserFavCard = ({ card = {} }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start r-card cursor-pointer bg-white rounded-xl shadow-2xl shadow-gray-400/50 transform transition-all duration-300 hover:shadow-[5px_5px_20px_rgba(0,0,0,0.25)] hover:translate-y-1"
      onClick={() => navigate(`../UserFav/${card?.id}`)}
    >
      {/* Image */}
      <img
        src={card?.images?.[0] || "default-image.jpg"} // Fallback image if card.images[0] is undefined
        alt="home"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      
      {/* Heart and Price */}
      <div className="relative w-full p-4">
        <Heart id={card?.id} className="absolute top-2 right-2 z-10" />
        
        <span className="text-black text-xl font-semibold mt-2">
          <span className="text-orange-500">$</span>
          <span>{card?.price || "N/A"}</span>
        </span>
      </div>
      
      {/* Title */}
      <div className="-mt-2 px-4">
        <span className="text-lg font-bold">
          {truncate(card?.title || "No Title", { length: 15 })}
        </span>
      </div>

      {/* Features */}
      <div className="flex flex-wrap sm:flex-nowrap items-center mt-1 space-x-4 px-4 pb-4 text-gray-600">
        <span className="flex items-center text-sm mb-2 sm:mb-0">
          <FaShower className="mr-1 text-lg" /> {card?.bathrooms || 0} Bathroom
        </span>
        <span className="flex items-center text-sm mb-2 sm:mb-0">
          <AiTwotoneCar className="mr-1 text-lg" /> {card?.parking || 0} Parking
        </span>
        <span className="flex items-center text-sm">
          <MdMeetingRoom className="mr-1 text-lg" /> {card?.rooms || 0} Room
        </span>
      </div>
    </div>
  );
};

export default UserFavCard;
