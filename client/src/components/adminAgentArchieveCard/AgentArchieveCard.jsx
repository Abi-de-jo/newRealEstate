import React from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import Like from "../Heart/Heart";

const AdminAgentArchieveCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-start r-card cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-102"
      onClick={() => navigate(`../agentarchieve/${card.id}`)}
    >
      {/* Image with overlay */}
      <div className="relative w-full h-36 overflow-hidden rounded-t-lg">
        <img
          src={card.images[0]}
          alt="home"
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-200 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg"></div>
        <span className="absolute top-2 right-2 w-12 rounded-full">
          <img src="./watermark.png" alt="" />
        </span>
        <Like id={card.id} className="absolute top-3 right-3 text-white z-10" />
      </div>

      {/* Price and Title */}
      <div className="p-3 w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-lg font-semibold text-gray-800">
            <span className="text-orange-500">$</span>
            {card.price}
          </span>
        </div>
        <span className="block text-base font-bold text-gray-800 truncate">
          {truncate(card.title, { length: 20 })}
        </span>
      </div>

      {/* Features */}
      <div className="flex items-center justify-between w-full px-3 py-2 border-t border-gray-200 bg-gray-50 rounded-b-lg text-gray-600 space-x-2">
        <div className="flex items-center text-xs whitespace-nowrap">
          <FaShower className="text-blue-500 mr-1" />
          <span>{card.bathrooms} Bath</span>
        </div>
        <div className="flex items-center text-xs whitespace-nowrap">
          <AiTwotoneCar className="text-green-500 mr-1" />
          <span>{card.parking} Parking</span>
        </div>
        <div className="flex items-center text-xs whitespace-nowrap">
          <MdMeetingRoom className="text-red-500 mr-1" />
          <span>{card.rooms} Room</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAgentArchieveCard;
