import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSave } from "react-icons/fi";

export default function ManageAgents() {
  const [agents, setAgents] = useState([
    { id: 1, name: "Sunil Verma", email: "sunil@example.com", phone: "9876543210" },
  ]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const addAgent = () => {
    if (!form.name || !form.email || !form.phone) return;
    setAgents((p) => [...p, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", phone: "" });
  };

  const startEdit = (id) => {
    const a = agents.find((x) => x.id === id);
    setForm({ name: a.name, email: a.email, phone: a.phone });
    setEditingId(id);
  };

  const saveEdit = () => {
    setAgents((p) => p.map((a) => (a.id === editingId ? { ...a, ...form } : a)));
    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
  };

  const deleteAgent = (id) => setAgents((p) => p.filter((a) => a.id !== id));

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Agents</h2>

      {/* Add / Edit Form */}
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
            onClick={editingId ? saveEdit : addAgent}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            {editingId ? <FiSave size={18} /> : <FiPlus size={18} />}
            {editingId ? "Save" : "Add"}
          </button>
        </div>
      </div>

      {/* Table */}
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
            {agents.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">{a.phone}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(a.id)}
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteAgent(a.id)}
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
