import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import PuffLoader from "react-spinners/PuffLoader";
import { getAllAgents } from "../../utils/api";
import AdminAgentPub from "../../pages/adminAgentPub/adminAgentPub";
import AdminAgentDraft from "../../pages/adminAgentDraft/adminAgentDraft";

export const AgentProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Published");

  const { data, isLoading, isError } = useQuery(["agent", id], () => getAllAgents(id), {
    select: (response) => response.find((agent) => agent.id === id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#2563eb" size={100} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-600 text-xl font-semibold text-center px-4">
          Error fetching agent details. Please try again.
        </span>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Published":
        return <AdminAgentPub />;
      case "Drafts":
        return <AdminAgentDraft />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-blue-500 h-32 sm:h-40">
          <img
            src={data.profilePicture || "/placeholder.svg"}
            alt={data.username || "Agent"}
            className="absolute -bottom-10 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="p-4 sm:p-6 md:p-8 pt-12 sm:pt-8">
          {/* Agent Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{data.name}</h1>
              <p className="text-sm sm:text-base text-gray-600">{data.designation}</p>
              <p className="flex items-center text-sm sm:text-base text-gray-600">
                <span>{data.location}</span>
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 my-6">
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">📧</span>
              <span className="text-sm sm:text-base">{data.email || "Email not available"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">📱</span>
              <span className="text-sm sm:text-base">{data.teleNumber || "Phone not available"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <span className="text-blue-600 text-lg sm:text-xl">🏢</span>
              <span className="text-sm sm:text-base">{data.username || "Agency not available"}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center space-x-4 sm:space-x-8 my-4 border-b border-gray-200 overflow-x-auto">
            {["Published", "Drafts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 sm:px-4 text-sm sm:text-base font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

