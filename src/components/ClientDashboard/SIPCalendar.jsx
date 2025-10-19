import React from "react";
import { CalendarCheck2, Clock3 } from "lucide-react";
import { Card, CardContent } from "../../assets/animations/card"; // ✅ Custom Card component

const sipData = [
  { date: "2025-08-05", fund: "Axis Bluechip Fund", amount: 5000, status: "Scheduled" },
  { date: "2025-08-10", fund: "HDFC Balanced Advantage", amount: 3000, status: "Scheduled" },
  { date: "2025-08-15", fund: "ICICI Value Discovery", amount: 4000, status: "Scheduled" },
  { date: "2025-08-20", fund: "Mirae Emerging Bluechip", amount: 2000, status: "Scheduled" },
];

export default function SIPCalendar() {
  const totalUpcoming = sipData.length;
  const totalAmount = sipData.reduce((sum, sip) => sum + sip.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-5 flex items-start sm:items-center gap-4">
            <CalendarCheck2 className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
            <div>
              <p className="text-sm text-gray-500">Upcoming SIPs</p>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{totalUpcoming}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 sm:p-5 flex items-start sm:items-center gap-4">
            <Clock3 className="text-green-600 w-7 h-7 sm:w-8 sm:h-8" />
            <div>
              <p className="text-sm text-gray-500">Total Amount This Month</p>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SIP Table */}
      <Card className="shadow-md">
        <CardContent className="p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            SIP Schedule – August 2025
          </h3>
          <table className="min-w-[500px] w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Fund</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sipData.map((sip, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{sip.date}</td>
                  <td className="py-2 px-3">{sip.fund}</td>
                  <td className="py-2 px-3">₹{sip.amount.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    <span className="text-green-600 font-medium">{sip.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
