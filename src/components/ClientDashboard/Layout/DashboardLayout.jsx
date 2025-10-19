import { useState } from "react";
import {
  Home,
  BarChart2,
  Calendar,
  FileText,
  User,
  Bell,
  Target,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Portfolio", icon: BarChart2, path: "/dashboard/portfolio" },
  { label: "SIP Calendar", icon: Calendar, path: "/dashboard/sip-calendar" },
  { label: "Fund Explorer", icon: FileText, path: "/dashboard/fund-explorer" },
  { label: "Reports", icon: FileText, path: "/dashboard/reports" },
  { label: "Goals", icon: Target, path: "/dashboard/goal-planner" },
  { label: "Risk Profile", icon: BarChart2, path: "/dashboard/risk-profile" },
  { label: "Notifications", icon: Bell, path: "/dashboard/notifications" },
  { label: "Profile", icon: User, path: "/dashboard/profile" },
  { label: "Advisor", icon: HelpCircle, path: "/dashboard/advisor" },
];

export default function ClientDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout handler with confirm + cookie/session clear
  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    // 1. Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // 2. Clear localStorage & sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // 3. Optional: remove auth token or session state
    // e.g. if using Redux: dispatch(logout())

    // 4. Navigate to home page and replace history
    navigate("/", { replace: true });

    // 5. Reload app to reset everything (optional but helps prevent back navigation)
    window.location.href = "/";
  }
};


  const renderSidebarContent = () => (
    <div
      className={clsx(
        "h-full flex flex-col bg-white shadow-md",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-bold text-blue-600">Witty Wealth</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 md:block hidden"
        >
          ☰
        </button>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden block text-gray-700"
        >
          <X />
        </button>
      </div>
      <nav className="p-2 space-y-1 flex-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={label}
            to={path}
            onClick={() => setMobileMenuOpen(false)}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-blue-100 transition",
              location.pathname === path
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700"
            )}
          >
            <Icon className="w-5 h-5" />
            {!collapsed && label}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block">{renderSidebarContent()}</aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden">
          <aside className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white shadow-md">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white shadow px-4 flex items-center justify-between md:px-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-gray-700"
          >
            <Menu />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 mx-auto md:mx-0">
            Client Dashboard
          </h1>
          <div className="w-6" /> {/* Placeholder for symmetry */}
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
