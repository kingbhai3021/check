import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", sip: 200 },
  { month: "Feb", sip: 400 },
  { month: "Mar", sip: 500 },
  { month: "Apr", sip: 650 },
  { month: "May", sip: 800 },
];

export default function SIPGrowthChart() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-4">SIP Growth</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="sip" stroke="#3B82F6" fill="#DBEAFE" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
