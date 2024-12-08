import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import AgentProfileCard from "./AgentProfileCard";
import OwnerProfileCard from "./OwnerProfileCard";
import axios from "axios";

function ProfileCard({ username, email, governmentId }) {
  const [role, setRole] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [teleNumber, setTeleNumber] = useState("N/A");
  const [newTeleNumber, setNewTeleNumber] = useState("");

  const generateKey = (key) => `${email}_${key}`;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedProfilePic = localStorage.getItem(generateKey("profilePic"));
    const storedTeleNumber = localStorage.getItem(generateKey("teleNumber")) || "N/A";

    if (storedRole) setRole(storedRole);
    if (storedProfilePic) setProfilePic(storedProfilePic);
    setTeleNumber(storedTeleNumber);
  }, [email]);

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          localStorage.setItem(generateKey("profilePic"), resizedDataUrl);
          setProfilePic(resizedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeleNumberUpdate = () => {
    if (newTeleNumber) {
      setTeleNumber(newTeleNumber);
      localStorage.setItem(generateKey("teleNumber"), newTeleNumber);
      if (role === "agent") {
        axios.post("https://new-real-estate-server.vercel.app/api/agent/update", {
          newTeleNumber,
          email,
        });
      }
      setNewTeleNumber("");
    }
  };

  return (
    <div className="max-w-full sm:max-w-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 capitalize text-center w-full sm:w-auto">
          {role ? `${role} Profile` : "User Profile"}
        </h2>
      </div>
      <div className="mt-6">
        {role === "agent" ? (
          <AgentProfileCard
            username={username}
            email={email}
            teleNumber={teleNumber}
            newTeleNumber={newTeleNumber}
            setNewTeleNumber={setNewTeleNumber}
            profilePic={profilePic}
            handleProfilePicUpload={handleProfilePicUpload}
            handleTeleNumberUpdate={handleTeleNumberUpdate}
          />
        ) : role === "owner" ? (
          <OwnerProfileCard
            username={username}
            email={email}
            governmentId={governmentId}
            teleNumber={teleNumber}
            profilePic={profilePic}
            handleProfilePicUpload={handleProfilePicUpload}
          />
        ) : (
          <UserProfileCard
            username={username}
            email={email}
            teleNumber={teleNumber}
            profilePic={profilePic}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
