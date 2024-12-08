import React, { useState, useEffect } from "react";
import axios from "axios";
import useAgents from "../hooks/usegetAgents";

function AgentProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [agentData, setAgentData] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newTeleNumber, setNewTeleNumber] = useState("");
  const { data: agents } = useAgents();
  const agentEmail = localStorage.getItem("email"); // Get agent email from localStorage
  const API_BASE_URL = "http://localhost:3000/api/agent";

  // Find the agent data based on email
  useEffect(() => {
    if (agents && agentEmail) {
      const matchedAgent = agents.find((agent) => agent.email === agentEmail);
      setAgentData(matchedAgent);
      if (matchedAgent) {
        setNewProfilePic(matchedAgent.image || null);
        setNewEmail(matchedAgent.email || "");
        setNewTeleNumber(matchedAgent.teleNumber || "");
      }
    }
  }, [agents, agentEmail]);

  // Handle profile picture upload
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePic(reader.result); // Set the profile picture as Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to the backend
  const handleSaveChanges = async () => {
    try {
      const payload = {
        image: newProfilePic?.split(",")[1], // Remove Base64 prefix
        email: newEmail,
        teleNumber: newTeleNumber,
      };
      await axios.put(`${API_BASE_URL}/update/${agentData.id}`, payload);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!agentData) {
    return <div className="text-center text-gray-500">No agent data found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-200">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={agentData.image || "nothing"}
            alt=""
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          {isEditing && (
            <button
              onClick={() => document.getElementById("file-input").click()}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
              title="Change Photo"
            >
              ✎
            </button>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">{agentData.username || "Unnamed Agent"}</h2>
        <p className="text-sm text-gray-500">Expert Real Estate Agent in Your City</p>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-300 pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Email:</span>
            {isEditing ? (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="text-gray-700 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700">{newEmail}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Phone:</span>
            {isEditing ? (
              <input
                type="text"
                value={newTeleNumber}
                onChange={(e) => setNewTeleNumber(e.target.value)}
                className="text-gray-700 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-700">{newTeleNumber || "N/A"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition font-semibold"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="mt-3 w-full bg-gray-200 text-gray-800 py-2 rounded-md shadow-md hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition font-semibold"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      {isEditing && (
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleProfilePicUpload}
          className="hidden"
        />
      )}
    </div>
  );
}

export default AgentProfileCard;
