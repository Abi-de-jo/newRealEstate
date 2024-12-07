import React from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { AiTwotoneCar } from "react-icons/ai";
import Heart from "../components/Heart/Heart";

const DraftCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 p-4"
      onClick={() => navigate(`../Draft/${card.id}`)}
    >
      {/* Image Section with Heart Icon */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <img
          src={card.images[0]}
          alt="home"
          className="w-full h-full object-cover"
        />
        <Heart id={card?.id} className="absolute top-2 right-2 z-10" />
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between w-full mb-2">
        {card.discount ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">${card.price}</span>
            <span className="text-lg font-semibold text-gray-800">
              <span className="text-orange-500">$</span>
              {card.discount}
            </span>
          </div>
        ) : (
          <span className="text-lg font-semibold text-gray-800">
            <span className="text-orange-500">$</span>
            {card.price}
          </span>
        )}
      </div>

      {/* Title and Description */}
      <div className="w-full">
        <span className="block text-lg font-bold text-gray-800 mb-1">
          {truncate(card.title, { length: 20 })}
        </span>
        <p className="text-sm text-gray-600 mb-2">
          {truncate(card.description, { length: 40 })}
        </p>
      </div>

      {/* Facilities Section */}
      <div className="flex gap-3 mt-2 flex-wrap text-gray-600">
        {/* Bathroom */}
        <div className="flex items-center gap-1 p-1 px-2 rounded-md bg-gray-100">
          <FaShower size={16} className="text-blue-500" />
          <span className="text-xs">{card.bathrooms} Bath</span>
        </div>

        {/* Parking */}
        <div className="flex items-center gap-1 p-1 px-2 rounded-md bg-gray-100">
          <AiTwotoneCar size={16} className="text-blue-500" />
          <span className="text-xs">{card.parking} Park</span>
        </div>

        {/* Room */}
        <div className="flex items-center gap-1 p-1 px-2 rounded-md bg-gray-100">
          <MdMeetingRoom size={16} className="text-blue-500" />
          <span className="text-xs">{card.rooms} Room</span>
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
