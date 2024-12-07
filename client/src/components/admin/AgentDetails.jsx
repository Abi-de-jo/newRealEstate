import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AgentsDetails = ({ data, onBack }) => {
  const agentStats = data.map((agent) => ({
    name: agent.name,
    published: agent.published || 0,
    draft: agent.draft || 0,
    archived: agent.archived || 0,
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <button
        className="mb-4 text-blue-500 underline"
        onClick={onBack}
      >
        Back to Overview
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Agent Details
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={agentStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="published" fill="#4caf50" />
          <Bar dataKey="draft" fill="#ff9800" />
          <Bar dataKey="archived" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgentsDetails;
