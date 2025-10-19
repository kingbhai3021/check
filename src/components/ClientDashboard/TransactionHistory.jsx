import { useState } from "react";
import { Card, CardContent } from "../../assets/animations/card";
import { Button } from "../../assets/animations/button";
import { Download } from "lucide-react";

const transactions = [
  {
    date: "2025-08-01",
    fund: "ICICI Prudential Bluechip Fund",
    type: "Purchase",
    amount: "₹10,000",
    units: "52.34",
    status: "Completed",
  },
  {
    date: "2025-07-28",
    fund: "Axis Midcap Fund",
    type: "Sell",
    amount: "₹5,000",
    units: "23.11",
    status: "Pending",
  },
  {
    date: "2025-07-20",
    fund: "Nippon India Growth Fund",
    type: "Purchase",
    amount: "₹3,000",
    units: "14.76",
    status: "Completed",
  },
  {
    date: "2025-07-18",
    fund: "HDFC Flexi Cap Fund",
    type: "Purchase",
    amount: "₹6,000",
    units: "25.34",
    status: "Completed",
  },
  {
    date: "2025-07-15",
    fund: "Kotak Emerging Equity",
    type: "Purchase",
    amount: "₹8,000",
    units: "41.50",
    status: "Completed",
  },
  {
    date: "2025-07-10",
    fund: "Mirae Asset Large Cap Fund",
    type: "Purchase",
    amount: "₹4,000",
    units: "19.75",
    status: "Completed",
  },
];

const exportToCSV = (data) => {
  const csvRows = [
    ["Date", "Fund Name", "Amount", "Units", "Status"],
    ...data.map((txn) => [
      txn.date,
      txn.fund,
      txn.amount,
      txn.units,
      txn.status,
    ]),
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    csvRows.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "purchase_transactions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function TransactionHistory() {
  const purchaseOnly = transactions.filter((txn) => txn.type === "Purchase");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseOnly.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(purchaseOnly.length / itemsPerPage);

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Purchase Transactions
          </h2>
          <Button
            variant="outline"
            onClick={() => exportToCSV(purchaseOnly)}
            className="flex gap-2 w-full md:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Fund Name</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Units</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((txn, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2">{txn.fund}</td>
                  <td className="px-4 py-2">{txn.amount}</td>
                  <td className="px-4 py-2">{txn.units}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
