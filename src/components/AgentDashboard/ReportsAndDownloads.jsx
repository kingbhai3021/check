import React, { useState } from "react";
import { api } from "../../services/api";
import { FaDownload } from "react-icons/fa";

const ReportsAndDownloads = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!selectedReport) {
      setError("⚠️ Please select a report type.");
      return;
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("⚠️ Start date must be before end date.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const { url } = await api.downloadReport(selectedReport, startDate, endDate);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedReport}_report.pdf`;
      link.click();
    } catch (err) {
      setError("❌ Failed to download report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Reports & Downloads</h2>

      <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow rounded-xl p-6 space-y-6 transition-all">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Report Selector */}
        <div>
          <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">
            Select Report Type
          </label>
          <select
            id="report-type"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            disabled={isLoading}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 px-4 py-2"
          >
            <option value="">-- Choose Report --</option>
            <option value="portfolio">📊 Client Portfolio Summary</option>
            <option value="sip">📅 SIP Summary</option>
            <option value="transactions">💸 Transaction History</option>
            <option value="kyc">🧾 KYC Documents Summary</option>
            <option value="referral">🤝 Referral & Commission Report</option>
          </select>
        </div>

        {/* Date Range Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 px-4 py-2"
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="text-right">
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-transform duration-200 hover:bg-green-700 hover:scale-[1.02] ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaDownload className="text-sm" />
            {isLoading ? "Downloading..." : "Download Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndDownloads;
