import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Aug 1", activities: 5 },
  { date: "Aug 2", activities: 8 },
  { date: "Aug 3", activities: 4 },
  { date: "Aug 4", activities: 10 },
  { date: "Aug 5", activities: 6 },
];

export default function RecentActivitiesChart() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="activities" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
