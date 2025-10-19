// src/components/AdminDashboard/SalaryManagement.jsx
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function SalaryManagement() {
  const [salaries, setSalaries] = useState([
    { id: 1, employee: "Amit Sharma", role: "Developer", amount: "₹45,000", date: "2025-07-30" },
    { id: 2, employee: "Priya Mehta", role: "Designer", amount: "₹38,000", date: "2025-07-29" },
    { id: 3, employee: "Rahul Kumar", role: "Manager", amount: "₹60,000", date: "2025-07-28" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSalary, setEditingSalary] = useState(null);
  const [formData, setFormData] = useState({ employee: "", role: "", amount: "", date: "" });

  const openModal = (salary = null) => {
    if (salary) {
      setEditingSalary(salary);
      setFormData({ employee: salary.employee, role: salary.role, amount: salary.amount, date: salary.date });
    } else {
      setEditingSalary(null);
      setFormData({ employee: "", role: "", amount: "", date: "" });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (editingSalary) {
      setSalaries(salaries.map(sal => sal.id === editingSalary.id ? { ...sal, ...formData } : sal));
    } else {
      setSalaries([...salaries, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => setSalaries(salaries.filter(sal => sal.id !== id));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Salary Management</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          <FiPlus size={18} /> Add Salary
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Payment Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((sal) => (
              <tr key={sal.id} className="border-t">
                <td className="px-4 py-2">{sal.employee}</td>
                <td className="px-4 py-2">{sal.role}</td>
                <td className="px-4 py-2">{sal.amount}</td>
                <td className="px-4 py-2">{sal.date}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => openModal(sal)}
                    className="inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(sal.id)}
                    className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {salaries.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No salary records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editingSalary ? "Edit Salary" : "Add Salary"}</h2>
              
             
            </div>

            <div className="space-y-4">
              <input
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                placeholder="Employee Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Salary Amount"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
