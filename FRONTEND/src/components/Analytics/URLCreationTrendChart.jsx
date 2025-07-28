import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">📅 {label}</p>
        <p className="text-sm text-indigo-600">
          🔗 URLs Created: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

const URLCreationTrendChart = () => {
  const urlCreationTrend = useSelector(
    (state) => state.urlStats?.data?.urlCreationTrend
  );

  const formattedData = urlCreationTrend?.map((entry) => ({
    ...entry,
    date: new Date(entry.date).toISOString().slice(0, 10),
  }));

  return (
    <div className="bg-white shadow-xl rounded-2xl py-6 border border-gray-100 container-fluid">
      <h5 className="mb-1">URL Creation Trend</h5>
      <p className="text-sm text-gray-500 mb-5">
        Trend of created short URLs over selected time range
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
          <Bar
            dataKey="created_count"
            name="URLs Created"
            fill="#6366f1"
            barSize={35}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default URLCreationTrendChart;
