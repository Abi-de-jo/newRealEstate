import React from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";

const OwnerTrackCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start cursor-pointer bg-white rounded-lg shadow-lg shadow-gray-400/50 transform transition-all duration-300 hover:shadow-md hover:translate-y-1"
      onClick={() => navigate(`../track-property/${card.id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
        <img
          src={card.images[0]}
          alt="home"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-1 right-1 w-16 rounded-full">
          <img src="./watermark.png" alt="" />
        </span>
      </div>

      {/* Price and Heart */}
      <div className="flex items-center justify-between w-full px-3 py-2">
        <span className="text-black text-lg font-semibold">
          <span className="text-orange-500">$</span>
          {card.price}
        </span>
      </div>

      {/* Title and Address */}
      <div className="px-3 mt-2 flex flex-col gap-1">
        <span className="text-base font-bold">{truncate(card.title)}</span>
        <p className="text-sm text-gray-500">
          {truncate(card.address, { length: 30 })}
        </p>
      </div>

      {/* Facilities Section */}
      <div className="flex gap-2 px-3 mt-2 flex-wrap">
        {/* Bathroom */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
          <FaShower size={16} className="text-blue-500" />
          <span className="text-xs text-gray-700">{card.bathroom} Bath</span>
        </div>

        {/* Parking */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
          <AiTwotoneCar size={16} className="text-blue-500" />
          <span className="text-xs text-gray-700">{card.parking} Park</span>
        </div>

        {/* Rooms */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-gray-100">
          <MdMeetingRoom size={16} className="text-blue-500" />
          <span className="text-xs text-gray-700">{card.rooms} Room</span>
        </div>
      </div>
    </div>
  );
};

export default OwnerTrackCard;
