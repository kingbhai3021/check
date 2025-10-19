import { BellRing, AlertCircle, CalendarClock } from "lucide-react";
import { Card, CardContent } from "../../assets/animations/card";

const notifications = [
  {
    icon: <BellRing className="text-blue-600 w-5 h-5" />,
    title: "SIP Due Tomorrow",
    description: "Your SIP for Axis Bluechip Fund is due on 3 Aug 2025.",
    date: "02 Aug 2025",
  },
  {
    icon: <AlertCircle className="text-red-600 w-5 h-5" />,
    title: "NAV Drop Alert",
    description: "HDFC Small Cap Fund dropped 3.2% today.",
    date: "01 Aug 2025",
  },
  {
    icon: <CalendarClock className="text-purple-600 w-5 h-5" />,
    title: "Upcoming Portfolio Review",
    description: "Schedule your portfolio review with your advisor.",
    date: "30 Jul 2025",
  },
];

export default function Notifications() {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Notifications
        </h2>
        <ul className="space-y-3">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="mt-0.5">{note.icon}</div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  {note.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {note.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">{note.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
