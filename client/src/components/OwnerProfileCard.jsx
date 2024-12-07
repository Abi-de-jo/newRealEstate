import React, { useState, useEffect } from "react";

function OwnerProfileCard({ username, email, teleNumber, governmentId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedTeleNumber, setEditedTeleNumber] = useState(teleNumber);
  const [editedGovernmentId, setEditedGovernmentId] = useState(governmentId);
  const [profilePic, setProfilePic] = useState(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("ownerProfile"));
    if (storedProfile) {
      setEditedUsername(storedProfile.username || username);
      setEditedEmail(storedProfile.email || email);
      setEditedTeleNumber(storedProfile.teleNumber || teleNumber);
      setEditedGovernmentId(storedProfile.governmentId || governmentId);
      setProfilePic(storedProfile.profilePic || null);
    }
  }, [username, email, teleNumber, governmentId]);

  // Save changes to local storage
  const handleSaveChanges = () => {
    const updatedProfile = {
      username: editedUsername,
      email: editedEmail,
      teleNumber: editedTeleNumber,
      governmentId: editedGovernmentId,
      profilePic: profilePic,
    };
    localStorage.setItem("ownerProfile", JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-6 flex flex-col justify-center items-center bg-gray-100">
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mb-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-600">
                {editedUsername ? editedUsername.charAt(0).toUpperCase() : "U"}
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
          {isEditing ? (
            <input
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
              className="text-2xl font-semibold text-gray-800 mb-2 border-b border-gray-300 focus:outline-none"
            />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{editedUsername}</h1>
          )}
          <p className="text-gray-500 text-sm">{editedEmail}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-gray-500">email</span>
            {isEditing ? (
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="text-gray-700 font-medium border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{editedEmail}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="material-icons text-gray-500">phone</span>
            {isEditing ? (
              <input
                type="text"
                value={editedTeleNumber}
                onChange={(e) => setEditedTeleNumber(e.target.value)}
                className="text-gray-700 font-medium border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{editedTeleNumber || "N/A"}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="material-icons text-gray-500">badge</span>
            {isEditing ? (
              <input
                type="text"
                value={editedGovernmentId}
                onChange={(e) => setEditedGovernmentId(e.target.value)}
                className="text-gray-700 font-medium border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">Govt ID: {editedGovernmentId || "N/A"}</p>
            )}
          </div>

          <div className="mt-6 text-center">
            {isEditing ? (
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
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
