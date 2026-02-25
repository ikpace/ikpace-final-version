import { Bell, Info, CheckCircle, AlertTriangle } from "lucide-react";

const notifications = [
  { message: "New lesson available: Advanced State Management", type: "info", time: "2h ago" },
  { message: "Assignment graded: Database Design Exercise - 92/100", type: "success", time: "5h ago" },
  { message: "Deadline approaching: React Hooks Quiz (Feb 22)", type: "warning", time: "1d ago" },
  { message: "Certificate earned: CSS Complete Guide", type: "success", time: "2d ago" },
  { message: "New discussion reply in Node.js forum", type: "info", time: "3d ago" },
];

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
};

const styleMap = {
  info: "text-primary bg-primary/10",
  success: "text-accent bg-accent/10",
  warning: "text-secondary bg-secondary/10",
};

export function NotificationsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="h-5 w-5 text-orange-500" />
          Notifications
        </h2>
        <button className="text-xs text-orange-600 hover:underline font-medium">Mark all read</button>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((n, i) => {
          const Icon = iconMap[n.type];
          const style = styleMap[n.type];
          return (
            <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${style}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{n.message}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}