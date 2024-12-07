import React, { useState, useEffect } from "react";

function UserProfileCard({ username, email, teleNumber, profilePicUrl }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedTeleNumber, setEditedTeleNumber] = useState(teleNumber);
  const [uploadedProfilePicUrl, setUploadedProfilePicUrl] = useState(profilePicUrl);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const storageKey = `userProfile_${email}`;

  // Load profile from local storage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem(storageKey));
    if (savedProfile) {
      setEditedUsername(savedProfile.username || username);
      setEditedEmail(savedProfile.email || email);
      setEditedTeleNumber(savedProfile.teleNumber || teleNumber);
      setUploadedProfilePicUrl(savedProfile.profilePicUrl || profilePicUrl);
      setIsVerified(savedProfile.isVerified || false);
    }
  }, [email, username, teleNumber, profilePicUrl]);

  // Save profile to local storage whenever it changes
  const saveProfileToLocalStorage = () => {
    const profileData = {
      username: editedUsername,
      email: editedEmail,
      teleNumber: editedTeleNumber,
      profilePicUrl: uploadedProfilePicUrl,
      isVerified,
    };
    localStorage.setItem(storageKey, JSON.stringify(profileData));
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Instead of setting base64, you might upload to a server and set the URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedProfilePicUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log("Updated Username:", editedUsername);
    console.log("Updated Email:", editedEmail);
    console.log("Updated Telephone Number:", editedTeleNumber);
    setIsEditing(false);
    saveProfileToLocalStorage();
  };

  const handleVerifyEmail = () => {
    setIsVerifying(true);
    setVerificationCode("");
  };

  const handleVerificationSubmit = () => {
    if (verificationCode === "1234") { // Mock code for demonstration
      setIsVerified(true);
      setIsVerifying(false);
      console.log("Email verified successfully!");
      saveProfileToLocalStorage();
    } else {
      alert("Invalid verification code.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          {uploadedProfilePicUrl ? (
            <img
              src={uploadedProfilePicUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-3xl font-bold text-gray-700">
              {editedUsername.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="ml-6">
          {isEditing ? (
            <input
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
              className="text-2xl font-bold border-b border-gray-400 focus:outline-none focus:border-black transition-all"
            />
          ) : (
            <h1 className="text-2xl font-bold">{editedUsername}</h1>
          )}
          <p className="text-gray-600">{editedEmail}</p>
        </div>
      </div>

      {/* Editable Information */}
      <div className="grid gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-gray-500">phone</span>
          {isEditing ? (
            <input
              type="text"
              value={editedTeleNumber}
              onChange={(e) => setEditedTeleNumber(e.target.value)}
              className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-black transition-all text-gray-700"
            />
          ) : (
            <p className="text-gray-700">{editedTeleNumber}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-6">
        {isEditing ? (
          <>
            <label className="text-blue-500 font-medium cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                className="hidden"
              />
              Upload New Photo
            </label>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Change profile photo
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 font-semibold hover:bg-gray-100 transition-all"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      <hr className="my-8" />

      {/* Account Management */}
      <div className="space-y-4 text-center">
        <button
          onClick={handleVerifyEmail}
          className="text-gray-600 font-medium hover:underline transition-all"
        >
          {isVerified ? "Email Verified" : "Verify Email"}
        </button>
        <span className="mx-2 text-gray-400">|</span>
        <button className="text-gray-600 font-medium hover:underline transition-all">
          Change Email
        </button>
        <div className="mt-4">
          <button className="text-gray-600 font-medium hover:underline transition-all">
            Reset Password
          </button>
        </div>
      </div>

      {/* Verification Modal */}
      {isVerifying && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter code"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleVerificationSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Verify
              </button>
              <button
                onClick={() => setIsVerifying(false)}
                className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileCard;
