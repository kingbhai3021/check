import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave } from "react-icons/fi";

export default function ManageClients() {
  const [clients, setClients] = useState([
    { id: 1, name: "Amit Kumar", email: "amit@example.com", phone: "9876543210" },
  ]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const addClient = () => {
    if (!form.name || !form.email || !form.phone) return;
    setClients((p) => [...p, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", phone: "" });
  };

  const startEdit = (id) => {
    const c = clients.find((x) => x.id === id);
    setForm({ name: c.name, email: c.email, phone: c.phone });
    setEditingId(id);
  };

  const saveEdit = () => {
    setClients((p) => p.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
  };

  const deleteClient = (id) => setClients((p) => p.filter((c) => c.id !== id));

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Clients</h2>

      {/* Form Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
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
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={editingId ? saveEdit : addClient}
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

      {/* Table Section */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(c.id)}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    title="Edit Client"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteClient(c.id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    title="Delete Client"
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
