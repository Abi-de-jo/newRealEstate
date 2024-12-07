import React, { useState, useEffect } from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PulseLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AgentDashboardGraph = ({ agentsData, residenciesData, email }) => {
  const { t } = useTranslation("graph");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter residencies for the specific agent
  const agentResidencies = residenciesData.filter(
    (item) => item.agentEmail === email
  );

  // Calculate agent-specific data counts
  const publishedResidencies = agentResidencies.filter(
    (item) => item.status === "published"
  ).length;

  const draftResidencies = agentResidencies.filter(
    (item) => item.status === "agentDraft"
  ).length;

  const archivedResidencies = agentResidencies.filter(
    (item) => item.status === "agentsAchieve"
  ).length;

  const graphData = [
    { name: t("published"), count: publishedResidencies },
    { name: t("Draft"), count: draftResidencies },
    { name: t("Achieve"), count: archivedResidencies },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg shadow-lg">
        <PulseLoader color="#8884d8" size={15} margin={10} />
        <p className="text-gray-500 mt-4">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-4  sm:p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out">
      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        {t("Agent Overview")}
      </h2>

      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-xs sm:max-w-md h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="110%" height="100%">
            <PieChart>
              <Pie
                data={graphData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                 outerRadius="80%"
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center">
        {t("clickHint")}
      </p>
    </div>
  );
};

export default AgentDashboardGraph;
