import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { api } from "../../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await api.fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await api.markNotificationAsRead(id);
      setNotifications(
        notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch {
      setError("Failed to mark notification as read.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setIsLoading(true);
    setError("");
    try {
      const unreadIds = notifications
        .filter((notif) => !notif.read)
        .map((notif) => notif.id);
      await Promise.all(unreadIds.map((id) => api.markNotificationAsRead(id)));
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch {
      setError("Failed to mark all notifications as read.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(
    (notif) => filter === "All" || (filter === "Unread" && !notif.read)
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
        <FaBell /> Notifications
      </h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Filter & Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-48"
          disabled={isLoading}
        >
          <option value="All">All Notifications</option>
          <option value="Unread">Unread Only</option>
        </select>

        <button
          onClick={handleMarkAllAsRead}
          className={`bg-blue-600 text-white px-4 py-2 rounded transition ${
            isLoading || !notifications.some((n) => !n.read)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          disabled={isLoading || !notifications.some((n) => !n.read)}
        >
          Mark All as Read
        </button>
      </div>

      {/* Table or Card View */}
      <div className="bg-white rounded shadow">
        {isLoading ? (
          <div className="text-center p-4 text-gray-500">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            No notifications found.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Message</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((notif) => (
                    <tr
                      key={notif.id}
                      className={`border-b ${
                        notif.read ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-2">{notif.type}</td>
                      <td className="px-4 py-2">{notif.message}</td>
                      <td className="px-4 py-2">
                        {new Date(notif.date).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className={`bg-green-600 text-white px-3 py-1 rounded transition ${
                              isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-green-700"
                            }`}
                            disabled={isLoading}
                          >
                            Mark as Read
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden flex flex-col gap-4 p-2">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`border rounded p-4 ${
                    notif.read ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold">Type: {notif.type}</p>
                  <p className="mt-1 text-sm text-gray-700">{notif.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(notif.date).toLocaleString()}
                  </p>
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className={`mt-3 bg-green-600 text-white px-3 py-1 rounded text-sm ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-700"
                      }`}
                      disabled={isLoading}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
