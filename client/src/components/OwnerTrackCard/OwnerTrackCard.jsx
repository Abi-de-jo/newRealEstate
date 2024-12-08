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
      className="flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full max-w-sm mx-auto"
      onClick={() => navigate(`../track-property/${card.id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full h-48">
        <img
          src={card.images[0]}
          alt="Property"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2">
          <img
            src="./watermark.png"
            alt="watermark"
            className="w-10 h-10 opacity-80"
          />
        </span>
      </div>

      {/* Details Section */}
      <div className="p-4">
        {/* Price Section */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-800">
            <span className="text-orange-500">$</span>
            {card.price}
          </span>
        </div>

        {/* Title and Address */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-800">
            {truncate(card.title, { length: 40 })}
          </h3>
          <p className="text-sm text-gray-500">
            {truncate(card.address, { length: 50 })}
          </p>
        </div>

        {/* Facilities Section */}
        <div className="flex justify-between items-center gap-2">
          {/* Bathrooms */}
          <div className="flex items-center gap-1 text-gray-700 text-sm">
            <FaShower size={18} className="text-blue-500" />
            <span>{card.bathrooms} Bath</span>
          </div>

          {/* Parking */}
          <div className="flex items-center gap-1 text-gray-700 text-sm">
            <AiTwotoneCar size={18} className="text-blue-500" />
            <span>{card.parking} Park</span>
          </div>

          {/* Rooms */}
          <div className="flex items-center gap-1 text-gray-700 text-sm">
            <MdMeetingRoom size={18} className="text-blue-500" />
            <span>{card.rooms} Room</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerTrackCard;
