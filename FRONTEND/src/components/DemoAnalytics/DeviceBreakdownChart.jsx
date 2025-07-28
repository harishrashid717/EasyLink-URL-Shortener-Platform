import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#4f46e5", "#06b6d4", "#f59e0b", "#10b981"]; // purple, cyan, yellow, green

const DeviceBreakdownChart = () => {
  const deviceBreakdown = useSelector(
    (state) => state.demoStats?.data?.deviceBreakdown
  );

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h5 className="mb-3">Device Breakdown</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={deviceBreakdown}
            dataKey="visits"
            nameKey="device"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {deviceBreakdown?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceBreakdownChart;
