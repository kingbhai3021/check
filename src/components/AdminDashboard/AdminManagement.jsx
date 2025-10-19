import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave } from "react-icons/fi"; // icons
import Sidebar from "./Layout/Sidebar"; // optional if using layout; kept for standalone pages if needed

export default function AdminManagement() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Super Admin", email: "superadmin@example.com" },
  ]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const addAdmin = () => {
    if (!form.name || !form.email) return;
    setAdmins((p) => [...p, { id: Date.now(), name: form.name, email: form.email }]);
    setForm({ name: "", email: "" });
  };

  const startEdit = (id) => {
    const a = admins.find((x) => x.id === id);
    setForm({ name: a.name, email: a.email });
    setEditingId(id);
  };

  const saveEdit = () => {
    setAdmins((p) => p.map((a) => (a.id === editingId ? { ...a, ...form } : a)));
    setForm({ name: "", email: "" });
    setEditingId(null);
  };

  const deleteAdmin = (id) => setAdmins((p) => p.filter((a) => a.id !== id));

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      {/* Form Section */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="border p-2 rounded flex-1"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={editingId ? saveEdit : addAdmin}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? (
              <>
                <FiSave /> Save
              </>
            ) : (
              <>
                <FiPlus /> Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(a.id)}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteAdmin(a.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
