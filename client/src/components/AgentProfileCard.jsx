import React from "react";

function AgentProfileCard({
  username,
  email,
  teleNumber,
  setNewTeleNumber,
  handleProfilePicUpload,
  handleTeleNumberUpdate,
  newTeleNumber,
  profilePic,
}) {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-200">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <button
            onClick={() => document.getElementById("file-input").click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
            title="Change Photo"
          >
            ✎
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{username}</h2>
        <p className="text-sm text-gray-500">
          Expert Real Estate Agent in Your City
        </p>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-300 pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Email:</span>
            <a
              href={`mailto:${email}`}
              className="text-blue-500 hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Phone:</span>
            <p className="text-gray-700">{teleNumber || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Update Contact Form */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          New Number:
        </label>
        <input
          type="text"
          value={newTeleNumber}
          onChange={(e) => setNewTeleNumber(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new contact number"
        />
        <button
          onClick={handleTeleNumberUpdate}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition font-semibold"
        >
          Save New Number
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleTeleNumberUpdate}
          className="flex-grow bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition font-semibold"
        >
          Update Contact
        </button>
        <button
          onClick={() => document.getElementById("file-input").click()}
          className="flex-grow bg-gray-200 text-gray-800 py-2 rounded-md shadow-md hover:bg-gray-300 transition font-semibold"
        >
          Change Photo
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        className="hidden"
      />
    </div>
  );
}

export default AgentProfileCard;
