// src/components/AdminDashboard/Payment.jsx
import React, { useState } from "react";

export default function Payment() {
  const [form, setForm] = useState({
    clientName: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    amount: "",
    mode: "UPI",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Added: ${JSON.stringify(form, null, 2)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow rounded-lg p-6"
      >
        {/* Client Name */}
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        {/* Mobile Number */}
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          pattern="\d{10}"
          maxLength="10"
          required
        />

        {/* Aadhaar Number */}
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={form.aadhaar}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          pattern="\d{12}"
          maxLength="12"
          required
        />

        {/* PAN Number */}
        <input
          type="text"
          name="pan"
          placeholder="PAN Number"
          value={form.pan}
          onChange={handleChange}
          className="border px-3 py-2 rounded uppercase"
          pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
          maxLength="10"
          required
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        {/* Payment Mode */}
        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option>UPI</option>
          <option>Net Banking</option>
          <option>Credit Card</option>
          <option>Cash</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option>Pending</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
        >
          Add Payment
        </button>
      </form>
    </div>
  );
}
