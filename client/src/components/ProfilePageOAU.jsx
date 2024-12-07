import React from "react";
import UserProfilePage from "./UserProfilePage";
import OwnerProfilePage from "./OwnerProfilePage";
import AgentProfilePage from "./AgentProfilePage";

 const role = localStorage.getItem("role");
const email = localStorage.getItem("email") || "user@example.com";
const username = email.split('@')[0];

 const ownerDetails = JSON.parse(localStorage.getItem("newOwner") || "{}");
const { teleNumber = "N/A", governmentId = "N/A", username: ownerUsername = username } = ownerDetails.owner || {};

export default function ProfilePage() {
   switch (role) {
    case "user":
      return <UserProfilePage email={email} username={username} teleNumber={teleNumber} />;
    case "owner":
      return <OwnerProfilePage email={email} username={username} teleNumber={teleNumber} governmentId={governmentId}  ownerUsername={ownerUsername}/>;
    case "agent":
      return <AgentProfilePage email={email} username={username} teleNumber={teleNumber} />;
    default:
      return <p>Role not recognized</p>;
  }
}
