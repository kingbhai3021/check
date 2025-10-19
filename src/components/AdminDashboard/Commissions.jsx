// src/components/AdminDashboard/Commissions.jsx
import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";

export default function Commissions() {
  const dummyData = [
    {
      id: "1",
      name: "Ramesh Gupta",
      role: "Agent",
      service: "Loan Processing",
      percentage: "5",
      amount: "10000",
      date: "2025-08-01",
      bankName: "SBI Bank",
      accountNo: "1234567890",
      ifsc: "SBIN0001234",
      branch: "Mumbai",
    },
    {
      id: "2",
      name: "Priya Sharma",
      role: "DSA",
      service: "Home Loan",
      percentage: "7",
      amount: "25000",
      date: "2025-08-05",
      bankName: "HDFC Bank",
      accountNo: "9876543210",
      ifsc: "HDFC0005678",
      branch: "Delhi",
    },
  ];

  const [commissions, setCommissions] = useState([]);
  const [newCommission, setNewCommission] = useState({
    name: "",
    role: "",
    service: "",
    percentage: "",
    amount: "",
    date: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    branch: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load commissions from localStorage or use dummy data
  useEffect(() => {
    const stored = localStorage.getItem("commissions");
    if (stored && JSON.parse(stored).length > 0) {
      setCommissions(JSON.parse(stored));
    } else {
      setCommissions(dummyData);
      localStorage.setItem("commissions", JSON.stringify(dummyData));
    }
  }, []);

  // Save commissions to localStorage
  useEffect(() => {
    if (commissions.length > 0) {
      localStorage.setItem("commissions", JSON.stringify(commissions));
    }
  }, [commissions]);

  // Handle input changes
  const handleChange = (e) => {
    setNewCommission({ ...newCommission, [e.target.name]: e.target.value });
  };

  // Add or update commission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCommissions(
        commissions.map((c) =>
          c.id === editingId ? { ...newCommission, id: editingId } : c
        )
      );
      setEditingId(null);
    } else {
      setCommissions([
        ...commissions,
        { ...newCommission, id: Date.now().toString() },
      ]);
    }
    setNewCommission({
      name: "",
      role: "",
      service: "",
      percentage: "",
      amount: "",
      date: "",
      bankName: "",
      accountNo: "",
      ifsc: "",
      branch: "",
    });
  };

  // Edit
  const handleEdit = (commission) => {
    setNewCommission(commission);
    setEditingId(commission.id);
  };

  // Delete
  const handleDelete = (id) => {
    setCommissions(commissions.filter((c) => c.id !== id));
  };

  // View
  const handleView = (commission) => {
    alert(
      `Commission Details:\n\nName: ${commission.name}\nRole: ${commission.role}\nService: ${commission.service}\nPercentage: ${commission.percentage}%\nAmount: ₹${commission.amount}\nDate: ${commission.date}\nBank: ${commission.bankName}\nAccount No: ${commission.accountNo}\nIFSC: ${commission.ifsc}\nBranch: ${commission.branch}`
    );
  };

  // Send Payment (demo action)
  const handleSendPayment = (commission) => {
    alert(`Payment sent to ${commission.name} (${commission.bankName})`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Commission Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCommission.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newCommission.role}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="service"
          placeholder="Service"
          value={newCommission.service}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="percentage"
          placeholder="Percentage"
          value={newCommission.percentage}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newCommission.amount}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={newCommission.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={newCommission.bankName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="accountNo"
          placeholder="Account No"
          value={newCommission.accountNo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="ifsc"
          placeholder="IFSC"
          value={newCommission.ifsc}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={newCommission.branch}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Commission
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">%</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Bank</th>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2">IFSC</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.role}</td>
                <td className="px-4 py-2">{c.service}</td>
                <td className="px-4 py-2">{c.percentage}</td>
                <td className="px-4 py-2">₹{c.amount}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">{c.bankName}</td>
                <td className="px-4 py-2">{c.accountNo}</td>
                <td className="px-4 py-2">{c.ifsc}</td>
                <td className="px-4 py-2">{c.branch}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => handleView(c)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                    <button
                      onClick={() => handleSendPayment(c)}
                      className="text-green-500 hover:text-green-700"
                      title="Send Payment"
                    >
                      <FaPaperPlane  size={18} />  
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
