import React from "react";

const activities = [
  { id: 1, activity: "Client Ramesh Gupta updated KYC", time: "2 hrs ago" },
  { id: 2, activity: "New SIP started by Neha Sharma", time: "5 hrs ago" },
  { id: 3, activity: "Agent Amit Verma added a client", time: "1 day ago" },
];

export default function RecentActivitiesChart() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
      <ul className="space-y-2">
        {activities.map((act) => (
          <li key={act.id} className="border-b pb-2">
            <p className="text-sm">{act.activity}</p>
            <span className="text-xs text-gray-500">{act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
