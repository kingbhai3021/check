import React, { useState } from "react";
import { api } from "../../services/api";

const sampleClients = [
  { id: 1, name: "Rohit Sharma" },
  { id: 2, name: "Priya Patel" },
];

const sampleFunds = [
  { code: "ABC123", name: "HDFC Top 100 Fund - Direct Growth" },
  { code: "XYZ456", name: "SBI Bluechip Fund - Regular Plan" },
];

const MutualFundPurchase = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Lumpsum");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedFund || !amount) {
      setError("All fields are required.");
      return;
    }
    if (parseFloat(amount) < 500) {
      setError("Amount must be at least ₹500.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await api.submitPurchase({ selectedClient, selectedFund, amount, mode });
      alert("Purchase submitted!");
      setSelectedClient("");
      setSelectedFund("");
      setAmount("");
      setMode("Lumpsum");
    } catch (err) {
      setError("Failed to submit purchase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Mutual Fund Purchase
      </h2>

      {error && <div className="text-red-600 text-sm sm:text-base">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-4 sm:p-6 shadow-md rounded-xl"
        role="form"
        aria-label="Mutual Fund Purchase Form"
      >
        {/* Client Selection */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Client
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            aria-label="Select Client"
          >
            <option value="">-- Choose Client --</option>
            {sampleClients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Fund Selection */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Fund
          </label>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            aria-label="Select Fund"
          >
            <option value="">-- Choose Fund --</option>
            {sampleFunds.map((fund) => (
              <option key={fund.code} value={fund.name}>
                {fund.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Investment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="500"
            required
            disabled={isLoading}
            aria-label="Investment Amount"
          />
        </div>

        {/* Investment Mode */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Investment Mode
          </label>
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="Lumpsum"
                checked={mode === "Lumpsum"}
                onChange={(e) => setMode(e.target.value)}
                disabled={isLoading}
                aria-label="Lumpsum Investment"
              />
              Lumpsum
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="SIP"
                checked={mode === "SIP"}
                onChange={(e) => setMode(e.target.value)}
                disabled={isLoading}
                aria-label="SIP Investment"
              />
              SIP
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-md font-medium transition-all duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
          aria-label="Submit Purchase"
        >
          {isLoading ? "Submitting..." : "Submit Purchase"}
        </button>
      </form>
    </div>
  );
};

export default MutualFundPurchase;
