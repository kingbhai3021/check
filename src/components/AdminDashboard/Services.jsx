// src/components/AdminDashboard/Services.jsx
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function Services() {
  const [services, setServices] = useState([
    { id: 1, name: "SIP (Systematic Investment Plan)", price: "₹500 / month", status: "Active" },
    { id: 2, name: "Mutual Fund Investments", price: "Variable", status: "Active" },
    { id: 3, name: "Insurance (Life/Health/General)", price: "Variable", status: "Active" },
    { id: 4, name: "CIBIL Score Check", price: "₹250 / report", status: "Active" },
    { id: 5, name: "Loan Assistance", price: "Variable", status: "Inactive" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", status: "Active" });

  // Open modal for Add or Edit
  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ name: service.name, price: service.price, status: service.status });
    } else {
      setEditingService(null);
      setFormData({ name: "", price: "", status: "Active" });
    }
    setIsModalOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save service (Add or Edit)
  const handleSave = () => {
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id ? { ...s, ...formData } : s
        )
      );
    } else {
      setServices([
        ...services,
        { id: Date.now(), ...formData },
      ]);
    }
    setIsModalOpen(false);
  };

  // Delete service
  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Financial Services</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">Service Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{service.name}</td>
                <td className="px-4 py-2">{service.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 text-xs md:text-sm rounded-full ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => openModal(service)}
                    className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Service Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
