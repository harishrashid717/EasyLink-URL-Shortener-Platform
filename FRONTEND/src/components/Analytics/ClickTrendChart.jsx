import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useSelector } from "react-redux";

const ClickTrendChart = () => {
  const clicksPerDay = useSelector(
    (state) => state.urlStats?.data?.clicksPerDay
  );

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 ">
      <h5 className="mb-3">Click Trend</h5>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={clicksPerDay} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
            labelStyle={{ color: "#333" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke="#4f46e5"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 4, stroke: "#4f46e5", strokeWidth: 2, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClickTrendChart;
