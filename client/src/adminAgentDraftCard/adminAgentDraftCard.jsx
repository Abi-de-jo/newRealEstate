import React from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from 'lodash';
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { AiTwotoneCar } from "react-icons/ai";
import Heart from "../components/Heart/Heart";

const AdminAgentDraftCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start r-card cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
      onClick={() => navigate(`../AdminAgentDraftId/${card.id}`)}
    >
      {/* Image with overlay */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <img
          src={card.images[0]}
          alt="home"
          className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl"></div>
        <Heart id={card?.id} className="absolute top-3 right-3 text-white z-10" />
      </div>

      {/* Price and Title */}
      <div className="p-4 w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xl font-semibold text-gray-800">
            <span className="text-orange-500">$</span>
            {card.price}
          </span>
        </div>
        <span className="block text-lg font-bold text-gray-800 truncate">
          {truncate(card.title, { length: 20 })}
        </span>
      </div>

      {/* Features */}
      <div className="flex items-center justify-between w-full px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl text-gray-600 space-x-4">
        <div className="flex items-center text-sm whitespace-nowrap">
          <FaShower className="text-blue-500 mr-1" />
          <span>{card.bathrooms} Bath</span>
        </div>
        <div className="flex items-center text-sm whitespace-nowrap">
          <AiTwotoneCar className="text-green-500 mr-1" />
          <span>{card.parking} Parking</span>
        </div>
        <div className="flex items-center text-sm whitespace-nowrap">
          <MdMeetingRoom className="text-red-500 mr-1" />
          <span>{card.rooms} Room</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAgentDraftCard;
