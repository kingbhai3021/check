import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const ReferralAndCommission = () => {
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const referralLink = "https://wittywealth.in/signup?ref=AGENT123";

  useEffect(() => {
    const fetchReferrals = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchReferrals();
        setReferrals(data);
      } catch (err) {
        setError("Failed to load referrals.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  const totalCommission = referrals.reduce(
    (acc, client) => acc + client.commissionEarned,
    0
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Referral & Commission
      </h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Referral Link */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-medium mb-2">Your Referral Link</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="border px-3 py-2 rounded w-full text-sm"
            aria-label="Referral Link"
          />
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded text-sm transition ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            disabled={isLoading}
            aria-label={copied ? "Link Copied" : "Copy Referral Link"}
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Total Referrals</p>
          <p className="text-xl font-bold">{referrals.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Commission</p>
          <p className="text-xl font-bold">
            ₹{totalCommission.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Active Clients</p>
          <p className="text-xl font-bold">
            {
              referrals.filter((client) => client.status === "Active").length
            }
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {isLoading ? (
          <div className="text-center p-4 text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full text-sm" role="grid">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Client Name</th>
                <th className="px-4 py-2 whitespace-nowrap">Joined</th>
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
                <th className="px-4 py-2 whitespace-nowrap">Investment</th>
                <th className="px-4 py-2 whitespace-nowrap">Commission</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.joinedDate}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    ₹{client.investment.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    ₹{client.commissionEarned.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReferralAndCommission;
