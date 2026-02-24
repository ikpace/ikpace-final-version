import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

export function StatsOverview({ enrolledCourses = [] }) {
  const completed = enrolledCourses.filter((c) => c.progress === 100).length;
  const inProgress = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)
      : 0;

  const stats = [
    { label: "Enrolled Courses", value: String(enrolledCourses.length), icon: BookOpen, color: "bg-blue-600", iconColor: "text-white" },
    { label: "Completed", value: String(completed), icon: Award, color: "bg-emerald-500", iconColor: "text-white" },
    { label: "In Progress", value: String(inProgress), icon: Clock, color: "bg-orange-500", iconColor: "text-white" },
    { label: "Avg. Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "bg-blue-600", iconColor: "text-white" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow">
          <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center shrink-0`}>
            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}