import React, { useState, useEffect } from "react";
import useOwner from "../hooks/usegetOwner";
import axios from "axios";

function OwnerProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { data: owners } = useOwner();
  const owneremail = localStorage.getItem("email");
  const API_BASE_URL = "https://new-real-estate-server.vercel.app/api/owner";

  // Find the matching owner data based on email
  useEffect(() => {
    if (owners && owneremail) {
      const matchedOwner = owners.find((owner) => owner.email === owneremail);
      setOwnerData(matchedOwner);
      if (matchedOwner?.image) {
        setProfilePic(matchedOwner.image);
      }
    }
  }, [owners, owneremail]);

  // Handle profile picture upload
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setOwnerData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to the backend
  const handleSaveChanges = async () => {
    try {
      await axios.put(`${API_BASE_URL}/update/${ownerData.id}`, {
  image: profilePic.split(",")[1], // Remove the prefix
        email: ownerData.email,
        teleNumber: ownerData.teleNumber,
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!ownerData) {
    return <div className="text-center text-gray-500">No owner data found.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-6 flex flex-col justify-center items-center bg-gray-100">
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mb-4">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-600">
                {ownerData.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <label className="text-blue-500 text-sm cursor-pointer hover:underline">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                className="hidden"
              />
              Upload Profile Picture
            </label>
          )}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {ownerData.username || "Unnamed User"}
          </h1>
          <p className="text-gray-500 text-sm">{ownerData.email}</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-gray-500">Email:</label>
            {isEditing ? (
              <input
                type="email"
                value={ownerData.email}
                onChange={(e) => setOwnerData((prev) => ({ ...prev, email: e.target.value }))}
                className="text-gray-700 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700">{ownerData.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-500">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                value={ownerData.teleNumber}
                onChange={(e) => setOwnerData((prev) => ({ ...prev, teleNumber: e.target.value }))}
                className="text-gray-700 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700">{ownerData.teleNumber || "N/A"}</p>
            )}
          </div>

          <div className="mt-6 text-center">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerProfileCard;
