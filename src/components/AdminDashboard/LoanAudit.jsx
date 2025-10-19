// src/components/LoanAudit.jsx
import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPaperPlane,
  FaPlus,
  FaUndo,
  FaSave,
} from "react-icons/fa";

export default function LoanAudit() {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({
    clientName: "",
    loanType: "",
    loanAmount: "",
    interestRate: "",
    duration: "",
    startDate: "",
    endDate: "",
    status: "",
    remarks: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  // 🔹 Load dummy data (replace with API later)
  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoans([
      {
        id: 1,
        clientName: "Amit Kumar",
        loanType: "Home Loan",
        loanAmount: "₹5,00,000",
        interestRate: "7.5%",
        duration: "10 Years",
        startDate: "2022-01-10",
        endDate: "2032-01-10",
        status: "Active",
        remarks: "On-time payments",
      },
    ]);
  };

  // 🔹 Add Loan
  const handleAddLoan = () => {
    if (!newLoan.clientName || !newLoan.loanType)
      return alert("Please fill all required fields");

    setLoans([...loans, { id: Date.now(), ...newLoan }]);
    resetForm();
  };

  // 🔹 Delete Loan
  const handleDelete = (id) => {
    setLoans(loans.filter((l) => l.id !== id));
  };

  // 🔹 Edit
  const handleEdit = (loan) => {
    setEditingId(loan.id);
    setNewLoan(loan);
    setViewMode(false);
  };

  // 🔹 View
  const handleView = (loan) => {
    setNewLoan(loan);
    setEditingId(null);
    setViewMode(true);
  };

  // 🔹 Update
  const handleUpdate = () => {
    setLoans(
      loans.map((l) =>
        l.id === editingId ? { ...newLoan, id: editingId } : l
      )
    );
    setEditingId(null);
    resetForm();
  };

  // 🔹 Send Report
  const handleSendReport = (loan) => {
    alert(`Loan audit report sent for ${loan.clientName}`);
  };

  // Reset Form
  const resetForm = () => {
    setNewLoan({
      clientName: "",
      loanType: "",
      loanAmount: "",
      interestRate: "",
      duration: "",
      startDate: "",
      endDate: "",
      status: "",
      remarks: "",
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Loan Audit Management
      </h1>

      {/* Add/Edit/View Form */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {viewMode
            ? "View Loan Details"
            : editingId
            ? "Edit Loan"
            : "Add New Loan"}
        </h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { key: "clientName", label: "Client Name" },
            { key: "loanType", label: "Loan Type" },
            { key: "loanAmount", label: "Loan Amount" },
            { key: "interestRate", label: "Interest Rate" },
            { key: "duration", label: "Duration" },
            { key: "startDate", label: "Start Date", type: "date" },
            { key: "endDate", label: "End Date", type: "date" },
            {
              key: "status",
              label: "Status",
              type: "select",
              options: ["Active", "Closed", "Defaulted"],
            },
            { key: "remarks", label: "Remarks" },
          ].map((field) => (
            <div key={field.key}>
              {field.type === "select" ? (
                <select
                  className="border rounded p-2 w-full"
                  value={newLoan[field.key]}
                  disabled={viewMode}
                  onChange={(e) =>
                    setNewLoan({ ...newLoan, [field.key]: e.target.value })
                  }
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  placeholder={field.label}
                  className="border rounded p-2 w-full"
                  value={newLoan[field.key]}
                  disabled={viewMode}
                  onChange={(e) =>
                    setNewLoan({ ...newLoan, [field.key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>

        {!viewMode && (
          <div className="mt-4 flex flex-wrap gap-2">
            {editingId ? (
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
              >
                <FaSave /> Update Loan
              </button>
            ) : (
              <button
                onClick={handleAddLoan}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus /> Add Loan
              </button>
            )}
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <FaUndo /> Reset
            </button>
          </div>
        )}
      </div>

      {/* Loan Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Loan Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Interest</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{l.clientName}</td>
                <td className="px-4 py-2">{l.loanType}</td>
                <td className="px-4 py-2">{l.loanAmount}</td>
                <td className="px-4 py-2">{l.interestRate}</td>
                <td className="px-4 py-2">{l.duration}</td>
                <td className="px-4 py-2">{l.startDate}</td>
                <td className="px-4 py-2">{l.endDate}</td>
                <td className="px-4 py-2">{l.status}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleView(l)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <FaEye /> 
                    </button>
                    <button
                      onClick={() => handleEdit(l)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <FaEdit /> 
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <FaTrash /> 
                    </button>
                    <button
                      onClick={() => handleSendReport(l)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1 text-xs sm:text-sm"
                    >
                      <FaPaperPlane /> Send Report
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
