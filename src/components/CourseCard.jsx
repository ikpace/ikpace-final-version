import { Play, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const categoryColors = {
  Frontend: "bg-blue-600 text-white",
  Backend: "bg-emerald-600 text-white",
  "Data Science": "bg-blue-600 text-white",
  Design: "bg-orange-500 text-white",
  Database: "bg-blue-600 text-white",
  DevOps: "bg-amber-600 text-white",
  Professional: "bg-blue-600 text-white",
  Marketing: "bg-pink-600 text-white",
  Business: "bg-emerald-600 text-white",
  Kids: "bg-amber-500 text-white",
};

export function CourseCard({
  id,
  title,
  instructor,
  progress,
  totalLessons,
  completedLessons,
  thumbnail,
  category,
}) {
  return (
    <Link
      to={`/courses/${id}`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden card-hover shadow"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/0 hover:bg-foreground/20 transition-colors flex items-center justify-center group">
          <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Play className="h-5 w-5 text-white ml-0.5" />
          </div>
        </div>
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${categoryColors[category] || "bg-primary text-primary-foreground"}`}>
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{instructor}</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {completedLessons}/{totalLessons} lessons
            </span>
            <span className="font-semibold text-orange-600">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
}