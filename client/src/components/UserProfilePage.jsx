import React, { useState } from "react";
import UserProfileCard from "./UserProfileCard";
import Bookings from "../pages/Bookings/Bookings";
import Likes from "../pages/Likes/Likes";
 
export default function UserProfilePage({ email, username, teleNumber }) {
  const [activeSection, setActiveSection] = useState("profile");

  const links = ["Profile", "Favourites", "Booked Residency"];
  const sections = {
    profile: <UserProfileCard username={username} email={email} teleNumber={teleNumber} />,
    "booked residency": <Bookings />,
    favourites: <Likes />, // Placeholder for Favourites section
  };

  return (
    <div className="min-h-screen bg-gray-100 flex mt-4 flex-col items-center pt-10">
      <div className="w-full max-w-screen-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex justify-center mt-4 space-x-8 border-b">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => setActiveSection(link.toLowerCase())}
                className={`py-2 font-medium transition-colors ${
                  activeSection === link.toLowerCase()
                    ? "border-b-2 border-gray-800 text-gray-800"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          {sections[activeSection] || <p>Section not found.</p>}
        </div>
      </div>
    </div>
  );
}
