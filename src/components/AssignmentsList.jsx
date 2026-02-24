import { FileText, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

const assignments = [
  { title: "React Hooks Deep Dive - Quiz", course: "Advanced React", due: "Feb 22, 2026", status: "pending" },
  { title: "Build a REST API", course: "Node.js Masterclass", due: "Feb 25, 2026", status: "pending" },
  { title: "CSS Grid Layout Project", course: "CSS Complete Guide", due: "Feb 18, 2026", status: "submitted" },
  { title: "Database Design Exercise", course: "SQL Fundamentals", due: "Feb 15, 2026", status: "graded" },
];

export function AssignmentsList() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-orange-500" />
          Assignments & Projects
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {assignments.map((a, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{a.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{a.course}</p>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {a.due}
              </span>
              {a.status === "pending" && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning-foreground flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Pending
                </span>
              )}
              {a.status === "submitted" && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Submitted
                </span>
              )}
              {a.status === "graded" && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-accent flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Graded
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}