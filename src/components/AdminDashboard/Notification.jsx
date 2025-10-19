import React, { useState, useEffect } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { id:1, type:"Lead", message:"New lead created", date: new Date().toISOString(), read:false },
  ]);

  useEffect(() => {
    // in real app fetch from API
  }, []);

  const markRead = (id) => setNotifications((p)=>p.map(n=> n.id===id?{...n,read:true}:n));
  const markAll = () => setNotifications((p)=>p.map(n=>({...n,read:true})));

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={markAll} className="bg-blue-600 text-white px-3 py-2 rounded">Mark All Read</button>
      </div>

      <div className="bg-white rounded shadow">
        {notifications.length===0 ? <div className="p-4 text-gray-500">No notifications</div> :
          notifications.map(n => (
            <div key={n.id} className={`p-4 border-b ${n.read ? "bg-gray-50" : "bg-white"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{n.type}</div>
                  <div className="text-sm text-gray-700">{n.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</div>
                </div>
                {!n.read && <button onClick={()=>markRead(n.id)} className="text-sm text-green-600">Mark read</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
