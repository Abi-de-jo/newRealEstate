import React, { useState } from "react";
import OwnerProfileCard from "./OwnerProfileCard";
import OwnerTrackDraft from "../pages/OwnerTrackDraft/OwnerTrackDraft";

export default function OwnerProfilePage({ email, username, teleNumber, governmentId }) {
  const [activeSection, setActiveSection] = useState("profile");

  const links = ["Profile", "Track Property"];
  const sections = {
    profile: <OwnerProfileCard username={username} email={email} teleNumber={teleNumber} governmentId={governmentId} />,
    "track property": <OwnerTrackDraft />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto p-4 flex justify-center space-x-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setActiveSection(link.toLowerCase())}
              className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
                activeSection === link.toLowerCase()
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>
      </header>

      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800 capitalize">{activeSection}</h1>
        <div className="p-6 bg-white rounded-lg shadow-xl transition duration-300 transform hover:shadow-2xl">
          {sections[activeSection] || <p>Section not found.</p>}
        </div>
      </main>
    </div>
  );
}
