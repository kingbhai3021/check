import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 1000 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 2500 },
  { month: "May", value: 3000 },
];

export default function PortfolioGrowthChart() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-4">Portfolio Growth</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
