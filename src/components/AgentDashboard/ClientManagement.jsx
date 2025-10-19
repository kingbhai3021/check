import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaEye,
  FaShoppingCart,
  FaSync,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { api } from "../../services/api";

const tabs = ["All Clients", "KYC Pending", "Active Clients"];

const ClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("All Clients");

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchClients();
        setClients(data);
      } catch (err) {
        setError("Failed to load clients.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filterClientsByTab = (clientList) => {
    switch (activeTab) {
      case "KYC Pending":
        return clientList.filter((client) => client.kycStatus === "Pending");
      case "Active Clients":
        return clientList.filter((client) => client.status === "Active");
      default:
        return clientList;
    }
  };

  const filteredClients = filterClientsByTab(
    clients.filter((client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Client Table */}
      <div>
        {isLoading ? (
          <div className="text-center p-4 text-gray-500">Loading...</div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center text-gray-500">No clients found.</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-xl">
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    <th className="text-left px-6 py-3">Client</th>
                    <th className="text-left px-6 py-3">Email</th>
                    <th className="text-left px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-t text-sm">
                      <td className="px-6 py-4 flex items-center gap-2">
                        <FaUserCircle className="text-xl text-gray-500" />
                        {client.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{client.email}</td>
                      <td className="px-6 py-4">
                        <ClientStatus status={client.status} />
                      </td>
                      <td className="px-6 py-4 flex gap-2 flex-wrap">
                        <ActionButton label="View" icon={<FaEye />} onClick={() => setSelectedClient(client)} />
                        <ActionButton label="Buy/Sell" icon={<FaShoppingCart />} />
                        <ActionButton label="SIP" icon={<FaSync />} />
                        <ActionButton label="Redeem" icon={<FaDownload />} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="bg-white rounded-xl shadow p-4 space-y-2">
                  <div className="flex items-center gap-2 text-base font-medium">
                    <FaUserCircle className="text-xl text-gray-500" />
                    {client.name}
                  </div>
                  <div className="text-sm text-gray-600">{client.email}</div>
                  <ClientStatus status={client.status} />
                  <div className="flex flex-wrap gap-2 pt-2">
                    <ActionButton label="View" icon={<FaEye />} onClick={() => setSelectedClient(client)} />
                    <ActionButton label="Buy/Sell" icon={<FaShoppingCart />} />
                    <ActionButton label="SIP" icon={<FaSync />} />
                    <ActionButton label="Redeem" icon={<FaDownload />} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedClient && (
        <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}
    </div>
  );
};

// Action Button
const ActionButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition"
  >
    {icon}
    {label}
  </button>
);

// Status Badge
const ClientStatus = ({ status }) => {
  let style = "bg-gray-100 text-gray-700";
  if (status === "Active") style = "bg-green-100 text-green-700";
  else if (status === "Pending KYC") style = "bg-yellow-100 text-yellow-700";
  else if (status === "Inactive") style = "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

// Modal for Client Details
const ClientModal = ({ client, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Client Details</h2>

        <div className="space-y-3 text-gray-800 text-sm">
          <div><strong>Name:</strong> {client.name}</div>
          <div><strong>Email:</strong> {client.email}</div>
          <div><strong>Mobile:</strong> {client.mobile || "N/A"}</div>
          <div><strong>PAN:</strong> {client.pan || "N/A"}</div>
          <div><strong>Date of Birth:</strong> {client.dob || "N/A"}</div>
          <div><strong>Address:</strong> {client.address || "N/A"}</div>
          <div><strong>Status:</strong> <ClientStatus status={client.status} /></div>
          <div><strong>KYC Status:</strong> {client.kycStatus || "Unknown"}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
