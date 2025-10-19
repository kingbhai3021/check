import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "block px-4 py-2 hover:bg-gray-200 rounded transition";
  const activeClass = "bg-gray-300 font-semibold";

  return (
    <aside className="bg-white border-r h-screen sm:h-auto sm:min-h-screen sm:w-64 w-full sm:relative fixed z-50">
      {/* Mobile Header */}
      <div className="sm:hidden p-4 border-b flex justify-between items-center bg-white">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav
        className={`bg-white sm:bg-transparent p-4 space-y-2 transition-all duration-300 ease-in-out 
          ${isOpen ? "block" : "hidden"} sm:block`}
      >
        {[
          { label: "Dashboard", to: "/admin-dashboard" },
          { label: "Manage Clients", to: "/manage-clients" },
          { label: "Manage DSA", to: "/manage-dsa" },
          { label: "Manage Agents", to: "/manage-agents" },
          { label: "Recent Activities", to: "/recent-activities" },
          { label: "Portfolio Charts", to: "/portfolio-charts" },
          { label: "SIP Growth", to: "/sip-growth" },
          { label: "Client Status", to: "/client-status" },
          { label: "Profile Settings", to: "/profile-settings" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
            onClick={() => setIsOpen(false)} // close menu on mobile
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
