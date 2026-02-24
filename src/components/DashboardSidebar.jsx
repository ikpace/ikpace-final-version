import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Bell,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/student-dashboard", icon: LayoutDashboard },
  { title: "My Courses", url: "/student-dashboard#courses", icon: BookOpen },
  { title: "Assignments", url: "/student-dashboard#assignments", icon: FileText },
  { title: "Notifications", url: "/student-dashboard#notifications", icon: Bell },
  { title: "Certificates", url: "/student-dashboard#certificates", icon: Award },
  { title: "Discussions", url: "/student-dashboard#discussions", icon: MessageSquare },
  { title: "Settings", url: "/student-dashboard", icon: Settings },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } min-h-screen bg-[hsl(214,65%,24%)] text-white flex flex-col transition-all duration-300 shrink-0`}
    >
      <div className="h-16 flex items-center px-4 border-b border-white/20">
        {!collapsed && (
          <span className="text-xl font-bold tracking-tight">
            <span className="text-orange-400">ik</span>pace
          </span>
        )}
        {collapsed && (
          <span className="text-xl font-bold text-orange-400 mx-auto">ik</span>
        )}
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/student-dashboard"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            activeClassName="bg-white/15 text-white"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t border-white/20">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
      <div className="p-2 border-t border-white/20">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors">
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}