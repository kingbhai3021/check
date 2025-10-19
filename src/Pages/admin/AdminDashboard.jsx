import React from "react";
import RecentActivitiesChart from "../../components/charts/RecentActivitiesChart";
import PortfolioGrowthChart from "../../components/charts/PortfolioGrowthChart";
import SIPGrowthChart from "../../components/charts/SIPGrowthChart";
import ClientStatusChart from "../../components/charts/ClientStatusChart";
import CountUpNumber from "../../components/CountUpNumber";

export default function Dashboard() {
  const stats = [
    { title: "Total Clients", value: 150, color: "bg-blue-500" },
    { title: "Total DSA", value: 45, color: "bg-green-500" },
    { title: "Total Agents", value: 25, color: "bg-purple-500" },
    { title: "Pending KYC", value: 12, color: "bg-red-500" },
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-3 sm:p-4 md:p-5 rounded-xl text-white shadow-md ${stat.color} flex flex-col items-center justify-center transition transform hover:scale-105 duration-200`}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              <CountUpNumber end={stat.value} duration={2} />
            </h2>
            <p className="mt-1 text-center text-xs sm:text-sm md:text-base">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-2 sm:p-4 mb-4 md:mb-0">
          <RecentActivitiesChart />
        </div>
        <div className="bg-white rounded-lg shadow p-2 sm:p-4 mb-4 md:mb-0">
          <PortfolioGrowthChart />
        </div>
        <div className="bg-white rounded-lg shadow p-2 sm:p-4">
          <SIPGrowthChart />
        </div>
        <div className="bg-white rounded-lg shadow p-2 sm:p-4">
          <ClientStatusChart />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow p-2 sm:p-4 overflow-x-auto">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-3">
          Recent Activities
        </h2>
        <table className="w-full min-w-[350px] sm:min-w-[500px] text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 sm:p-3 text-left">Date</th>
              <th className="p-2 sm:p-3 text-left">Activity</th>
              <th className="p-2 sm:p-3 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="p-2 sm:p-3">2025-08-06</td>
              <td className="p-2 sm:p-3">New DSA Registered</td>
              <td className="p-2 sm:p-3">Ramesh Gupta</td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="p-2 sm:p-3">2025-08-05</td>
              <td className="p-2 sm:p-3">Client KYC Approved</td>
              <td className="p-2 sm:p-3">Amit Kumar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}