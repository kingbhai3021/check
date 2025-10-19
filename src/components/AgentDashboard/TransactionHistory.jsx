import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClient, setFilteredClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filterTransactions = () => {
    return transactions.filter((txn) => {
      const matchesClient = filteredClient ? txn.client === filteredClient : true;
      const matchesSearch = searchTerm
        ? txn.fund.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesDate =
        (!startDate || new Date(txn.date) >= new Date(startDate)) &&
        (!endDate || new Date(txn.date) <= new Date(endDate));
      return matchesClient && matchesSearch && matchesDate;
    });
  };

  const exportToCSV = () => {
    const rows = filterTransactions();
    const csv = [
      ["Client", "Fund", "Type", "Amount", "Date", "Status"],
      ...rows.map((txn) => [
        `"${txn.client}"`,
        `"${txn.fund}"`,
        txn.type,
        txn.amount,
        txn.date,
        txn.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    try {
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "transaction_history.csv";
      link.click();
    } catch (err) {
      alert("Failed to export CSV.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Transaction History</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by fund"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          disabled={isLoading}
          aria-label="Search by fund name"
        />

        <select
          value={filteredClient}
          onChange={(e) => setFilteredClient(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          disabled={isLoading}
          aria-label="Filter by client"
        >
          <option value="">All Clients</option>
          <option value="Rohit Sharma">Rohit Sharma</option>
          <option value="Neha Mehta">Neha Mehta</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          disabled={isLoading}
          aria-label="Start date"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-4 py-2 rounded w-full"
          disabled={isLoading}
          aria-label="End date"
        />

        <button
          onClick={exportToCSV}
          className={`bg-blue-600 text-white px-4 py-2 rounded transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
          aria-label="Export to CSV"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        {isLoading ? (
          <div className="text-center p-4 text-gray-500">Loading...</div>
        ) : filterTransactions().length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No transactions found.</p>
        ) : (
          <table
            className="min-w-full text-sm text-left border-collapse"
            role="grid"
            aria-label="Transaction History"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Client</th>
                <th className="px-4 py-2 whitespace-nowrap">Fund</th>
                <th className="px-4 py-2 whitespace-nowrap">Type</th>
                <th className="px-4 py-2 whitespace-nowrap">Amount</th>
                <th className="px-4 py-2 whitespace-nowrap">Date</th>
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterTransactions().map((txn) => (
                <tr key={txn.id} className="border-t">
                  <td className="px-4 py-2 whitespace-nowrap">{txn.client}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{txn.fund}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{txn.type}</td>
                  <td className="px-4 py-2 whitespace-nowrap">₹{txn.amount}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{txn.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
