import React, { useState } from "react";
import { useQuery } from "react-query";
import ProfileCard from "./ProfileCard";
import AgentDraft from "../pages/AgentDraft/AgentDraft";
import AgentPublished from "../pages/AgentPublished/AgentPublished";
import AgentArchieve from "../pages/AgentArchieve/AgentArchieve";
import GenArchieve from "../pages/GenArchieve/GenArchieve";
import { getAllPropertiesForAdmin } from "../utils/api";
import AgentDashboardGraph from "./AgentDashBoard";

export default function AgentProfilePage({ email, username, teleNumber }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [activeTab, setActiveTab] = useState("published");

  // Fetch data using react-query
  const { data: residenciesDataResponse, isError, isLoading } = useQuery(
    "allresForAdmin",
    getAllPropertiesForAdmin
  );

  // Filter data based on the current agent's email
  const publishedData =
    residenciesDataResponse?.filter(
      (property) => property.status === "published" && property.agentEmail === email
    ) || [];

  const agentDraftData =
    residenciesDataResponse?.filter(
      (property) => property.status === "agentDraft" && property.agentEmail === email
    ) || [];

  const agentAchiveData =
    residenciesDataResponse?.filter(
      (property) => property.status === "agentsAchieve" && property.agentEmail === email
    ) || [];

  const ownerArchiveData =
    residenciesDataResponse?.filter(
      (property) => property.status === "ownerArchive" && property.agentEmail === email
    ) || [];

  // Tab contents for each section
  const tabSections = {
    published: <AgentPublished data={publishedData} />,
    agentDraft: <AgentDraft data={agentDraftData} />,
    agentArchive: <AgentArchieve data={agentAchiveData} />,
    ownerArchive: <GenArchieve data={ownerArchiveData} />,
  };

  // Counts for dashboard statistics
  const counts = {
    published: publishedData.length,
    agentDraft: agentDraftData.length,
    agentArchive: agentAchiveData.length,
  };

  const profileLayout = (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-gradient-to-br from-blue-500 to-teal-400 p-4 md:p-6 rounded-lg shadow-lg">
          <ProfileCard username={username} email={email} teleNumber={teleNumber} />
        </div>

        {/* Dashboard Counts */}
        <div className="col-span-1 md:col-span-2  lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {Object.entries(counts).map(([key, value]) => (
            <div key={key} className="bg-white p-3 md:p-4 rounded-lg shadow-md text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-600">
                {value}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Graph */}
      <div className="mt-6 md:mt-8   lg:col-span-3">
        <AgentDashboardGraph
          agentsData={[]}
          residenciesData={residenciesDataResponse || []}
          email={email}
        />
      </div>

      {/* Tab Section */}
      <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-start md:justify-center gap-2 md:gap-4 border-b border-gray-300 pb-2 overflow-x-auto">
          {Object.keys(tabSections).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 md:px-4 text-xs md:text-sm font-semibold rounded-t-lg transition duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="p-3 md:p-4 bg-gray-50 rounded-lg shadow-md mt-3 md:mt-4">
          {tabSections[activeTab]}
        </div>
      </div>
    </div>
  );

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (isError) return <p className="text-center py-4 text-red-500">Error fetching properties.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky h-16 top-0 z-50">
        <nav className="container mx-auto px-2 md:px-4 py-2 md:py-3 flex overflow-x-auto space-x-2 md:space-x-4 md:justify-center">
          {[
            { label: "Profile", key: "profile" },
            { label: "Published", key: "published" },
            { label: "Agent Draft", key: "agentDraft" },
            { label: "Owner Archive", key: "ownerArchive" },
            { label: "Agent Archive", key: "agentArchive" },
          ].map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-md font-semibold transition-colors duration-300 whitespace-nowrap ${
                activeSection === key
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-3 md:p-4 lg:p-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4 md:mb-6 text-gray-800 capitalize">
          {activeSection}
        </h1>
        <div className="p-3 md:p-4 lg:p-6 bg-white rounded-lg shadow-xl">
          {activeSection === "profile" ? profileLayout : tabSections[activeSection] || <p>Section not found.</p>}
        </div>
      </main>
    </div>
  );
}
