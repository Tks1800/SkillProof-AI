import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
} from "lucide-react";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/api";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  async function loadNotifications() {
    try {
      const res = await getNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 10000);

  return () => clearInterval(interval);
}, []);

  const unread = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell size={24} />

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-96 bg-slate-900 rounded-xl shadow-xl p-4 z-50">

          <div className="flex justify-between mb-4">
            <h3 className="font-bold">
              Notifications
            </h3>

            <button
              onClick={async () => {
                await markAllNotificationsRead();
                loadNotifications();
              }}
            >
              <CheckCheck size={18}/>
            </button>
          </div>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                className="border-b border-slate-700 py-3 cursor-pointer"
                onClick={async () => {
                  await markNotificationRead(item.id);
                  loadNotifications();
                }}
              >
                <h4 className="font-semibold">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-400">
                  {item.message}
                </p>
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}