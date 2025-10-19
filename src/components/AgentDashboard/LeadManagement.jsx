import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

// ✅ Inline mock data function instead of importing from api.js
const fetchMockLeads = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Amit Sharma",
          email: "amit.sharma@example.com",
          phone: "9876543210",
          status: "Pending",
        },
        {
          id: 2,
          name: "Neha Verma",
          email: "neha.verma@example.com",
          phone: "9123456789",
          status: "Contacted",
        },
      ]);
    }, 500); // ✅ Simulate network delay
  });
};

const LeadManagement = () => {
  // States
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [search, setSearch] = useState("");

  // ✅ Fetch leads from mock API on component mount
  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchMockLeads(); // 👈 Uses inline function
        setLeads(data);
      } catch (err) {
        toast.error("Failed to load leads");
      }
    };

    loadLeads(); // ✅ Call mock loader
  }, []);

  // ✅ Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Email and phone validation helpers
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  // ✅ Add lead locally
  const handleAddLead = () => {
    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    const newLead = {
      id: Date.now(),
      name,
      email,
      phone,
      status: "Pending",
    };

    setLeads([newLead, ...leads]);
    setFormData({ name: "", email: "", phone: "" });
    toast.success("Lead added successfully!");
  };

  // ✅ Update lead status
  const handleMarkContacted = (id) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, status: "Contacted" } : lead
    );
    setLeads(updatedLeads);
    toast.success("Status updated to Contacted");
  };

  // ✅ Search filter
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search)
  );

  // ✅ Dynamic status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-200 text-gray-700";
      case "Contacted":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Toaster position="top-right" />

      {/* ✅ Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lead Management</h2>

      {/* ✅ Add Lead Form */}
      <div className="bg-white p-4 rounded shadow-sm space-y-3 md:flex md:items-center md:space-y-0 md:space-x-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddLead}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Add Lead
        </button>
      </div>

      {/* ✅ Search */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search leads by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ✅ Leads Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.phone}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {lead.status === "Pending" ? (
                      <button
                        onClick={() => handleMarkContacted(lead.id)}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Mark Contacted
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Done</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManagement;
