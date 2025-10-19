import React, { useState } from "react";
import { api } from "../../services/api";

const clients = [
  { id: 1, name: "Rohit Sharma" },
  { id: 2, name: "Neha Mehta" },
];

const funds = [
  { code: "HDFC100", name: "HDFC Top 100 Fund - Direct Growth" },
  { code: "SBI500", name: "SBI Bluechip Fund - Regular Plan" },
];

const frequencies = ["Monthly", "Quarterly"];

const SIPSetup = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedFund || !amount || !startDate) {
      setError("All fields are required.");
      return;
    }
    if (parseFloat(amount) < 500) {
      setError("Amount must be at least ₹500.");
      return;
    }
    if (new Date(startDate) < new Date()) {
      setError("Start date cannot be in the past.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await api.submitSIP({
        selectedClient,
        selectedFund,
        amount,
        startDate,
        frequency,
      });
      alert("SIP Setup submitted successfully!");
      setSelectedClient("");
      setSelectedFund("");
      setAmount("");
      setStartDate("");
      setFrequency("Monthly");
    } catch (err) {
      setError("Failed to submit SIP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto md:max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold text-center">SIP Setup</h2>
      {error && (
        <div className="text-red-600 text-sm font-medium text-center">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-5 rounded-xl shadow-md"
        role="form"
        aria-label="SIP Setup Form"
      >
        {/* Client */}
        <div>
          <label className="block mb-1 text-sm font-medium">Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            disabled={isLoading}
            aria-label="Select Client"
          >
            <option value="">-- Choose Client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fund */}
        <div>
          <label className="block mb-1 text-sm font-medium">Select Mutual Fund</label>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            disabled={isLoading}
            aria-label="Select Mutual Fund"
          >
            <option value="">-- Choose Fund --</option>
            {funds.map((fund) => (
              <option key={fund.code} value={fund.name}>
                {fund.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 text-sm font-medium">SIP Amount (₹)</label>
          <input
            type="number"
            min="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Enter amount"
            required
            disabled={isLoading}
            aria-label="SIP Amount"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            required
            disabled={isLoading}
            aria-label="SIP Start Date"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="block mb-1 text-sm font-medium">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-200"
            disabled={isLoading}
            aria-label="SIP Frequency"
          >
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full bg-green-600 text-white px-4 py-2 rounded shadow transition duration-300 ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-700 hover:shadow-lg"
          }`}
          disabled={isLoading}
          aria-label="Submit SIP Setup"
        >
          {isLoading ? "Submitting..." : "Submit SIP Setup"}
        </button>
      </form>
    </div>
  );
};

export default SIPSetup;
