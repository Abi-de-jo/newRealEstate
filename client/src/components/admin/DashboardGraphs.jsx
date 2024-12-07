import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PulseLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const DashboardGraphs = ({ agentsData, ownersData, residenciesData, onCategoryClick }) => {
  const { t } = useTranslation("graph");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate data counts
  const publishedResidenciesByAgents = residenciesData.filter(
    (item) => item.status === "published" && item.agentEmail
  ).length;
  const draftResidenciesByAgents = residenciesData.filter(
    (item) => item.status === "agentDraft" && item.agentEmail
  ).length;
  const draftResidenciesByOwners = residenciesData.filter(
    (item) => item.status === "draft" && item.ownerEmail
  ).length;
  const accepted = residenciesData.filter(
    (item) => item.status === "agentsAchieve" && item.ownerEmail && item.agentEmail
  ).length;

  // Data for tabs
  const tabData = {
    all: [
      { name: t("agents"), count: agentsData.length, category: "agents" },
      { name: t("owners"), count: ownersData.length, category: "owners" },
      { name: t("residency"), count: residenciesData.length, category: "residency" },
    ],
    agents: [
      { name: t("totalAgents"), count: agentsData.length },
      { name: t("publishedResidencies"), count: publishedResidenciesByAgents },
      { name: t("agentDraftResidencies"), count: draftResidenciesByAgents },
    ],
    owners: [
      { name: t("totalOwners"), count: ownersData.length },
      { name: t("ownersCreated"), count: draftResidenciesByOwners },
      { name: t("accepted"), count: accepted },
    ],
    residency: [
      { name: t("published"), count: residenciesData.filter((item) => item.status === "published").length },
      { name: t("draft"), count: residenciesData.filter((item) => item.status === "draft").length },
      { name: t("agentsAchieve"), count: residenciesData.filter((item) => item.status === "agentsAchieve").length },
      { name: t("agentsDraft"), count: residenciesData.filter((item) => item.status === "agentDraft").length },
    ],
  };

  const graphData = tabData[activeTab];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg shadow-lg">
        <PulseLoader color="#8884d8" size={15} margin={10} />
        <p className="text-gray-500 mt-4">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        {t("overviewTitle")}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-6 space-x-2 sm:space-x-4">
        {["all", "agents", "owners", "residency"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 text-sm sm:text-base rounded transition-colors duration-300 ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={graphData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            onClick={(e) => {
              if (e && e.activePayload) {
                const category = e.activePayload[0].payload.name.toLowerCase();
                if (onCategoryClick) onCategoryClick(category);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" stroke="#333" tick={{ fontSize: 12, fill: "#666" }} />
            <YAxis stroke="#333" tick={{ fontSize: 12, fill: "#666" }} />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            <Bar
              dataKey="count"
              fill="url(#colorGradient)"
              barSize={30}
              radius={[8, 8, 0, 0]}
              animationBegin={300}
              animationDuration={1000}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center">{t("clickHint")}</p>
    </div>
  );
};

export default DashboardGraphs;
